// app.js
import { TodoList } from "./todo.js";

const myTodos = new TodoList();

myTodos.addTask("Learn Node.js");
myTodos.addTask("Finish project");
myTodos.addTask("Take a break");

myTodos.completeTask("Learn Node.js");

myTodos.listTasks();
