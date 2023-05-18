import { closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableItem } from "./SortableItem"
import { useState } from "react"


export default function Tasks({ tasks }) {
    const [tasks2, setTasks2] = useState(["Task1", "Task2", "Task3"])
    console.log(tasks)
    const tasksArray = tasks.map(({ id, text, order, completed, completionTime }) => [id, text, order, completed, completionTime]);
    console.log(tasksArray)
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            delay: 250,
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement
        // activationConstraint: {
        //     delay: 250,
        //     tolerance: 5,
        // },
    });

    const sensors = useSensors(
        mouseSensor,
        touchSensor
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <SortableContext
                items={tasksArray}
                strategy={verticalListSortingStrategy}
            >
                {tasksArray.map(task => <SortableItem key={task} id={task} />)}
            </SortableContext>
        </DndContext>
    )

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setTasks2((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);

                return arrayMove(items, activeIndex, overIndex)
            })
        }
    }

    // return Object.entries(tasks.tasksDatabase).map(([key, value]) => (
    //     <div className="task" key={key}>
    //         <Check done={value.completed} />
    //         <p>{value.taskText}</p>
    //         <div>
    //             {/* <img onClick={ } src="../edit.svg" alt="Éditer la tâche" /> */}
    //             <img data-id={value.id} onClick={deleteTask} src="../delete.svg" alt="Supprimer la tâche" />
    //         </div>
    //     </div>
    // ));
}