"use server"

import { apiFetch } from "@/lib/server/api";
import { ILogin } from "../schema/loginSchema";

export async function loginAction(values: ILogin) {
    console.log("loginAction called with values:", values); // 1️⃣ log d'entrée

    try {
        console.log("About to call apiFetch to /users/sign"); // 2️⃣ avant fetch

        const data = await apiFetch(
            "http://ez-task-backend:8080/api/users/login",
            {
                method: "POST",
                body: JSON.stringify(values)
            }
        );

        console.log("apiFetch resolved with data:", data); // 3️⃣ après fetch

        return { data };

    } catch (error: any) {
        console.log("signAction caught error:", error); // 4️⃣ log d'erreur
        return { error: error.message };
    }
}