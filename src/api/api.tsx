import axios from "axios";

const url = import.meta.env.VITE_URL || "http://localhost:3333";

console.log(import.meta.env.VITE_URL);

export default axios.create({
  baseURL: url,
});
