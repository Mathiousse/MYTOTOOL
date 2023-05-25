import { router } from '@inertiajs/react'
import { Inertia } from "@inertiajs/inertia";

export function Check({ task }) {

    function completeTask(e) {
        // Toggle the animate-spin class on click
        e.target.classList.toggle("animate-spin")
        e.target.classList.toggle("bg-green-500")
        e.target.classList.toggle("border-green-500")
        task[3] === 1 ? Inertia.put(route("task.update", task[0]), { completed: false }) : Inertia.put(route("task.update", task[0]), { completed: true });
        router.reload()
    }

    return (
        <div className={"completed circle-container relative flex-shrink-0 md:h-6 self-center"}>
            <button onClick={completeTask} className={(task[3] === 1 ? "bg-green-500 border-green-500" : "") + " md:block flex circle border-gray-500 border-2 w-6 h-6 rounded-full cursor-pointer transition-colors duration-300 animate-150 ease-in-out "}>
            </button>
        </div>
    )
}
