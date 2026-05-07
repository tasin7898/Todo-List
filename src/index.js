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
  editingTodo : {projId : null, todoId : null},
  skipProjEdit : false,
  skipTodoEdit : false,
  expandTodo : { todoId : null },
};


const outsideProjClickHandler = (target) => {
  const projId = state.editingProjId;
  if(!projId) return;
  const projEl = document.getElementById(projId);
  if(!projEl){
    state.editingProjId = null;
    return;
  }
  if(projEl.contains(target)) return;
  const inputEl = projEl.querySelector(".title-projectEdit");
  const input = inputEl?.value.trim();
  if(!input){
    renderEditedProjCard(projId);
  }
  else {
    saveEditedProj(projId, projEl);
    toLocalStorage(tasks);
    renderEditedProjCard(projId);
    ClearProjInput();
  }
   state.editingProjId = null;
};
const OutsideTodoEditClickHandler = (target) => {
  const { projId, todoId } = state.editingTodo;
  if (!projId || !todoId) return;

  const projEl = document.getElementById(projId);
  const todoEl = document.getElementById(todoId);

  if (!projEl || !todoEl) {
    state.editingTodo.projId = null;
    state.editingTodo.todoId = null;
    return;
  }
  
  if(todoEl.contains(target)) return;
  const hasInputs = [...Object.values(getEditedToDoValues(todoEl, undefined))].some(Boolean);
  if(hasInputs){
    console.log(getEditedToDoValues(todoEl, undefined));
    el.dialogFormConfirm.dataset.projId = projId;
    el.dialogFormConfirm.dataset.todoId = todoId;
    el.dialogFormConfirm.showModal();
  }
  else renderEditedTodoCard(projId, todoId, projEl);
  state.editingTodo.projId = null;
  state.editingTodo.todoId = null;
}
const outSideProjFormHandler = (target) => {
  //if(el.projTitlePromt.classList.contains("hidden")) return;
  const projFormOpen = !el.projTitlePromt.classList.contains("hidden");
  //console.log(el.projTitlePromt, target);
  //console.log(el.projTitlePromt.contains(target));
  if(projFormOpen){
    const clickInside = el.projTitlePromt.contains(target);
    if(clickInside) return;
    if(getProjectValues()){
      addProjValues();
      toLocalStorage(tasks);
      renderIncrementalProjCards(); 
      ClearProjInput(); 
    }
    displayToggleProjectPromt(false);
  }
}
const outSideTodoFormhandler = (target, isAddTodoBtn) => {
  const todoFormOpen = !el.projTodoFormContainer.classList.contains("hidden");
  
  if(!todoFormOpen) return;
  if(isAddTodoBtn) return;
  const clickInside = el.projTodoFormContainer.contains(target);
  if(clickInside) return;
  const hasInput = [...Object.values(getToDoValues())].some(Boolean);
  if(hasInput){
    el.dialogFormConfirm.showModal();
    return;
  }
  displayToggleTodoForm(false);

}

const outsideCreateProjBtnHandler = (target) => {
  const clickInside = el.createProjBtn.contains(target);
  if(clickInside) return;
 // displayToggleProjectPromt(false);
}

const unsavedTodoFormGaurd = (newProjId, newTodoId) => {
  const {projId, todoId} = state.editingTodo;
  if(!projId || !todoId) return false;
  if(projId === newProjId && todoId === newTodoId) return false;
  const todoEl = document.getElementById(todoId);
  if(!todoEl) return false;
  const hasinputs = [...Object.values(getEditedToDoValues(todoEl, undefined))].some(Boolean);
  if(hasinputs){
    el.dialogFormConfirm.dataset.projId = projId;
    el.dialogFormConfirm.dataset.todoId = todoId;
    el.dialogFormConfirm.showModal();
    return true;
  }
  const projEl = document.getElementById(projId);
  if (projEl) renderEditedTodoCard(projId, todoId, projEl);
  state.editingTodo.projId = null;
  state.editingTodo.todoId = null;
}

const todoExpandHandler = (target) => {
  //if(unsavedTodoFormGaurd(null, null)) return;
  //if(state.editingTodo.projId && state.editingTodo.todoId) return;
  const todoEl = target.closest(".todo-class");
  if(!todoEl) return;
  const todoId = todoEl?.id; 
  if(state.expandTodo.todoId && state.expandTodo.todoId !== todoId){
    const previousTodoEl = document.getElementById(state.expandTodo.todoId);
    if(previousTodoEl) {
    previousTodoEl.classList.remove("expand");
    }
  }
  state.expandTodo.todoId = todoId;
  
  todoEl.classList.add("expand");
  console.log("koko", todoEl)
}

const todoExpandOutsideClickHandler = (target) => {
  
  if(!state.expandTodo.todoId) return;
  const todoEl = document.getElementById(state.expandTodo.todoId);
  if(!todoEl) {
    state.expandTodo.todoId = null;
    return;
  }
  if(todoEl.contains(target)) return;
  //console.log("nooooooo")
 
  todoEl.classList.remove("expand");
  state.expandTodo.todoId = null;
}
document.addEventListener("click", (e) => {
  const target = e.target;
  const button = e.target.closest("button");
  const isAddTodoBtn = button?.classList.contains("add-todo");
  //if(isAddTodoBtn) return;
  outSideProjFormHandler(target);
  outSideTodoFormhandler(target, isAddTodoBtn);
 
  

  //if(el.createProjBtn) return;
  
  if (el.createProjBtn.contains(target)) {
    if(unsavedTodoFormGaurd(null, null)) return;
    const formDirty = !el.projTodoFormContainer.classList.contains("hidden") && [...Object.values(getToDoValues())].some(Boolean);
    if(formDirty) return;
    console.log("gg")
    displayToggleProjectPromt(true);
    
  }
  const isEditingTodo = state.editingTodo.projId && state.editingTodo.todoId;
  const formDirty = !el.projTodoFormContainer.classList.contains("hidden") && [...Object.values(getToDoValues())].some(Boolean);
    
  if(!isEditingTodo && !formDirty) {
  todoExpandOutsideClickHandler(target);
  todoExpandHandler(target);
  }
  //outsideCreateProjBtnHandler(target);
  
  if (state.skipProjEdit) {
    state.skipProjEdit = false;  
  }
  else {
  outsideProjClickHandler(target);
  }
  if(state.skipTodoEdit){
    state.skipTodoEdit = false;
  }
  else {
  OutsideTodoEditClickHandler(target);
  }
  
});

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
  //e.stopPropagation();
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
    //state.skipTodoForm = true;
    const editingProj = !!state.editingProjId;
    const editingTodo = !!state.editingTodo.projId && !!state.editingTodo.todoId;
    const formDirty = !el.projTodoFormContainer.classList.contains("hidden") && [...Object.values(getToDoValues())].some(Boolean);

  if (editingProj || editingTodo || formDirty) return;

  el.projTodoFormContainer.dataset.projId = projId;
  
  //console.log(projId, tasks)
  displayToggleTodoForm(true);
  ClearTodoFormInputs();
      //ClearTodoFormInputs();
  }
  if(button.classList.contains("delete-proj")){
    if(unsavedTodoFormGaurd(null, null)) return;
    const formDirty = !el.projTodoFormContainer.classList.contains("hidden") && [...Object.values(getToDoValues())].some(Boolean);
    if(formDirty) return;
    removeProject(projId);
    toLocalStorage(tasks);
    projEl.classList.add("fade-out");
    projEl.addEventListener("transitionend", () => projEl.remove(), { once: true });
    //renderProjectCards();
  }
  if(button.classList.contains("edit-proj")){
    if(unsavedTodoFormGaurd(null, null)) return;
    const formDirty = !el.projTodoFormContainer.classList.contains("hidden") && [...Object.values(getToDoValues())].some(Boolean);
    if(formDirty) return;
    state.skipProjEdit = true;
    renderEditableProjCard(projId);
    console.log("hi");
    
    if(state.editingProjId && state.editingProjId !== projId){
      saveEditedProj(state.editingProjId, document.getElementById(state.editingProjId));
      toLocalStorage(tasks);
      renderEditedProjCard(state.editingProjId);
    } 
    state.editingProjId = projId;
    
    
    /*if(outsideClickHandlers.proj) {
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

    
      document.addEventListener("click", outsideClickHandlers.proj); */
      
    
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
      state.editingProjId = null;
  }
  if(button.classList.contains("save-proj")){
          //displayToggleTodoForm(true);
    //renderBackProjCard(projId);
    saveEditedProj(projId, projEl);
    toLocalStorage(tasks);
    renderEditedProjCard(projId);
    ClearProjInput();
    state.editingProjId = null;
    //console.log(tasks);
    //console.log(projId);
    //console.log(findIdxofProj(projId));
    //console.log(createProjectCards(tasks[findIdxofProj(projId)]));
  }
  
  if(button.classList.contains("delete-todo")){
    if(unsavedTodoFormGaurd(null, null)) return;
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
    if (unsavedTodoFormGaurd(projId, todoId)) return;
    
    state.skipTodoEdit = true;

    renderEditableTodoCard(projId, todoId, projEl);

    state.editingTodo.projId = projId;
    state.editingTodo.todoId = todoId;
    /*outsideClickHandlers.todo = () => {
      const todoEl = document.getElementById(todoId);
      if(!todoEl) return;
      if([...Object.values(getEditedToDoValues(todoEl, undefined))].some(Boolean)){
        el.dialogFormConfirm.showModal();
      }
      else renderEditedTodoCard(projId, todoId, projEl);
      document.removeEventListener("click", outsideClickHandlers.todo);
      outsideClickHandlers.todo = null;
    }
    document.addEventListener("click", outsideClickHandlers.todo);*/

  }
  if(button.classList.contains("cancel-todo")){
    renderEditedTodoCard(projId, todoId, projEl);
    state.editingTodo.projId = null;
    state.editingTodo.todoId = null;
  }
  if(button.classList.contains("save-todo")){
    //e.preventDefault();
    if(!todoEl.checkValidity()) return;
    e.preventDefault();
    saveEditedToDos(projId, todoId, todoEl);
    toLocalStorage(tasks);
    renderEditedTodoCard(projId, todoId, projEl);
    state.editingTodo.projId = null;
    state.editingTodo.todoId = null;
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
    ClearTodoFormInputs();
  }
  if(button.id === "add-todo-button"){
    if(!el.todoForm.checkValidity()) return;
    e.preventDefault();
    const projId = el.projTodoFormContainer.dataset.projId;
    const projEl = document.getElementById(projId);

    addToDoValues(projId);
    toLocalStorage(tasks);
    renderIncrementalToDoCard(projId, projEl);
    displayToggleTodoForm(false);
    ClearTodoFormInputs;
    
  }
})


el.dialogFormConfirm.addEventListener("click", (e) => {
  e.stopPropagation();
  const button = e.target.closest("button");
  if(!button) return;
  const projId = el.dialogFormConfirm.dataset.projId;
  const todoId = el.dialogFormConfirm.dataset.todoId;
  if(button.id === "dialog-cancel"){
    el.dialogFormConfirm.close();
    console.log("lol");
    state.editingTodo.projId = projId;
    state.editingTodo.todoId = todoId;
  }
  if(button.id === "dialog-discard"){
    
    const projEl = document.getElementById(projId);
    renderEditedTodoCard(projId, todoId, projEl);
    console.log(projId, projEl, todoId);
    el.dialogFormConfirm.close();
    ClearTodoFormInputs();
    displayToggleTodoForm(false);
  }
})
//el.todoCardsContainer.addEventListener("click", (e) => {
 // const button = e.target.closest("button");
//})

el.projTitlePromt.addEventListener("keydown", (e) => {

  if(e.key !== "Enter") return;
  if(!e.target.matches("#input-title-proj")) return;
  el.addProjBtn?.click();
});

el.projCardsContainer.addEventListener("keydown", (e) => {
  if(e.key !== "Enter") return;
  const input = e.target.closest(".title-projectEdit");
  if (!input) return;

  const projEl = input.closest(".proj-class");
  projEl?.querySelector(".save-proj")?.click();
})