import './App.css';

import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// If you export default then you don't need the {} brackets
import { Task } from './models/Task';
import TaskInput from './Components/TaskInput';
import TaskTable from './Components/TaskTable';

import TaskService from './services/task-service';

function App() {
  const [tasks, setTasks] = useState([]);

  // useEffect is a React Hook
  useEffect(() => {
    if (!tasks.length) {
      onInitalLoad();
    }

    async function onInitalLoad() {
      try {
        const tasks = await TaskService.fetchTasks();
        setTasks(tasks);
      } catch (err) {

        console.log(err);
      }
    }
    // In the case of an empty array, the function only
    // fires the first time the component initializes

    // If we put a variable in the [], anytime that variable changes
    // the function fires
  }, []);

  useEffect(() => {
   // saveTasksToLocalStorage();
   console.log('hello');
  }, [tasks]);


  async function onTaskCreate(name) {
    // create the task
    // unique id
   // const id = new Date().getTime();
    // new task instance
    //const task = new Task(id, name, false);

    const task = await TaskService.createTask(new Task(null, name, false));

    // add thee task to the state tasks
    setTasks([...tasks, task]);
  }

   async function onTaskRemove(taskId) {
    // update the tasks state with the filtered tasks
    await TaskService.deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  async function onTaskCompleteToggle(taskId) {
    // toggle the task complete state
    const taskToToggle = tasks.find((task) => task.id === taskId);
    taskToToggle.complete = !taskToToggle.complete;
    TaskService.updateTask(taskToToggle);

    const updateTask = await TaskService.updateTask(taskToToggle);

    // update the tasks state with the new task
    setTasks(
      tasks.map((task) => {
        return task.id == taskId ? updateTask : task;
      })
    );
  }

  // function saveTasksToLocalStorage() {
  //   const json = JSON.stringify(tasks);
  //   localStorage.setItem('tasks', json);
  // }

  // function loadTasksFromLocalStorage() {
  //   const json = localStorage.getItem('tasks');
  //   if (json) {
  //     const taskArr = JSON.parse(json);
  //     if (taskArr.length) {
  //       setTasks(taskArr.map((x) => Task.fromJson(x)));
  //     }
  //   }
  // }

  return (
    <div className="container mt-5">
      <div className="card card-body text-center">
        <h1>Task List</h1>
        <hr />
        <p>Our Task List</p>

        <TaskInput onTaskCreate={onTaskCreate} />
        <TaskTable
          tasks={tasks}
          onTaskRemove={onTaskRemove}
          onTaskCompleteToggle={onTaskCompleteToggle}
        />
      </div>
    </div>
  );
}

export default App;