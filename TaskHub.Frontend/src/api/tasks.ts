import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5050/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export async function getTasks() {
    const res = await api.get("/tasks");
    const data = res.data;
    return Array.isArray(data) ? data : [];
}

export async function createTask(newTask: {
    title: string;
    description: string;
    date: string;
}) {
    const res = await api.post("/tasks", newTask);
    return res.data;
}

// Puedes añadir más funciones para update, delete, etc.
