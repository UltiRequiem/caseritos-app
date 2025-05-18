"use server";

import { auth } from "@/auth";

export const recentReviewsAction = async () => {
  const session = await auth();
  if (!session) return [];

  return [];
};
