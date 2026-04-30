import { tasks } from "./barrel.js";
import * as Controllers from "./controllers.js";
export const el = {
  titleToDo : document.getElementById("title-todo"),
  description: document.getElementById("description"),
  dueDate : document.getElementById("due-date"),
  priority : document.getElementById("priority"),
  checklist : document.getElementById("checklist"),

  titleProject : document.getElementById("title-project"),

  createProjBtn : document.getElementById("create-project-button"),
  createTodojBtn : document.getElementById("create-project-button"),
  addProjBtn : document.getElementById("add-project-button"),  
  addTodoBtn : document.getElementById("add-todo-button"),
  removeProjBtn : document.getElementById("remove-project-button"),
  removeTodoBtn : document.getElementById("remove-todo-button"),

  projTitlePromt : document.getElementById("project-inputField"),
  projCardsContainer : document.getElementById("proj-container"),

  projTodoContainer : document.getElementById("proj-container"),
}
export const form = {
  titleToDo : document.getElementById("titleEdit"),
  description: document.getElementById("desEdit"),
  dueDate : document.getElementById("dueDateEdit"),
  priority : document.getElementById("priorityEdit"),
  checklist : document.getElementById("checklistEdit"),
};

export const getToDoValues = (el) => ({
  title : el.titleToDo.value.trim(),
  description : el.description.value.trim() || "",
  dueDate : el.dueDate.value || "",
  priority : el.priority.value || "",
  checklist : el.checklist.checked,
});


export const editToDoCards = ({title = "", description = "", dueDate = "", priority = "", checklist = false, id = ""} = {}) => {
  
  //const {id, title, description, dueDate, priority, checklist} = tasks[projIdx].todoes[todoIdx];

    const container = document.createElement("form");
    container.id = id;

    const titleLabel = document.createElement("label");
    Object.assign(titleLabel, {htmlFor : "titleEdit", textContent : "Title: "})
    const titleTodo = document.createElement("input");
    Object.assign(titleTodo, {id : "titleEdit", type : "text", name: "titleEdit", value : title}); 

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

export const renderEditedCards = (projId, todoId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  const todoIdx = Controllers.findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  el.projTodoContainer.replaceChildren(editToDoCards(tasks[projIdx].todoes[todoIdx]));
  //const oldCard = document.getElementById(todoId);
  //el.projTodoContainer.replaceChild(editToDoCards(tasks[projIdx].todoes[todoIdx]), oldCard);
};

export const renderIncrementalEditedCards = (projId, todoId) => {
  const projIdx = Controllers.findIdxofProj(projId);
  const todoIdx = Controllers.findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  //el.projTodoContainer.replaceChildren(editToDoCards(tasks[projIdx].todoes[todoIdx]));
  const oldCard = document.getElementById(todoId);
  el.projTodoContainer.replaceChild(editToDoCards(tasks[projIdx].todoes[todoIdx]), oldCard);
};

export const editProj = (projIdx) => {
  const projIndex = Controllers.findIdxofProj(projIdx);
  if (projIndex === null) return null;
  const {id, project} = tasks[projIndex];

}

