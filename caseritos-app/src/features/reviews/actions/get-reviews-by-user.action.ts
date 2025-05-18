"use server";

import { auth } from "@/auth";
import type { Review } from "@/generated/prisma";

export const getAllReviewsByUser = async (): Promise<Review[]> => {
	const session = await auth();

	if (!session) return [];

	return [];
};
