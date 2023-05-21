import { useEffect } from "react"
import { useState } from 'react'
import { router } from '@inertiajs/react'

export default function Form() {

    const [values, setValues] = useState({
        text: "",
    })

    function textareaSizing(event) {
        const textarea = document.querySelector("#text")
        textarea.style.height = 0;
        textarea.style.height = textarea.scrollHeight + 10 + "px";
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
        console.log(values)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.target.parentElement.querySelector("button").click();
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/dashboard', values)
    }

    useEffect(() => {
        textareaSizing();
    }, []);



    return (
        <form onSubmit={handleSubmit} className="relative flex items-center gap-5 p-4">
            <div className="circle-container relative flex-shrink-0 self-center">
                <button className="button circle w-6 h-6 cursor-pointer transition duration-300 ease-out" type="submit">
                    <input type="image" src="../plus.svg" border="0" alt="Submit" className="border border-green-600 rounded-full h-full w-full bg-green-600 hover:shadow-xl hover:transform hover:scale-120 hover:rounded-full active:shadow-sm active:transform active:scale-90 active:rounded-full" />
                </button>
            </div>
            <textarea onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={textareaSizing} className="input outline-none border-none font-montserrat text-base resize-none flex-grow" type="text" id="text" name="text" required placeholder='Entrez votre tâche ici' rows="3" cols="40"></textarea>
        </form>

    )
}