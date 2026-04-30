
import {tasks, toLocalStoreage} from "./barrel.js"










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