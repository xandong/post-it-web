import axios from "axios";

const url = import.meta.env.BASE_URL && "http://localhost:3333";
export default axios.create({ baseURL: url });
