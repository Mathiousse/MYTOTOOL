<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::create([
            'name' => 'Mathieu',
            'email' => 'mathieu.capon@viacesi.fr',
            'password' => '$2y$10$582MwgnJGKCC2Bu.ApvleOZ8yCnBLnV/rPZuX.hSZOKGgKeNqJDxG', // discord cubes groupe for password
        ]);

        $task = Task::create([
            'text' => "Task test 1" 
        ]);

        $task->users()->attach(User::where('email', '=', 'mathieu.capon@viacesi.fr')->first());
    }
}