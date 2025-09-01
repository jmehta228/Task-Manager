// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/tasks';

// export const getTasks = () => axios.get(API_URL);
// export const createTask = (task) => axios.post(API_URL, task);
// export const deleteTaskById = (id) => axios.delete(`${API_URL}/${id}`);
// export const updateTaskStatus = (taskId, updatedTask) => {
//     return axios.put(`${API_URL}/${taskId}`, updatedTask);
// };

import http from "./http";

export const createTask = (task) => http.post("/api/tasks", task);

export const getTasks = () => http.get("/api/tasks");

export const updateTask = (id, t) => http.put(`/api/tasks/${id}`, t).then(r => r.data);

export const updateTaskStatus = (taskId, updatedTask) => http.put(`/api/tasks/${taskId}`, updatedTask).then(r => r.data);

export const deleteTaskById = (id) => http.delete(`/api/tasks/${id}`);
