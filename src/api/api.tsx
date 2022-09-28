import axios from "axios";

const url = import.meta.env.BASE_URL;
export default axios.create({ baseURL: url });
