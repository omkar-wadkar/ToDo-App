import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


export const loginUser = (data) =>
  API.post("/api/auth/login", data);

export const registerUser = (data) =>
  API.post("/api/auth/register", data);


export const addTodo = (todo) =>
  API.post("/api/todos", todo);

export const getTodos = () =>
  API.get("/api/todos");

export const deleteTodo = (id) =>
  API.delete(`/api/todos/${id}`);

export const updateTodo = (id, todo) =>
  API.put(`/api/todos/${id}`, todo);

export const toggleTodo = (id, completed) =>
  API.put(`/api/todos/${id}`, { completed });

export default API;
