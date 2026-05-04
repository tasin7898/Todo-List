import "./styles.css";
import {tasks, toLocalStorage, el, edited, form, displayToggleProjectPromt, addProjValues, fromLocalStorage, logProjectValues, displayToggleTodoForm, displayToggleTodoCreateBtn, ClearTodoFormInputs, renderIncrementalProjCards, removeProject, renderProjectCards, renderEditedProjCard, saveEditedProj, createProjectCards, findIdxofProj, renderIncrementalToDoCard, addToDoValues, removeToDo, renderToDoCards, saveEditedToDos, renderEditableTodoCard, renderEditedTodoCard, findIdxofTodo, renderEditableProjCard, ClearProjInput, getProjectValues, defaultProj} from "./barrel.js"

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


el.createProjBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  displayToggleProjectPromt(true);
  
});

document.addEventListener("click", ()=> {
   displayToggleProjectPromt(false);
   ClearProjInput();
})
el.projTitlePromt.addEventListener("click", (e) => {
  e.stopPropagation();
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
el.addProjBtn.addEventListener("click", (e) => {
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
  
});


el.projCardsContainer.addEventListener("click", (e) => {

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
      displayToggleTodoForm(true);
      ClearTodoFormInputs();
    }
    if(button.classList.contains("delete-proj")){
      removeProject(projId);
      toLocalStorage(tasks);
      projEl.remove()
      //renderProjectCards();
    }
    if(button.classList.contains("edit-proj")){
      
      //saveEditedProj(projId);
      //renderEditedProjCard(projId);
      renderEditableProjCard(projId);
      //console.log(document.getElementById("title-projectEdit"));
      //console.log(edited.titleProject);
    }   
    if(button.classList.contains("cancel-proj")){
            //displayToggleTodoForm(true);
      renderBackProjCard(projId);
    }
    if(button.classList.contains("save-proj")){
            //displayToggleTodoForm(true);
      //renderBackProjCard(projId);
      saveEditedProj(projId, projEl);
      toLocalStorage(tasks);
      renderEditedProjCard(projId);
      ClearProjInput();
      console.log(tasks);
      console.log(projId);
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
    }
    if(button.classList.contains("cancel-todo")){
      renderEditedTodoCard(projId, todoId, projEl);
    }
    if(button.classList.contains("save-todo")){
      saveEditedToDos(projId, todoId, todoEl);
      toLocalStorage(tasks);
      renderEditedTodoCard(projId, todoId, projEl);
      //ClearTodoFormInputs();
    }
      
      //renderProjectCards();
    
  
  //displayToggleTodoForm(true);
})

el.addTodoBtn.addEventListener("click", (e) => {
  if(!el.todoForm.checkValidity()) return;
  e.preventDefault();
  const projId = el.projTodoFormContainer.dataset.projId;
  const projEl = document.getElementById(projId);
  //console.log(projId);
  //const projidx = findIdxofProj(projId);
  addToDoValues(projId);
  toLocalStorage(tasks);
  renderIncrementalToDoCard(projId, projEl);
  displayToggleTodoForm(false);
});


//el.todoCardsContainer.addEventListener("click", (e) => {
 // const button = e.target.closest("button");
//})