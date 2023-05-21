export function Check() {

    function completeTask(e) {
        console.log(e.target)
        // Toggle the animate-spin class on click
        e.target.classList.toggle("animate-spin")
        e.target.classList.toggle("bg-green-500")
        e.target.classList.toggle("border-green-500")
    }

    return (
        <div className={"completed circle-container relative flex-shrink-0 h-6 self-center"}>
            <button onClick={completeTask} className="circle border-gray-500  border-2 w-6 h-6 rounded-full cursor-pointer transition-colors duration-300 animate-150 ease-in-out">
            </button>
        </div>
    )
}
