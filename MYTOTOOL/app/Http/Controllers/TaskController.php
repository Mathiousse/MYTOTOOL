<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $tasks = User::find($user->id)->first()->tasks;

        return Inertia::render('Dashboard', [
            'tasks' => $tasks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $task = Task::create($request->validate([
            'text' => ['required'],
        ]));

        $user->tasks()->attach($task);

        $tasks = $user->tasks;

        return to_route('task.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    $task = Task::findOrFail($id);

    $data = $request->input('data');

    $task->update($data);

    return redirect()->route('task.index')->with('success', 'Tâche mise à jour');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // dd(Task::find((int)$id));
        $task = Task::find($id);
        $task->users()->detach();
        $task->delete();
    }
}