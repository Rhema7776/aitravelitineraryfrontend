const API_BASE_URL = "http://localhost:8000/api"; // adjust if different

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json(); // returns { access, refresh }
}
