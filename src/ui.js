import * as Controllers from "./controllers.js";
import { tasks } from "./barrel.js";
import { el } from "./barrel.js";
import { container } from "webpack";

export const displayToggleProjectPromt = (bool) => {
  bool ? el.projTitlePromt.classList.remove("hidden") : el.projTitlePromt.classList.add("hidden");
};

export const displayToggleTodoForm = (bool) => {
  bool ? el.projTodoFormContainer.classList.remove("hidden") : el.projTodoFormContainer.classList.add("hidden");
};



export const ClearprojInput = () => {
  el.titleProject.value = "";
  el.titleProject.focus();
}

export const ClearTodoFormInputs = () => {
  el.titleToDo.value = "";
  el.description.value = "";
  el.dueDate.value = "";
  el.priority.value = "";
  el.checklist.checked = false;
  el.titleToDo.focus();
};
export const createProjectCards = ({id = "", project = ""} = {}) => {
  const container = document.createElement("div");
  container.id = id;
  container.classList.add("proj-class");

  const titleProj = document.createElement("span");
  titleProj.textContent = project;

  const editBtn =  document.createElement("button");
  Object.assign(editBtn, {type : "button", name : "action", value : "edit", className : "edit-proj", textContent : "Edit"});

  const deleteBtn =  document.createElement("button");
  Object.assign(deleteBtn, {type : "button", name : "action", value : "delete", className : "delete-proj", textContent : "Delete"});

  const addTodoBtn =  document.createElement("button");
  Object.assign(addTodoBtn, {type : "button", name : "action", value : "addTodo", className : "add-todo", textContent : "Add Todo"});

  container.append(titleProj, editBtn, deleteBtn, addTodoBtn);

  return container;
}
export const renderProjectCards = () => {
  el.projCardsContainer.innerHTML = "";
  tasks.forEach(project => {
    el.projCardsContainer.appendChild(createProjectCards(project));
  });
};

export const renderIncrementalProjCards = () => {
  el.projCardsContainer.appendChild(createProjectCards(tasks[tasks.length - 1]));
};

export const createToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}) => {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("todo-class");
   
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
    Object.assign(editBtn, {type : "button", name : "action", value : "edit", className : "edit-todo", textContent : "Edit"});

    const deleteBtn =  document.createElement("button");
    Object.assign(deleteBtn, {type : "button", name : "action", value : "delete", className : "delete-todo", textContent : "Delete"});

    container.append( titleTodo, descriptionTodo, dueDateTodo, priorityTodo, checklistTodo, editBtn, deleteBtn);  

    return container;
}
export const renderToDoCards = (projId) => {
  const projIdx = Controllers.findIdxofProj(projId)
  if(projIdx === null) return null;
  el.todoCardsContainer.innerHTML = "";
  tasks[projIdx].todoes.forEach(todo => {
    el.todoCardsContainer.appendChild(createToDoCards(todo));
  });
};

export const renderIncrementalToDoCard = (projId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  if(projIdx === null) return null;
  const newCard = tasks[projIdx].todoes[tasks[projIdx].todoes.length - 1];
  el.todoCardsContainer.appendChild(createToDoCards(newCard));
}