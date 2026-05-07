import * as Controllers from "./controllers.js";
import { tasks } from "./barrel.js";
import { el } from "./barrel.js";
import { container } from "webpack";
import { format } from "date-fns";
export const displayToggleProjectPromt = (bool) => {
  bool ? el.projTitlePromt.classList.remove("hidden") : el.projTitlePromt.classList.add("hidden");
};

export const displayToggleTodoForm = (bool) => {
  bool ? el.projTodoFormContainer.classList.add("open") : el.projTodoFormContainer.classList.remove("open");
};



export const ClearProjInput = () => {
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
  titleProj.classList.add("proj-title");
  titleProj.textContent = project;

  const editBtn =  document.createElement("button");
  Object.assign(editBtn, {type : "button", name : "action", value : "edit", className : "edit-proj", textContent : "✏️"});

  const deleteBtn =  document.createElement("button");
  Object.assign(deleteBtn, {type : "button", name : "action", value : "delete", className : "delete-proj", textContent : "🗑️"});

  const addTodoBtn =  document.createElement("button");
  Object.assign(addTodoBtn, {type : "button", name : "action", value : "addTodo", className : "add-todo", textContent : " ➕ Add Todo"});

  const btnWrapper = document.createElement("div");

  btnWrapper.append(editBtn, deleteBtn, addTodoBtn);
  btnWrapper.classList.add("btn-wrapper");
  const wrapper = document.createElement("div");
  wrapper.classList.add("todo-container-wrapper");

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  wrapper.appendChild(todoContainer);

  container.append(titleProj, btnWrapper, wrapper);

  return container;
}


export const createToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}) => {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("todo-class");
    container.classList.remove("low", "medium", "high");

    if(priority) container.classList.add(priority.toLowerCase());

    const titleTodo = document.createElement("div");
    titleTodo.classList.add("todo-titles");
    titleTodo.textContent = "Title: " + title;

    const todoDetail = document.createElement("div");
    todoDetail.classList.add("todo-details");

    const descriptionTodo = document.createElement("p");
    descriptionTodo.textContent = "Description: " + description;

    const dueDateTodo = document.createElement("p");
    dueDateTodo.textContent = dueDate
    ? "Due Date: " + format(new Date(dueDate), "d MMM, yyyy") : "Due Date: ";

    const priorityTodo = document.createElement("p");
    priorityTodo.textContent = "Priority: " + priority;

    const checklistTodo = document.createElement("p");
    checklistTodo.classList.add("checklist");
    checklistTodo.textContent = checklist ? "Finished" : "Not Finished";

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");

    const editBtn =  document.createElement("button");
    Object.assign(editBtn, {type : "button", name : "action", value : "edit", className : "edit-todo", textContent : "✏️"});

    const deleteBtn =  document.createElement("button");
    Object.assign(deleteBtn, {type : "button", name : "action", value : "delete", className : "delete-todo", textContent : "🗑️"});

    btnWrapper.append(editBtn, deleteBtn);
    todoDetail.append(descriptionTodo, dueDateTodo, priorityTodo, checklistTodo, btnWrapper)
    container.append( titleTodo, todoDetail);  

    return container;
}
export const renderProjectCards = () => {
  el.projCardsContainer.innerHTML = "";
  tasks.forEach(project => {
    const currentProj = createProjectCards(project);
    const todoContainer = currentProj.querySelector(".todo-container")
    el.projCardsContainer.appendChild(currentProj);
    project.todoes?.forEach(todo => {
      todoContainer.appendChild(createToDoCards(todo));
    });
  });
};

export const renderIncrementalProjCards = () => {
  el.projCardsContainer.appendChild(createProjectCards(tasks[tasks.length - 1]));
};

export const renderToDoCards = (projId, projEl) => {
  const projIdx = Controllers.findIdxofProj(projId)
  if(projIdx === null) return null;
  const todoContainer = projEl.querySelector(".todo-container");
  todoContainer.innerHTML = "";
  tasks[projIdx].todoes.forEach(todo => {
    todoContainer.appendChild(createToDoCards(todo));
  });
};

export const renderIncrementalToDoCard = (projId, projEl) => {
  const projIdx = Controllers.findIdxofProj(projId);
  if(projIdx === null) return null;
  const newCard = tasks[projIdx].todoes[tasks[projIdx].todoes.length - 1];

  projEl.querySelector(".todo-container").appendChild(createToDoCards(newCard));
  
}

