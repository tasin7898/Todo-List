import * as Controllers from "./controllers.js";
import { tasks } from "./barrel.js";
import { el } from "./barrel.js";
import { container } from "webpack";

export const displayToggleProjectPromt = () => {
  el.projTitlePromt.classList.toggle("hidden");
};

export const createProjectCards = ({id = "", project = ""} = {}) => {
  const container = document.createElement("div");
  container.id = id;
  const titleProj = document.createElement("span");
  titleProj.textContent = project;
  container.appendChild(titleProj);
  return container;
}
export const renderProjectCards = () => {
  el.projCardsContainer.innerHTML = "";
  tasks.forEach(project => {
    el.projCardsContainer.appendChild(createProjectCards(project));
  });
};

export const createToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}) => {
    const container = document.createElement("div");
    container.id = id;

    const titleTodo = document.createElement("div");
    titleTodo.classList.add("todo-titles");
    titleTodo.textContent = title;

    const descriptionTodo = document.createElement("p");
    descriptionTodo.textContent = description;

    const dueDateTodo = document.createElement("p");
    dueDateTodo.textContent = dueDate;

    const priorityTodo = document.createElement("p");
    priorityTodo.textContent = priority;

    const checklistTodo = document.createElement("p");
    checklistTodo.textContent = checklist ? "Finished" : "Not Finished";

    const editBtn =  document.createElement("button");
    Object.assign(editBtn, {type : "button", name : "action", value : "edit", id : "edit-todo", textContent : "Edit"});

    container.append(titleTodo, descriptionTodo, dueDateTodo, priorityTodo, checklistTodo, editBtn);  

    return container;
}
export const renderToDoCards = (projId) => {
  const projIdx = Controllers.findIdxofProj(projId)
  if(projIdx === null) return null;
  el.projTodoContainer.innerHTML = "";
  tasks[projIdx].todoes.forEach(todo => {
    el.projTodoContainer.appendChild(createToDoCards(todo));
  });
};

export const renderIncrementalToDoCard = (projId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  if(projIdx === null) return null;
  const newCard = tasks[projIdx].todoes[tasks[projIdx].todoes.length - 1];
  el.projTodoContainer.appendChild(createToDoCards(newCard));
}