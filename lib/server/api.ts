"use server"

import { getCsrfToken } from "./csrf";

export async function apiFetch(
    url: string,
    options: RequestInit = {}
) {

    const csrf = await getCsrfToken();
    console.log(csrf);    

    const response = await fetch(url, {
        ...options,
        headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf,
        ...(options.headers || {})
        },
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return response.json();
}