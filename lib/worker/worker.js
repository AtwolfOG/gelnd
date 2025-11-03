// Worker thread: self-contained ESM module to avoid path-alias and TypeScript import issues.
import { parentPort, workerData } from "worker_threads";
import mongoose, { Types } from "mongoose";

const URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/gelnd"
    : process.env.MONGO_URI;

(async () => {
  if (!URI) {
    const msg = "MONGO_URI is not defined in environment";
    parentPort?.postMessage({ error: msg });
    return;
  }

  // Connect (simple, worker-local connection)
  try {
    await mongoose.connect(URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 7000,
    });
  } catch (err) {
    parentPort?.postMessage({ error: String(err) });
    return;
  }

  const { time, userId, createdAt } = workerData || {};

  try {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      parentPort?.postMessage({ error: "Invalid userId format" });
      return;
    }

    // Minimal User schema for the fields we need. Use the same model name so it maps to the same collection.
    const userSchema = new mongoose.Schema(
      {
        time: { type: Number, default: 0 },
        lastActive: { type: Date },
        streak: { type: Number, default: 0 },
      },
      { strict: false }
    );

    const User = mongoose.models.User || mongoose.model("User", userSchema);

    const user = await User.findById(userId.toString());
    if (!user) {
      parentPort?.postMessage({ error: "User not found" });
      return;
    }

    user.time = (user.time || 0) + (Number(time) || 0);

    const created = new Date(createdAt);
    const today = new Date(created);
    today.setHours(0, 0, 0, 0);

    const lastActive = user.lastActive ? new Date(user.lastActive) : null;
    if (!lastActive) {
      user.lastActive = created;
      user.streak = 1;
      await user.save();
      parentPort?.postMessage({ ok: true });
      return;
    }

    const lastActiveMidnight = new Date(lastActive);
    lastActiveMidnight.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(
      (today.getTime() - lastActiveMidnight.getTime()) / msPerDay
    );

    if (diffDays === 0) {
      user.lastActive = created;
      await user.save();
      parentPort?.postMessage({ ok: true });
      return;
    }

    if (diffDays === 1) {
      user.streak = (user.streak || 0) + 1;
      user.lastActive = created;
      await user.save();
      parentPort?.postMessage({ ok: true });
      return;
    }

    if (diffDays < 0) {
      user.lastActive = created;
      await user.save();
      parentPort?.postMessage({ ok: true });
      return;
    }

    // broken streak
    user.streak = 1;
    user.lastActive = created;
    await user.save();
    parentPort?.postMessage({ ok: true });
  } catch (err) {
    parentPort?.postMessage({ error: String(err) });
  } finally {
    try {
      // close mongoose connection in worker
      await mongoose.connection.close().catch(() => {});
    } catch {
      // ignore
    }
  }
})();

export {};
