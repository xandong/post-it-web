import axios from "axios";

const url = "https://post-it.up.railway.app";

console.log(import.meta.env.VITE_URL);

export const apiClient = axios.create({
  baseURL: url,
});
