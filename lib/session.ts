"use server";

import { cookies } from "next/headers";
import { Activity, Note, User } from "./schema";
import { verifySession } from "./verify";
import { revalidatePath } from "next/cache";
import connectDB from "./connectDB";
import { updateUser } from "./updateUser";

export async function createSession({
  type,
  entry,
}: {
  type: string;
  entry: string;
}) {
  try {
    const { userId } = await getUserId();
    const activity = new Activity({
      type,
      user: userId,
      entry,
    });
    await activity.save();
    return activity._id.toString();
  } catch (err) {
    let errMsg = "Unexpected error";
    if (err instanceof Error) errMsg = err.message;
    console.log(errMsg);
    throw new Error(errMsg);
  }
}

export async function deleteSession() {
  try {
    // deleting the frontend session from db and clearing cookie
    // getting cookie from the frontend
    const cookie = await cookies();
    const session = cookie.get("session")?.value;
    if (!session) throw new Error("There is currently no session");
    const { id } = JSON.parse(session);
    await connectDB();
    await Activity.findByIdAndDelete(id);
    await Note.deleteMany({ activity: id });
    cookie.delete("session");
  } catch (error) {
    throw error;
  }
}

async function getIdandCookie() {
  try {
    const cookie = await cookies();
    const session = cookie.get("session")?.value;
    if (!session) throw new Error("There is currently no session");
    const { id } = JSON.parse(session);
    return { cookie, id };
  } catch (error) {
    throw error;
  }
}

export async function saveSession(time: number) {
  try {
    // updating the times spent to the db
    const { cookie, id } = await getIdandCookie();
    await connectDB();
    const activity = await Activity.findByIdAndUpdate(id, { time });
    cookie.delete("session");
    const { userId } = await getUserId();
    await updateUser(userId.toString(), time, activity.createdAt);
  } catch (error) {
    throw error;
  }
}

interface NoteType {
  title: string;
  text: string;
  tags: string[];
}
async function getUserId(): Promise<{ userId: string }> {
  try {
    const decoded = await verifySession();
    if (!decoded) throw new Error("User not logged in");
    const user = await User.findOne({ email: decoded?.email });
    if (!user) throw new Error("invalid user");
    const userId = user._id;
    return { userId };
  } catch (error) {
    throw error;
  }
}
export async function addNote({ title, text, tags }: NoteType) {
  try {
    await connectDB();
    const { userId: rawUserId } = await getUserId();
    const userId = rawUserId.toString();
    // getting client session or activity id from cookies
    const { id: sessionId } = await getIdandCookie();
    const note = await new Note({
      title,
      text,
      activity: sessionId,
      user: userId,
      tags,
    });
    await note.save();
    await Activity.findByIdAndUpdate(sessionId, { $push: { notes: note._id } });
    revalidatePath("/user/dashboard");
  } catch (error) {
    throw error;
  }
}

export async function getNote() {
  try {
    const { id: sessionId } = await getIdandCookie();
    const notes = await Note.find(
      { activity: sessionId },
      { title: 1, text: 1, tags: 1, createdAt: 1 }
    );
    return notes;
  } catch (error) {
    throw error;
  }
}

export async function getTimeSpent() {
  try {
    await connectDB();
    // getting userId
    const { userId } = await getUserId();
    // getting today's date
    const now = new Date(new Date().setHours(0, 0, 0, 0));
    const aggregate = await Activity.aggregate([
      {
        $match: {
          $and: [{ createdAt: { $gt: now } }, { user: userId }],
        },
      },
      {
        $group: {
          _id: "$type",
          time: { $sum: "$time" },
        },
      },
    ]);
    console.log(aggregate);
    return aggregate;
  } catch (error) {
    throw error;
  }
}
