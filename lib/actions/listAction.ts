"use server"

import { apiFetch } from "@/lib/server/api";

export async function getAllTreeAction(familyId: number) {

    try {
        console.log("About to call apiFetch to /trees/all/:familyId"); // 2️⃣ avant fetch

        const data = await apiFetch(
            `http://ez-task-backend:8080/api/trees/all/${familyId}`,
            {
                method: "GET",
            }
        );

        console.log("apiFetch resolved with data:", data); // 3️⃣ après fetch

        return { data };

    } catch (error: any) {
        console.log("signAction caught error:", error); // 4️⃣ log d'erreur
        return { error: error.message };
    }
}