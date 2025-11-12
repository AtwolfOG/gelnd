"use server";

import connectDB from "./connectDB";
import { Activity, User } from "./schema";
import { verifySession } from "./verify";

export async function getUserId() {
  try {
    await connectDB();
    const { email } = await verifySession();
    if (!email) throw new Error("User not logged in");
    const { _id } = await User.findOne({ email });
    if (!_id) throw new Error("invalid user");
    return _id;
  } catch (err) {
    throw err;
  }
}

export async function getUser(yesterday: Date) {
  try {
    await connectDB();
    const { email } = await verifySession();
    if (!email) throw new Error("User not logged in");
    const user = await User.findOne({ email });
    if (!user) throw new Error("invalid user");
    const lastSession = await Activity.findOne({
      user: user._id,
      createdAt: { $gte: yesterday },
    });
    if (!lastSession) return { ...user._doc, streak: 0 };
    return user;
  } catch (err) {
    throw err;
  }
}

export async function getWeekTime(date: Date, format: string) {
  try {
    const _id = await getUserId();
    const week = await Activity.aggregate([
      {
        $match: {
          user: _id,
          createdAt: { $gte: date },
        },
      },
      {
        $addFields: {
          day: {
            $dayOfWeek: {
              date: "$createdAt",
              timezone: format,
            },
          },
        },
      },
      {
        $group: {
          _id: "$day",
          bible: {
            $sum: {
              $cond: [{ $eq: ["$type", "bible"] }, "$time", 0],
            },
          },
          //   alternative way for condition
          prayer: {
            $sum: {
              $cond: {
                if: { $eq: ["$type", "prayer"] },
                then: "$time",
                else: 0,
              },
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $addFields: {
          day: {
            $arrayElemAt: [
              [null, "sun", "mon", "tue", "wed", "thu", "fri", "sat"],
              "$_id",
            ],
          },
        },
      },
      //   this sends minutes to client instead of seconds
      {
        $project: {
          _id: 0,
          day: 1,
          bible: { $floor: { $divide: ["$bible", 60000] } },
          prayer: { $floor: { $divide: ["$prayer", 60000] } },
        },
      },
    ]);
    return week;
  } catch (error) {
    throw error;
  }
}
export async function getLastWeekTime(date: Date, stopDate: Date) {
  try {
    const _id = await getUserId();
    const week = await Activity.aggregate([
      {
        $match: {
          user: _id,
          createdAt: { $gte: date, $lt: stopDate },
        },
      },
      {
        $group: {
          _id: "$user",
          time: {
            $sum: "$time",
          },
        },
      },
      {
        // send minutes
        $project: {
          _id: 0,
          time: {
            $floor: { $divide: ["$time", 60000] },
          },
        },
      },
    ]);
    if (!week[0]) return 0;
    const time = week[0].time;
    return time;
  } catch (error) {
    throw error;
  }
}

export async function getMonthlydata(date: Date, timezone: string) {
  try {
    const _id = await getUserId();
    const monthly = await Activity.aggregate([
      {
        $match: {
          user: _id,
          createdAt: { $gte: date },
        },
      },
      {
        // compute week number from dayOfMonth
        $addFields: {
          week: {
            $ceil: {
              $divide: [{ $dayOfMonth: { date: "$createdAt", timezone } }, 7],
            },
          },
        },
      },
      {
        // Group and sum conditionally
        $group: {
          _id: "$week",
          bible: {
            $sum: { $cond: [{ $eq: ["$type", "bible"] }, "$time", 0] },
          },
          prayer: {
            $sum: { $cond: [{ $eq: ["$type", "prayer"] }, "$time", 0] },
          },
        },
      },
      {
        // selecting fields to return
        $project: {
          _id: 0,
          week: "$_id",
          bible: { $floor: { $divide: ["$bible", 60000] } },
          prayer: { $floor: { $divide: ["$prayer", 60000] } },
        },
      },
      {
        // sorting
        $sort: { week: 1 },
      },
    ]);
    return monthly;
  } catch (error) {
    throw error;
  }
}
export async function getLastMonthdata(date: Date, lastMonth: Date) {
  try {
    const _id = await getUserId();
    const monthly = await Activity.aggregate([
      {
        $match: {
          user: _id,
          createdAt: { $gte: date, $lt: lastMonth },
        },
      },

      {
        // Group and sum conditionally
        $group: {
          _id: null,
          time: {
            $sum: "$time",
          },
        },
      },
      {
        // selecting fields to return
        $project: {
          _id: 0,
          time: { $floor: { $divide: ["$time", 60000] } },
        },
      },
    ]);

    return monthly[0];
  } catch (error) {
    throw error;
  }
}

export async function getAllSession() {
  try {
    const _id = await getUserId();
    const session = await Activity.find({ user: _id }).select({
      type: 1,
      time: 1,
    });
    const count = session.length;
    const sessionObj = session.reduce(
      (acc, { type, time }) => {
        acc[type] += time;
        return { ...acc };
      },
      { bible: 0, prayer: 0 }
    );
    sessionObj.bible = sessionObj.bible / 60000;
    sessionObj.prayer = sessionObj.prayer / 60000;
    return { session: sessionObj, count };
  } catch (error) {
    throw error;
  }
}
