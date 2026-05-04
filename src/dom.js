import { container } from "webpack";
import { tasks } from "./barrel.js";
import * as Controllers from "./controllers.js";
import { createProjectCards, createToDoCards } from "./barrel.js";
export const el = {
  titleToDo : document.getElementById("title-todo"),
  description: document.getElementById("description"),
  dueDate : document.getElementById("due-date"),
  priority : document.getElementById("priority"),
  checklist : document.getElementById("checklist"),

  titleProject : document.getElementById("input-title-proj"),

  createProjBtn : document.getElementById("create-project-button"),
  createTodoBtn : document.getElementById("create-todo-button"),
  addProjBtn : document.getElementById("add-proj-button"),  
  addTodoBtn : document.getElementById("add-todo-button"),
  removeProjBtn : document.getElementById("remove-project-button"),
  removeTodoBtn : document.getElementById("remove-todo-button"),
  closeProjInputBtn : document.getElementById("close-proj-button"),
  projTitlePromt : document.querySelector(".project-inputField"),
  projCardsContainer : document.getElementById("proj-container"),
  projectError : document.getElementById("proj-error"),

  todoCardsContainer : document.getElementById("todo-container"),
  projTodoFormContainer : document.getElementById("todo-form"),
  todoForm : document.getElementById("form"),
  todoCreateBtnContainer : document.querySelector(".create-todo-button-container"),
}
export const edited = {
  titleToDo : document.getElementById("titleEdit"),
  description: document.getElementById("desEdit"),
  dueDate : document.getElementById("dueDateEdit"),
  priority : document.getElementById("priorityEdit"),
  checklist : document.getElementById("checklistEdit"),

  titleProject : document.getElementById("title-projectEdit"),
  projectError : document.getElementById("proj-error"),
};




export const editToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}, checklistFlag) => {
  
  const container = document.createElement("form");
  container.id = id;
  container.classList.add("todo-class");
  
  const titleLabel = document.createElement("label");
  Object.assign(titleLabel, { textContent : "Title: " });

  const titleTodo = document.createElement("input");
  Object.assign(titleTodo, { className : "title", type : "text", name: "titleEdit", value : title, required : true });

  titleLabel.appendChild(titleTodo);

  const desLabel = document.createElement("label");
  Object.assign(desLabel, { textContent : "Description: " });

  const descriptionTodo = document.createElement("input");
  Object.assign(descriptionTodo, { className : "description", type : "text", name: "desEdit", value : description });

  desLabel.appendChild(descriptionTodo);

  const dueDateLabel = document.createElement("label");
  Object.assign(dueDateLabel, { textContent : "Due Date: "});

  const dueDateTodo = document.createElement("input");
  Object.assign(dueDateTodo, { className : "dueDate", type : "date", name: "dueDateEdit", value : dueDate });

  dueDateLabel.appendChild(dueDateTodo);

  const priorityLabel = document.createElement("label");
  Object.assign(priorityLabel, { textContent : "Choose Priority: " });

  const priorityTodo = document.createElement("select");
  Object.assign(priorityTodo, { className : "priority", name: "priorityEdit" });

  const prios = ["", "low", "medium", "high"];
  prios.forEach(prio => {
    const option = document.createElement("option");
    if(!prio) Object.assign(option, {selected : true, disabled : true, textContent : "Choose Priority", value : ""});
    else Object.assign(option, {value : prio, textContent : prio[0].toUpperCase() + prio.slice(1)});
    priorityTodo.appendChild(option);
  });

  priorityLabel.appendChild(priorityTodo);

  const checklistLabel = document.createElement("label");
  Object.assign(checklistLabel, { textContent : "Finished" });

  const checklistTodo = document.createElement("input");
  Object.assign(checklistTodo,{ className : "checklist", type : "checkbox", name : "checklistEdit", checked : checklistFlag || false });

  checklistLabel.appendChild(checklistTodo);

  const wrapper = document.createElement("div");
  wrapper.classList.add("button-row");

  const cancelBtn = document.createElement("button");
  const saveBtn =  document.createElement("button");

  Object.assign(cancelBtn, {type : "button", name : "action", value : "cancel", className : "cancel-todo", textContent : "Cancel"});
  Object.assign(saveBtn, {type : "button", name : "action", value : "save", className : "save-todo", textContent : "Save"});

  wrapper.append(cancelBtn, saveBtn);

  container.append(
    titleLabel, 
    desLabel, 
    dueDateLabel, 
    priorityLabel, 
    checklistLabel, 
    wrapper
  );

  return container;
};





export const editProj = ({id = "", project = ""} = {}) => {
 
  const container = document.createElement("div");
  container.id = id;
  container.classList.add("proj-class");

  const titleLabel = document.createElement("label");
  Object.assign(titleLabel, { textContent : "Title: " });

  const title = document.createElement("input");
  Object.assign(title, { className : "title-projectEdit", type : "text", name: "title-projectEdit", value : project });

  titleLabel.appendChild(title);

  const cancelBtn = document.createElement("button");
  const saveBtn =  document.createElement("button");

  Object.assign(cancelBtn, {type : "button", name : "action", value : "cancel", className : "cancel-proj", textContent : "Cancel"});
  Object.assign(saveBtn, {type : "button", name : "action", value : "save", className : "save-proj", textContent : "Save"});

  container.append(titleLabel, cancelBtn, saveBtn);
  return container;
};

export const renderEditableProjCard = (projId) => {
  const projIndex = Controllers.findIdxofProj(projId);
  if (projIndex === null) return null;
  const oldCard = document.getElementById(projId);
  if (!oldCard) return null;
  el.projCardsContainer.replaceChild(editProj(tasks[projIndex]), oldCard)
}

export const renderEditedProjCard = (projId) => {
  const projIndex = Controllers.findIdxofProj(projId);
  if (projIndex === null) return null;
  const oldCard = document.getElementById(projId);
  if (!oldCard) return null;
  el.projCardsContainer.replaceChild(createProjectCards(tasks[projIndex]), oldCard);
  
}

/*export const renderEditedProjCard = (projidx, projId) => {
  const oldCard = document.getElementById(projId);
  if (!oldCard || projidx === null) return null;
  el.projCardsContainer.replaceChild(createProjectCards(tasks[projidx]), oldCard);
}*/

export const renderEditableTodoCard = (projId, todoId, projEl) => {
  const projIndex = Controllers.findIdxofProj(projId);
  const todoIndex = Controllers.findIdxofTodo(projId, todoId);
  if (projIndex === null || todoIndex === null) return null;
  const oldCard = document.getElementById(todoId);
  if(!oldCard) return null;
  const checklistFlag = oldCard.querySelector(".checklist").textContent === "Finished";
  projEl.querySelector(".todo-container").replaceChild(editToDoCards(tasks[projIndex].todoes[todoIndex], checklistFlag), oldCard);
}

export const renderEditedTodoCard = (projId, todoId, projEl) => {
  const projIndex = Controllers.findIdxofProj(projId);
  const todoIndex = Controllers.findIdxofTodo(projId, todoId);
  if (projIndex === null || todoIndex === null) return null;
  const oldCard = document.getElementById(todoId);
  if(!oldCard) return null;
  projEl.querySelector(".todo-container").replaceChild(createToDoCards(tasks[projIndex].todoes[todoIndex]), oldCard);
}

