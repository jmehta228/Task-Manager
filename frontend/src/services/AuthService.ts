import axios from "axios";

export async function login(email: string, password: string) {
  const { data } = await axios.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(email: string, password: string) {
  const response = await axios.post("/auth/register", { email, password });
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}
