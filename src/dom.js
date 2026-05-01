import { container } from "webpack";
import { tasks } from "./barrel.js";
import * as Controllers from "./controllers.js";
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

  projTitlePromt : document.querySelector(".project-inputField"),
  projCardsContainer : document.getElementById("proj-container"),
  projectError : document.getElementById("proj-error"),

  projTodoContainer : document.getElementById("proj-container"),
  projTodoForm : document.getElementById("todo-form"),
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




export const editToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}) => {
  
  //const {id, title, description, dueDate, priority, checklist} = tasks[projIdx].todoes[todoIdx];

    const container = document.createElement("form");
    container.id = id;

    const titleLabel = document.createElement("label");
    Object.assign(titleLabel, {htmlFor : "titleEdit", textContent : "Title: "});
    const titleTodo = document.createElement("input");
    Object.assign(titleTodo, {id : "titleEdit", type : "text", name: "titleEdit", value : title, required : true}); 

    const desLabel = document.createElement("label");
    Object.assign(desLabel, {htmlFor : "desEdit", textContent : "Description: "})
    const descriptionTodo = document.createElement("input");
    Object.assign(descriptionTodo, {id : "desEdit", type : "text", name: "desEdit", value : description});

    const dueDateLabel = document.createElement("label");
    Object.assign(dueDateLabel, {htmlFor : "dueDateEdit", textContent : "Due Date: "});
    const dueDateTodo = document.createElement("input");
    Object.assign(dueDateTodo, {id : "dueDateEdit", type : "date", name: "dueDateEdit", value : dueDate});

    const priorityLabel = document.createElement("label");
    Object.assign(priorityLabel, {htmlFor : "priorityEdit", textContent : "Choose Priority: "});

    const priorityTodo = document.createElement("select");
    Object.assign(priorityTodo, {id : "priorityEdit", name: "priorityEdit"});

    const prios = ["", "low", "medium", "high"];
    prios.forEach(prio => {
      const option = document.createElement("option");
      if(!prio) Object.assign(option, {selected : true, disabled : true, textContent : "Choose Priority", value : ""});
      else {
      Object.assign(option, {value : prio, textContent : prio[0].toUpperCase() + prio.slice(1)});
      }
      priorityTodo.appendChild(option);
    });

    const checklistTodo = document.createElement("input");
    Object.assign(checklistTodo,{type : "checkbox", id : "checklistEdit", name : "checklistEdit"});
    const checklistLabel = document.createElement("label");
    Object.assign(checklistLabel, {htmlFor : "checklistEdit", textContent : "Finished"});

    const wrapper = document.createElement("div");
    wrapper.classList.add("button-row");

    const cancelBtn = document.createElement("button");
    const saveBtn =  document.createElement("button");
    Object.assign(cancelBtn, {type : "button", name : "action", value : "cancel", id : "cancel-todo", textContent : "Cancel"});
    Object.assign(saveBtn, {type : "button", name : "action", value : "save", id : "save-todo", textContent : "Save"});
    wrapper.append(cancelBtn, saveBtn);

    container.append(titleLabel, titleTodo, desLabel, descriptionTodo, dueDateLabel, dueDateTodo, priorityLabel, priorityTodo, checklistTodo, checklistLabel, wrapper);
    return container;
    //projTodoContainer.appendChild(container);  
};

export const renderEditedTodoCards = (projId, todoId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  const todoIdx = Controllers.findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  el.projTodoContainer.replaceChildren(editToDoCards(tasks[projIdx].todoes[todoIdx]));
  //const oldCard = document.getElementById(todoId);
  //el.projTodoContainer.replaceChild(editToDoCards(tasks[projIdx].todoes[todoIdx]), oldCard);
};

export const renderIncrementalEditedTodoCards = (projId, todoId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  const todoIdx = Controllers.findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  //el.projTodoContainer.replaceChildren(editToDoCards(tasks[projIdx].todoes[todoIdx]));
  const oldCard = document.getElementById(todoId);
  if (!oldCard) return null;
  el.projTodoContainer.replaceChild(editToDoCards(tasks[projIdx].todoes[todoIdx]), oldCard);
};

export const editProj = ({id = "", project = ""} = {}) => {
 
  const container = document.createElement("div");
  container.id = id;
  const titleLabel = document.createElement("label");
  Object.assign(titleLabel, {htmlFor : "titleProjEdit", textContent : "Title: "});
  const titleTodo = document.createElement("input");
  Object.assign(titleTodo, {id : "titleProjEdit", type : "text", name: "titleProjEdit", value : project}); 

  const cancelBtn = document.createElement("button");
  const saveBtn =  document.createElement("button");
  Object.assign(cancelBtn, {type : "button", name : "action", value : "cancel", id : "cancel-proj", textContent : "Cancel"});
  Object.assign(saveBtn, {type : "button", name : "action", value : "save", id : "save-proj", textContent : "Save"});

  container.append(titleLabel, titleTodo, cancelBtn, saveBtn);
  return container;
};

export const renderEditedProjCard = (projId) => {
  const projIndex = Controllers.findIdxofProj(projId);
  if (projIndex === null) return null;
  const oldCard = document.getElementById(projId);
  if (!oldCard) return null;
  el.projCardsContainer.replaceChild(editProj(tasks[projIndex]), oldCard)
}

