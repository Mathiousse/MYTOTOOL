import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">MYTOTOOL</h2>}
        >
            <Head title="MYTOTOOL" />

            <div className=" bg-pinkbg py-12 w-90 m-auto mt-10 mb-10 rounded-2xl shadow-based">
                <div className="ml-10 p-6 mr-10 bg-white border-b border-gray-200 font-sans rounded-2xl">
                    <div className="form">
                        {/* <Form setTasks={setTasks} /> */}
                    </div>
                    {/* <Tasks tasks={tasks} /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
