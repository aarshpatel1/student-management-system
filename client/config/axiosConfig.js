import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const authAPI = {
	signup: (userData) => api.post("/auth/signup", userData),
	login: (credentials) => api.post("/auth/login", credentials),
};

export const userAPI = {
	getAll: () => api.get("/user/getAllUsers"),
	getById: (id) => api.get(`/user/getUser/${id}`),
	create: (userData) => api.post("/user/addUser", userData),
	update: (id, userData) => api.put(`/user/updateUser/${id}`, userData),
	update: (id, userData) => api.patch(`/user/updateUser/${id}`, userData),
	delete: (id) => api.delete(`/user/deleteUser/${id}`),
};
