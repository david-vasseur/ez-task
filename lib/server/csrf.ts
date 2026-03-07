"use server"

export async function getCsrfToken() {
    const response = await fetch("http://ez-task-backend:8080/api/csrfToken", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Impossible de récupérer le CSRF token");
    }

    const data = await response.json();
    return data.csrfToken;
}