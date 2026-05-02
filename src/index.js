import "./styles.css";
import {tasks, toLocalStoreage, el, edited, form, displayToggleProjectPromt, addProjValues, fromLocalStorage, logProjectValues, displayToggleTodoForm, displayToggleTodoCreateBtn, ClearprojInput, ClearTodoFormInputs, renderIncrementalProjCards, removeProject, renderProjectCards, renderEditedProjCard, saveEditedProj, renderBackProjCard, createProjectCards, findIdxofProj, renderSavedProjCard, renderIncrementalToDoCard, addToDoValues, removeToDo, renderToDoCards} from "./barrel.js"

el.createProjBtn.addEventListener("click", () => {
  displayToggleProjectPromt(true);
  
});

el.addProjBtn.addEventListener("click", (e) => {
  if(!Object.values(logProjectValues(el))) {
    alert("Project must have a title!");
    return;
  }
  displayToggleProjectPromt(false);
  //displayToggleTodoCreateBtn(true);
  addProjValues();
  toLocalStoreage(tasks);
  renderIncrementalProjCards();
  ClearprojInput();
  
});


el.projCardsContainer.addEventListener("click", (e) => {
  const projEl = e.target.closest(".proj-class");
  //console.log(projEl);
  const projId = projEl.id;
  const projidx = findIdxofProj(projId);
  const button = e.target.closest("button");
  //console.log( e.target.closest('.proj-class'));
  //const projIndex = findIdxofProj(projId);
  //console.log(createProjectCards(tasks[projIndex]));
  if(button){
    if(button.classList.contains("add-todo")){
      el.projTodoFormContainer.dataset.projId = projId;
      displayToggleTodoForm(true);
    }
    if(button.classList.contains("delete-proj")){
      removeProject(projId);
      renderProjectCards();
    }
    if(button.classList.contains("edit-proj")){
      
      //saveEditedProj(projId);
      //renderEditedProjCard(projId);
      renderEditedProjCard(projId);
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

      renderSavedProjCard(projidx, projId);
      console.log(tasks);
      console.log(projId);
      //console.log(findIdxofProj(projId));
      //console.log(createProjectCards(tasks[findIdxofProj(projId)]));
    }
      
      //renderProjectCards();
    
  }
  //displayToggleTodoForm(true);
})

el.addTodoBtn.addEventListener("click", (e) => {
  if(!el.todoForm.checkValidity()) return;
  e.preventDefault();
  const projId = el.projTodoFormContainer.dataset.projId;
  console.log(projId);
  const projidx = findIdxofProj(projId);
  addToDoValues(projId);
  renderIncrementalToDoCard(projId);
  displayToggleTodoForm(false);
});

el.todoCardsContainer.addEventListener("click", (e) => {

  const projId = el.projTodoFormContainer.dataset.projId;
  const button = e.target.closest("button");
  const todoEl = e.target.closest("todo-class");
  
  //const todoId = todoEl.id;
  if(button){
    
    if(button.classList.contains("delete-todo")){
      //removeToDo(projId, todoId);
      console.log(tasks);
      //console.log(projId, todoId);
      console.log(todoEl);
      //renderToDoCards(projId);
    }
    if(button.classList.contains("edit-todo")){
    }
  }
})
//el.todoCardsContainer.addEventListener("click", (e) => {
 // const button = e.target.closest("button");
//})