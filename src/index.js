
import {tasks, toLocalStoreage, el, form, displayToggleProjectPromt, addProjValues, toLocalStoreage, logProjectValues} from "./barrel.js"










el.createProjBtn.addEventListener("click", () => {
  displayToggleProjectPromt();

});


el.addProjBtn.addEventListener("click", (e) => {
  if(!Object.values(logProjectValues())) {
    alert("Project must have a title!");
    return;
  }
  displayToggleProjectPromt();
  addProjValues();
  toLocalStoreage(tasks);
  
})

el.addTodoBtn.addEventListener("click", (e) => {
  addToDoValues(some);

})