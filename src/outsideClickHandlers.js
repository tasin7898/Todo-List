export const outsideProjClickHandler = (target) => {
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
export const OutsideTodoEditClickHandler = (target) => {
  const projId = state.editingTodo.projId;
  if(!projId) return;
  const projEl = document.getElementById(projId);
  const todoId = state.editingTodo.todoId;
  if(!todoId) return;
  const todoEl = document.getElementById(todoId);
  if(!projEl){
    state.editingTodo.projId = null;
    return;
  }
  if(!todoEl){
    state.editingTodo.todoId = null;
    return;
  }
  
  if(todoEl.contains(target)) return;
  if([...Object.values(getEditedToDoValues(todoEl, undefined))].some(Boolean)){
          el.dialogFormConfirm.showModal();
  }
  else renderEditedTodoCard(projId, todoId, projEl);
  state.editingTodo.projId = null;
  state.editingTodo.todoId = null;
}
export const outSideProjFormHandler = (target) => {
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
export const outSideTodoFormhandler = (target) => {
  const todoFormOpen = !el.projTodoFormContainer.classList.contains("hidden");
  
  if(todoFormOpen){
    const clickInside = el.projTodoFormContainer.contains(target);
    if(clickInside) return;
    const hasInput = [...Object.values(getToDoValues())].some(Boolean);
    if(hasInput){
      el.dialogFormConfirm.showModal();
      return;
    }
    displayToggleTodoForm(false);
  }
}

export const outsideCreateProjBtnHandler = (target) => {
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

const projEl = target.closest(".proj-class");
  if (!projEl) return;
  const projId = projEl.id;
  const todoEl = target.closest(".todo-class");
  if(!todoEl) return;
  const todoId = todoEl.id;
  if (unsavedTodoFormGaurd(projId, todoId)) return;