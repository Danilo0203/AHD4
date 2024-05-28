import anime from "animejs";
import { Task } from "./task";

const form = document.querySelector("form");
const contenedorTareas = document.querySelector(".list_task");
const input = form.querySelector("input");
const tareas = [];

const agregarTarea = (tarea) => {
  const newTask = new Task(tarea);
  tareas.push(newTask);
  renderTareas();
};

const renderTareas = () => {
  contenedorTareas.innerHTML = "";
  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.description;
    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", () => {
      const index = tareas.indexOf(tarea);
      deleteTask(index);
    });

    if (tarea.completed) {
      li.classList.add("completed");
      deleteBtn.disabled = true;
    }

    li.addEventListener("click", () => {
      tarea.completed = !tarea.completed;
      li.classList.toggle("completed");
      deleteBtn.disabled = !deleteBtn.disabled;
    });

    deleteBtn.textContent = "Eliminar";
    contenedorTareas.append(li);
    li.append(deleteBtn);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const descripcion = input.value.trim();
  if (!descripcion) return;
  agregarTarea(descripcion);
  input.value = "";
  renderTareas();

  const lastLi = contenedorTareas.querySelector("li:last-child");
  anime({
    targets: lastLi,
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 800,
  });
});

const deleteTask = (index) => {
  tareas.splice(index, 1);
  renderTareas();
};

renderTareas();
