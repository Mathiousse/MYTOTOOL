export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const task = body.data.task
    console.log(body)

    // Guard clause checks for task,
    // and returns early if is not not found
    if (!body.task) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Task not found' })
    }

    switch (body.action) {
        case 'addTask':
            addTask(task)
            break;

        default:
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

async function addTask(task) {

}