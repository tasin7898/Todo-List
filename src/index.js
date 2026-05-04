import "./styles.css";
import {tasks, toLocalStorage, el, edited, form, displayToggleProjectPromt, addProjValues, fromLocalStorage, logProjectValues, displayToggleTodoForm, displayToggleTodoCreateBtn, ClearTodoFormInputs, renderIncrementalProjCards, removeProject, renderProjectCards, renderEditedProjCard, saveEditedProj, createProjectCards, findIdxofProj, renderIncrementalToDoCard, addToDoValues, removeToDo, renderToDoCards, saveEditedToDos, renderEditableTodoCard, renderEditedTodoCard, findIdxofTodo, renderEditableProjCard, ClearProjInput, getProjectValues, defaultProj, getToDoValues, getEditedToDoValues} from "./barrel.js"

(function init (){
  //console.log(fromLocalStorage());
  //if(!fromLocalStorage().length) return;
  const storage = fromLocalStorage();
  tasks.length = 0;
  if (storage.length > 0) tasks.push(...fromLocalStorage());
  else tasks.push(defaultProj);
 // if(tasks.length === 0) 
  renderProjectCards();
})();

const state = {
  editingProjId : null,
  editingTodoId : null,
};

const outsideClickHandlers = {
  proj : null,
  todo : null,
}

el.createProjBtn.addEventListener("click", (e) => {
  //e.stopPropagation();
  displayToggleProjectPromt(true);
  
});

document.addEventListener("click", (e) => {
  const target = e.target;
  const exclusions = [el.createProjBtn, el.projTitlePromt, el.projTodoFormContainer, el.dialogFormConfirm]
  if(exclusions.some(zone => zone.contains(target))) return;
  if(getProjectValues()){
    addProjValues();
    toLocalStorage(tasks);
    renderIncrementalProjCards();
    ClearProjInput();
    }
  displayToggleProjectPromt(false);
  if(!el.projTodoFormContainer.classList.contains("hidden"))[...Object.values(getToDoValues())].some(Boolean) ? el.dialogFormConfirm.showModal() : displayToggleTodoForm(false);
  
  
  
   //ClearProjInput();
})
el.projTitlePromt.addEventListener("click", (e) => {
  //e.stopPropagation();
  const button = e.target.closest("button");
  if(!button) return;
  if(button.id === "close-proj-button"){
    displayToggleProjectPromt(false);
    ClearProjInput();
  }
  if(button.id === "add-proj-button") {
    if(!getProjectValues()) {
      alert("Project must have a title!");
      return;
    }
    displayToggleProjectPromt(false);
    //displayToggleTodoCreateBtn(true);
    addProjValues();
    toLocalStorage(tasks);
    renderIncrementalProjCards();
    ClearProjInput();
    }
})


el.projCardsContainer.addEventListener("click", (e) => {
  e.stopPropagation();
  const projEl = e.target.closest(".proj-class");
  if (!projEl) return;
  //console.log(projEl);
  const projId = projEl?.id;
  //const projidx = findIdxofProj(projId);
  const button = e.target.closest("button");
  if(!button) return;
  //console.log( e.target.closest('.proj-class'));
  //const projIndex = findIdxofProj(projId);
  //console.log(createProjectCards(tasks[projIndex]));
  //const projIdForm = el.projTodoFormContainer.dataset.projId;
  //const projElForm = document.getElementById(projId);
  const todoEl = e.target.closest(".todo-class");
  //if (!todoEl) return;
  const todoId = todoEl?.id;
  

    if(button.classList.contains("add-todo")){
      
      el.projTodoFormContainer.dataset.projId = projId;
      console.log(projId, tasks)
      displayToggleTodoForm(true);
      //ClearTodoFormInputs();
    }
    if(button.classList.contains("delete-proj")){
      removeProject(projId);
      toLocalStorage(tasks);
      projEl.remove()
      //renderProjectCards();
    }
    if(button.classList.contains("edit-proj")){
      renderEditableProjCard(projId);
      
     /* if(state.editingProjId && state.editingProjId !== projId){
        saveEditedProj(state.editingProjId, document.getElementById(state.editingProjId));
        toLocalStorage(tasks);
        renderEditedProjCard(state.editingProjId);
      } */
     
      
      
      if(outsideClickHandlers.proj) {
        document.removeEventListener("click", outsideClickHandlers.proj);
        outsideClickHandlers.proj();
      };

      outsideClickHandlers.proj = () => {
        const projEl =  document.getElementById(projId);
        if(!projEl) return;
        const inputEl = projEl.querySelector(".title-projectEdit") ;
        const projInputField = inputEl?.value.trim();
       
        if(!projInputField){
          renderEditedProjCard(projId);
        }
        else {
          saveEditedProj(projId, projEl);
          toLocalStorage(tasks);
          renderEditedProjCard(projId);
          ClearProjInput();
        }
        document.removeEventListener("click", outsideClickHandlers.proj);
        outsideClickHandlers.proj = null;
      }

      
        document.addEventListener("click", outsideClickHandlers.proj);
        
      
      //document.addEventListener("click", outsideClickHandlers.proj);
      //state.editingProjId = projId;
      //saveEditedProj(projId);
      //renderEditedProjCard(projId);
      
      //console.log(document.getElementById("title-projectEdit"));
      //console.log(edited.titleProject);
    }   
    if(button.classList.contains("cancel-proj")){
            //displayToggleTodoForm(true);
      renderEditedProjCard(projId);
      outsideClickHandlers.proj = null;
    }
    if(button.classList.contains("save-proj")){
            //displayToggleTodoForm(true);
      //renderBackProjCard(projId);
      saveEditedProj(projId, projEl);
      toLocalStorage(tasks);
      renderEditedProjCard(projId);
      ClearProjInput();
      outsideClickHandlers.proj = null;
      //console.log(tasks);
      //console.log(projId);
      //console.log(findIdxofProj(projId));
      //console.log(createProjectCards(tasks[findIdxofProj(projId)]));
    }
     if(button.classList.contains("delete-todo")){
      removeToDo(projId, todoId);
      toLocalStorage(tasks);
      todoEl.classList.add("fade-out");
      todoEl.addEventListener("transitionend", () => todoEl.remove(), { once: true });
      //console.log(tasks);
      //console.log(tasks);
      //console.log(projId, todoId);
      //console.log(todoEl);
      //renderToDoCards(projId, projEl);
    }
    if(button.classList.contains("edit-todo")){
      //saveEditedToDos(projId, todoId, todoEl);
      //console.log(document.getElementById(todoId), tasks, projId);
      
      renderEditableTodoCard(projId, todoId, projEl);
      outsideClickHandlers.todo = () => {
        const todoEl = document.getElementById(todoId);
        if(!todoEl) return;
        if([...Object.values(getEditedToDoValues(todoEl, undefined))].some(Boolean)){
          el.dialogFormConfirm.showModal();
        }
        else renderEditedTodoCard(projId, todoId, projEl);
        document.removeEventListener("click", outsideClickHandlers.todo);
        outsideClickHandlers.todo = null;
      }
      document.addEventListener("click", outsideClickHandlers.todo);

    }
    if(button.classList.contains("cancel-todo")){
      renderEditedTodoCard(projId, todoId, projEl);
      outsideClickHandlers.todo = null;
    }
    if(button.classList.contains("save-todo")){
      saveEditedToDos(projId, todoId, todoEl);
      toLocalStorage(tasks);
      renderEditedTodoCard(projId, todoId, projEl);
      outsideClickHandlers.todo = null;
      //ClearTodoFormInputs();
    }
      
      //renderProjectCards();
    
  
  //displayToggleTodoForm(true);
})
el.projTodoFormContainer.addEventListener("click", (e) => {
  //e.stopPropagation();
  const button = e.target.closest("button");
  if(!button) return;
  if(button.id === "close-todo-button"){
    if([...Object.values(getToDoValues())].some(Boolean)){
    el.dialogFormConfirm.showModal();
    }
    else displayToggleTodoForm(false);
  }
  if(button.id === "clear-todo-button"){
    ClearProjInput();
  }
  if(button.id === "add-todo-button"){
    e.preventDefault();
    if(!el.todoForm.checkValidity()) return;
    const projId = el.projTodoFormContainer.dataset.projId;
    const projEl = document.getElementById(projId);

    addToDoValues(projId);
    toLocalStorage(tasks);
    renderIncrementalToDoCard(projId, projEl);
    displayToggleTodoForm(false);
  }
})


el.dialogFormConfirm.addEventListener("click", (e) => {
  //e.stopPropagation();
  const button = e.target.closest("button");
  if(!button) return;
  if(button.id === "dialog-cancel"){
    el.dialogFormConfirm.close();
  }
  if(button.id === "dialog-discard"){
    el.dialogFormConfirm.close();
    ClearTodoFormInputs();
    displayToggleTodoForm(false);
  }
})
//el.todoCardsContainer.addEventListener("click", (e) => {
 // const button = e.target.closest("button");
//})