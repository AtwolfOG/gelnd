"use server";

import { getUserId } from "./analytics";
import { Activity } from "./schema";
import { verifySession } from "./verify";

export async function getRecent() {
  try {
    const id = await getUserId();
    const recent = await Activity.find({ user: id })
      .sort({ createdAt: -1 })
      .limit(5);
    return recent;
  } catch (error) {
    throw error;
  }
}
