export const displayToggleProjectPromt = () => {
  el.projTitlePromt.classList.toggle("hidden");
};

export const renderProjectCards = () => {
  projCardsContainer.innerHTML = tasks.map(item =>  `<div id="${item.id}">${item.project}</div>` ).join("");
};

export const renderToDoCards = (projId) => {
  tasks[findIdxofProj(projId)].todoes.forEach(({id, title, description, dueDate, priority, checklist}) => {

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
    projTodoContainer.appendChild(container);
  })
};
