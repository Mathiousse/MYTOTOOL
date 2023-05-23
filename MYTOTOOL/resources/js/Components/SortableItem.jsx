import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check } from "./Check";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useReset from "@/hooks/useReset";
import ContentEditable from "react-contenteditable";
import { router } from '@inertiajs/react'


export default function SortableItem(props) {

    const [isEditing, setIsEditing] = useState(false);
    const divRef = useRef(null);
    const [taskText, setTaskText] = useState(props.id[1]);

    const deleteTask = (e) => {
        if (confirm("Êtes vous sûrs de vouloir supprimer cette tâche ?")) {
            Inertia.delete(route("task.destroy", props.id[0]));
        }
        router.reload({ only: ['tasks'] })
    }
    const [taskTextPrev, setTaskTextPrev] = useState('')
    const editTask = (e) => {
        setIsEditing(true);
        if (taskTextPrev === '') setTaskTextPrev(taskText)
        const p = e.target.parentElement.querySelector(".taskText")
        const range = document.createRange();
        range.setStart(p, p.childNodes.length);
        range.setEnd(p, p.childNodes.length);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        p.focus();
    }

    const confirmEdit = (e) => {
        setIsEditing(false);
        Inertia.put(route("task.update", props.id[0]), { data: { text: taskText } });
        router.reload({ only: ['tasks'] })
    }

    const cancelEdit = (e) => {
        setIsEditing(false);
        setTaskText(props.id[1])
        // fonction refresh qui refresh le component / la page 
    }

    useOutsideClick(divRef, cancelEdit)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id[0] })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div ref={divRef} className={(isEditing ? "border-4 border-pinkbg" : "") + " task relative flex items-center gap-5 p-4 hover:shadow-md hover:transition duration-200 ease-in-out rounded-2xl"}>
            <Check />
            <ContentEditable
                disabled={!isEditing}
                data-id={props.id[0]}
                html={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="taskText focus:outline-none focus-visible:outline-none font-sans m-0 text-base flex-grow break-all"
            />
            {isEditing ? (
                <>
                    <img
                        className="w-8 h-8 cursor-pointer flex-shrink-0"
                        data-id={props.id[0]}
                        onClick={confirmEdit}
                        src="../confirm.svg"
                        alt="Confirmer la modification"
                    />
                    <img
                        className="w-8 h-8 cursor-pointer flex-shrink-0"
                        data-id={props.id[0]}
                        onClick={cancelEdit}
                        src="../cancel.svg"
                        alt="Annuler la modification"
                    />

                </>
            ) : (
                <>
                    <img
                        className="w-8 h-8 cursor-pointer flex-shrink-0"
                        data-id={props.id[0]}
                        onClick={editTask}
                        src="../edit.svg"
                        alt="Éditer la tâche"
                    />
                    <img
                        className="w-8 h-8 cursor-pointer flex-shrink-0"
                        data-id={props.id[0]}
                        onClick={deleteTask}
                        src="../delete.svg"
                        alt="Supprimer la tâche"
                    />
                </>
            )}
        </div>
    );
}