"use server";

import { getUserId } from "./analytics";
import { Activity } from "./schema";

export async function getSession(type: string, entry: string) {
  try {
    const id = await getUserId();
    const baseQuery = { user: id };

    if (type && entry) {
      const activities = await Activity.find({
        ...baseQuery,
        type,
        entry: { $regex: entry, $options: "i" },
      }).sort({ createdAt: -1 });
      return activities;
    } else if (type || entry) {
      const query: {
        user: string;
        type?: string;
        entry?: { $regex: string; $options: string };
      } = { ...baseQuery };
      if (type) query.type = type;
      if (entry) query.entry = { $regex: entry, $options: "i" };
      const activities = await Activity.find(query).sort({ createdAt: -1 });
      return activities;
    } else {
      const activities = await Activity.find().sort({ createdAt: -1 });
      return activities;
    }
  } catch (error) {
    throw error;
  }
}

export async function getSessionNotes(activityId: string) {
  try {
    const id = await getUserId();
    const activity = await Activity.findOne({
      user: id,
      _id: activityId,
    }).populate("notes");
    return activity;
  } catch (error) {
    throw error;
  }
}
