import { User } from "./schema";

export async function updateUser(
  userId: string,
  time: number,
  createdAt: Date
) {
  const user = await User.findById(userId);

  user.time = (user.time || 0) + (Number(time) || 0);

  const created = new Date(createdAt);
  const today = new Date(created);
  today.setHours(0, 0, 0, 0);

  const lastActive = user.lastActive ? new Date(user.lastActive) : null;
  if (!lastActive) {
    user.lastActive = created;
    user.streak = 1;
    await user.save();
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
    return;
  }

  if (diffDays === 1) {
    user.streak = (user.streak || 0) + 1;
    user.lastActive = created;
    await user.save();
    return;
  }

  if (diffDays < 0) {
    user.lastActive = created;
    await user.save();
    return;
  }

  // broken streak
  user.streak = 1;
  user.lastActive = created;
  await user.save();
}
