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
	getAll: (params = {}) => api.get("/user/getAllUsers", { params }),

	getById: (id) => api.get(`/user/getUser/${id}`),

	create: (data, headers = {}) =>
		api.post("/user/addUser", data, { headers }),

	update: (id, data, headers = {}) =>
		api.put(`/user/updateUser/${id}`, data, { headers }),

	patch: (id, data, headers = {}) =>
		api.patch(`/user/updateUser/${id}`, data, { headers }),

	delete: (id, headers = {}) =>
		api.delete(`/user/deleteUser/${id}`, { headers }),
};

export default api;
