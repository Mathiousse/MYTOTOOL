import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

export async function getTasks() {
    const tasks = await apiClient.get('/tasks')
        .then(response => { return response.data })
        .catch(error => console.error(error));
    // console.log(tasks, "tasks")
    return tasks
}