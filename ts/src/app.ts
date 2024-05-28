import anime from "animejs";
import { Task } from "./task";

type TaskProp = {
  description: string;
  completed: boolean;
};

const form = document.querySelector("form");
const contenedorTareas: HTMLElement | null = document.querySelector(".list_task");
const input = document.querySelector("input");
const tareas: TaskProp[] = [];

const agregarTarea = (tarea: string) => {
  const newTask = new Task(tarea);
  tareas.push(newTask);
  renderTareas();
};

const renderTareas = () => {
  if (contenedorTareas) {
    contenedorTareas.innerHTML = "";
  }
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
    if (contenedorTareas) {
      contenedorTareas.append(li);
    }
    li.append(deleteBtn);
  });
};

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const descripcion = input?.value.trim();
  if (!descripcion) return;
  agregarTarea(descripcion);
  if (!input) return;
  input.value = "";
  renderTareas();

  const lastLi = contenedorTareas?.querySelector("li:last-child");
  anime({
    targets: lastLi,
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 800,
  });
});

const deleteTask = (index: number) => {
  tareas.splice(index, 1);
  renderTareas();
};

renderTareas();
