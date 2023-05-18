import { useEffect } from "react"
export default function Form({ setTasks }) {
    async function addTask(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        // convert the form data to a JSON object
        const data = Object.fromEntries(formData.entries())
        // send a POST request to the API route with the JSON data
        const response = await fetch('/api/crud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'data': data, 'action': 'addTask' }),
        })
        // get the response data as JSON
        const result = await response.json()
        setTasks(result)
    }
    function textareaSizing(event) {
        const textarea = document.querySelector("#addTask")
        textarea.style.height = 0;
        textarea.style.height = textarea.scrollHeight + 10 + "px";
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.parentElement.querySelector("button").click();
        }
    }

    useEffect(() => {
        textareaSizing();
    }, []);

    return (
        <form onSubmit={addTask} className="relative flex items-center gap-5 p-4">
            <div className="circle-container relative flex-shrink-0 self-center">
                <button className="button circle w-6 h-6 cursor-pointer transition duration-300 ease-out" type="submit">
                    <input type="image" src="../plus.svg" border="0" alt="Submit" className="border border-green-600 rounded-full h-full w-full bg-green-600 hover:shadow-xl hover:transform hover:scale-120 hover:rounded-full active:shadow-sm active:transform active:scale-90 active:rounded-full" />
                </button>
            </div>
            <textarea onKeyDown={handleKeyDown} onKeyUp={textareaSizing} className="input outline-none border-none font-montserrat text-base resize-none flex-grow" type="text" id="addTask" name="task" required placeholder='Entrez votre tâche ici' rows="3" cols="40"></textarea>
        </form>
    )
}