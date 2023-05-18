import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Check from "./Check";

async function deleteTask(event) {
    console.log("loll")
    const data = event.target.dataset.id
    // send a POST request to the API route with the JSON data
    const response = await fetch('/api/form-delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    console.log(result)
    setTasks(result)
}

export function SortableItem(props) {
    // props.id

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div className="task relative flex items-center gap-5 p-4 hover:shadow-md hover:transition duration-200 ease-in-out" ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <Check />
            <p className="font-sans m-0 text-base flex-grow">{props.id[1]}</p>
            <img className="w-8 cursor-pointer flex-shrink-0" data-id={props.id[0]} onClick={deleteTask} src="../delete.svg" alt="Supprimer la tâche" />
        </div>
    )
}

