"use server";

import { getUserId } from "./analytics";
import { Note } from "./schema";

export async function getNotes(query: string) {
  try {
    const id = await getUserId();
    const notes = await Note.find({
      user: id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { text: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).populate("activity");
    return notes;
  } catch (error) {
    throw error;
  }
}
