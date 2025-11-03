import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      default: 0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const activitySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    entry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);
const User = models.User || model("User", userSchema);
const Activity = models.Activity || model("Activity", activitySchema);
const Note = models.Note || model("Note", noteSchema);

export { User, Activity, Note };
