import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const task = body.data.task

    // Guard clause checks for task,
    // and returns early if is not not found
    if (!task) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Task not found' })
    }
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    switch (body.action) {
        case 'addTask':
            await csrf()
            apiClient.post('/tasks', task)
                .then(response => console.log(response))
                .catch(error => console.error(error));
            // return res.status(400).json({ data: 'Prankexx' })
            break;

        default:
            return res.status(400).json({ data: 'Could not find the action' })
            break;
    }

    // return new Promise((resolve, reject) => {
    //     DatabaseAdd(body.task)
    //         .then(response => {
    //             res.statusCode = 201
    //             res.setHeader('Content-Type', 'application/json');
    //             res.setHeader('Cache-Control', 'max-age=180000');
    //             res.json({ tasksDatabase: response });
    //             resolve();
    //         })
    //         .catch(error => {
    //             res.json(error);
    //             res.status(405).end();
    //             resolve();
    //         });
    // });
}