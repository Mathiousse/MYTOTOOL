import Head from 'next/head'
import Link from 'next/link'
import AppLayout from '@/components/Layouts/AppLayout'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import Tasks from '@/components/Tasks'
import React, { useState, useEffect } from 'react';
import Form from "@/components/Form"

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});


export default function Home() {
    const { user } = useAuth({ middleware: 'auth' })
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        apiClient.get('/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);
    console.log(tasks)




    return (
        <AppLayout>
            <Head>
                <title>MYTOTOOL</title>
            </Head>

            <div className=" bg-pinkbg py-12 w-90 m-auto mt-10 mb-10 rounded-2xl shadow-based">
                <div className="ml-10 p-6 mr-10 bg-white border-b border-gray-200 font-sans rounded-2xl">
                    <div className="form">
                        <Form setTasks={setTasks} />
                    </div>
                    <Tasks tasks={tasks} />
                </div>
            </div>
        </AppLayout>
    )
}
