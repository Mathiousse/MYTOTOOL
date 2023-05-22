import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check } from "./Check";
import { Inertia } from "@inertiajs/inertia";
import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import useReset from "@/hooks/useReset";
import ContentEditable from "react-contenteditable";

export default function SortableItem(props) {

    const [isEditing, setIsEditing] = useState(false);
    const divRef = useRef(null);
    const [taskText, setTaskText, resetTaskText] = useReset(props.id[1]);


    const deleteTask = (e) => {
        if (confirm("Êtes vous sûrs de vouloir supprimer cette tâche ?")) {
            Inertia.delete(route("task.destroy", props.id[0]));
        }
    }

    const editTask = (e) => {
        setIsEditing(true);

    }

    const confirmEdit = (e) => {
        setIsEditing(false);
        Inertia.put(route("task.update", props.id[0]), { data: { text: taskText } });
    }

    const cancelEdit = (e) => {
        setIsEditing(false);
        resetTaskText();
    }

    useEffect((e) => {
        const p = document.querySelector(".taskTextActive")
        if (p) {
            const range = document.createRange();
            range.setStart(p, p.childNodes.length);
            range.setEnd(p, p.childNodes.length);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            p.focus();
        }

    }, [isEditing]);

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
        <div>
            {
                isEditing ? (
                    <div ref={divRef} className={(isEditing ? "border-4 border-pinkbg" : "") + " task relative flex items-center gap-5 p-4 hover:shadow-md hover:transition duration-200 ease-in-out rounded-2xl"} >
                        <Check />
                        <ContentEditable
                            data-id={props.id[0]}
                            html={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                            className="taskTextActive taskText focus:outline-none focus-visible:outline-none font-sans m-0 text-base flex-grow break-all whitespace-normal"
                        />
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
                    </div >
                ) : (
                    <div ref={divRef} className={(isEditing ? "border-4 border-pinkbg" : "") + " task relative flex items-center gap-5 p-4 hover:shadow-md hover:transition duration-200 ease-in-out rounded-2xl"}>

                        <Check />
                        <p data-id={props.id[0]} className="taskText focus:outline-none focus-visible:outline-none font-sans m-0 text-base flex-grow break-all whitespace-normal">{taskText}</p>
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
                    </div>
                )}
        </div >
    );
}

