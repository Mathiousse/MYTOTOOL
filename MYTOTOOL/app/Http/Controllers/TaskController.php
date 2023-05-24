<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
  // log the request data
  Log::info($request->all());

  $task = Task::findOrFail($id);

  // log the task before updating
  Log::info($task->toArray());

  // validate the data
  $validated = $request->validate([
    'text' => 'sometimes|required|string|max:255',
    'completed' => 'sometimes|required|boolean',
  ]);
  
  // update the task with the validated data
  $task->update($validated);

  // log the task after updating
  Log::info($task->toArray());
  
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