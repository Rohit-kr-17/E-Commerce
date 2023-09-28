import axios from "axios";
const client = axios.create({
	baseURL: "https://e-commerce-gacx.onrender.com/api",
});

export default client;
