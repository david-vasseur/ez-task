"use server"

export async function apiFetch(
    url: string,
    options: RequestInit = {}
) {
    console.log("apiFetch called with URL:", url, "options:", options);

    console.log("About to perform fetch...");
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        credentials: "include",
    });

    console.log("Fetch completed, response.ok =", response.ok);

    if (!response.ok) {
        const error = await response.json();
        console.log("Fetch returned error JSON:", error);
        throw new Error(error.message);
    }

    const jsonData = await response.json();
    console.log("Fetch returned JSON data:", jsonData);

    return jsonData;
}