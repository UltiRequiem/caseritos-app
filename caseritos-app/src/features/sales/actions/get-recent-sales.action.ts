"use server";

import { auth } from "@/auth";
import type { Sale } from "@/generated/prisma";

export const getRecentSalesAction = async (): Promise<Sale[]> => {
	const session = await auth();

	if (!session?.user) {
		return [];
	}

	return [];
};
