"use server";

import { getUser } from "./analytics";

export async function getDashboardInfo() {
  try {
    const user = await getUser();
  } catch (error) {
    throw error;
  }
}
