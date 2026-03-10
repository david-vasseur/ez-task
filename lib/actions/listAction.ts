"use server"

import { apiFetch } from "@/lib/server/api";
import { IInput } from "../schema/inputSchema";

export async function getAllTreeAction(familyId: number) {

    try {
        console.log("About to call apiFetch to /tree/all/:familyId"); // 2️⃣ avant fetch

        const res = await apiFetch(
            `http://ez-task-backend:8080/api/tree/all/${familyId}`,
            {
                method: "GET",
            }
        );

        console.log("apiFetch resolved with data:", res); // 3️⃣ après fetch

        return res.data;

    } catch (error: any) {
        console.log("signAction caught error:", error); // 4️⃣ log d'erreur
        return { error: error.message };
    }
}

export async function addTreeAction(values: IInput, familyId: number, token: string) {
    console.log("addTreeAction called with values:", values); // 1️⃣ log d'entrée

    try {
        console.log("About to call apiFetch to /tree/add"); // 2️⃣ avant fetch

        const data = await apiFetch(
            "http://ez-task-backend:8080/api/tree/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${token}`, 
                },
                body: JSON.stringify({ values, familyId })
            }
        );

        console.log("apiFetch resolved with data:", data); // 3️⃣ après fetch

        return { data };

    } catch (error: any) {
        console.log("addTreeAction caught error:", error); // 4️⃣ log d'erreur
        return { error: error.message };
    }
}