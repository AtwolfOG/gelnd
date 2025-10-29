"use server";

import connectDB from "./connectDB";
import { Activity, User } from "./schema";
import { verifySession } from "./verify";

async function getUserId() {
  try {
    await connectDB();
    const { email } = await verifySession();
    const { _id } = await User.findOne({ email });
    return _id;
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
      {
        $project: {
          _id: 0,
          day: 1,
          bible: { $divide: ["$bible", 1000] },
          prayer: { $divide: ["$prayer", 1000] },
        },
      },
    ]);
    console.log("from server action", week);
    console.log("from server action", date);
    return week;
  } catch (error) {
    throw error;
  }
}
export async function getLastWeekTime(
  date: Date,
  stopDate: Date,
  format: string
) {
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
        $project: {
          _id: 0,
          time: {
            $divide: ["$time", 1000],
          },
        },
      },
    ]);
    const { time } = week[0];
    console.log("from server action last week", week);
    console.log("from server action last week", date);
    console.log("from server action last week", stopDate);
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
          bible: { $divide: ["$bible", 1000] },
          prayer: { $divide: ["$prayer", 1000] },
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
