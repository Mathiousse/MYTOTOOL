export default function Form({ setTasks }) {
    async function addTask(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        // convert the form data to a JSON object
        const data = Object.fromEntries(formData.entries())
        // send a POST request to the API route with the JSON data
        const response = await fetch('/api/form-add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        // get the response data as JSON
        const result = await response.json()
        setTasks(result)
    }
    function textareaSizing(event) {
        let height = event.target.scrollHeight - 4
        event.target.style.height = height + "px"
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.parentElement.querySelector("button").click();
        }
    }
    return (
        <form onSubmit={addTask}>
            <div className="circle-container">
                <button className="button circle" type="submit">
                    <input type="image" src="../plus.svg" border="0" alt="Submit" />
                </button>
            </div>
            <textarea onKeyDown={handleKeyDown} onKeyUp={textareaSizing} className="input" type="text" id="task" name="task" required placeholder='Entrez votre tâche ici'></textarea>
        </form>
    )
}