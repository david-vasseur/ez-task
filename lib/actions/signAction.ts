"use server"

import { apiFetch } from "@/lib/server/api";
import { ISign } from "@/lib/schema/signSchema";

export async function signAction(values: ISign) {

	try {
		const data = await apiFetch(
			"http://ez-task-backend:8080/api/users/sign",
			{
				method: "POST",
				body: JSON.stringify(values)
			}
		);

		return { data };

	} catch (error: any) {

		return { error: error.message };

	}
}