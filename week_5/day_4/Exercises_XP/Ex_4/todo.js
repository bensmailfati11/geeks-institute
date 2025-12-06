// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  completeTask(taskName) {
    const task = this.tasks.find((t) => t.task === taskName);
    if (task) task.completed = true;
  }

  listTasks() {
    this.tasks.forEach((t, i) =>
      console.log(`${i + 1}. ${t.task} - ${t.completed ? "Done" : "Pending"}`)
    );
  }
}
