import "./styles.css";
import {tasks, toLocalStoreage, el, form, displayToggleProjectPromt, addProjValues, fromLocalStorage, logProjectValues, displayToggleTodoForm, displayToggleTodoCreateBtn, ClearprojInput, ClearTodoFormInputs, renderIncrementalProjCards, removeProject, renderProjectCards, renderEditedProjCard} from "./barrel.js"


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
  const projId = projEl.id;
  if(e.target.tagName  === "BUTTON"){
    if(e.target.id === "add-todo"){
      displayToggleTodoForm(true);
    }
    if(e.target.id === "delete-proj"){
      removeProject(projId);
      renderProjectCards();
    }
    if(e.target.id === "edit-proj"){
      renderEditedProjCard(projId);
      saveEditedProj();
      //renderProjectCards();
    }
  }
  //displayToggleTodoForm(true);
})

el.addTodoBtn.addEventListener("click", (e) => {
  const projId = e.target.closest(".proj-class").id;
  //addToDoValues(some);

});