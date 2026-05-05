
import { tasks } from "./barrel.js";
import { ToDO, Project } from "./models.js";
import { el, edited } from "./dom.js";

export const getProjectValues = () => el.titleProject.value.trim();
export const getToDoValues = () => ({
  title : el.titleToDo.value.trim(),
  description : el.description.value.trim() || "",
  dueDate : el.dueDate.value || "",
  priority : el.priority.value || "",
  checklist : el.checklist.checked,
});

export const getEditedProjectValues = (editedEl, oldProj) => ({
  project : editedEl.querySelector(".title-projectEdit").value.trim(),
  id : oldProj.id,
  todoes : oldProj.todoes,
})
export const getEditedToDoValues = (editedEl, oldTodo) => ({
  title : editedEl.querySelector(".title")?.value.trim(),
  description : editedEl.querySelector(".description")?.value.trim() || "",
  dueDate : editedEl.querySelector(".dueDate")?.value || "",
  priority : editedEl.querySelector(".priority")?.value || "",
  checklist : editedEl.querySelector(".checklist")?.checked,
  id : oldTodo?.id,
});

export const logToDoValues = () => new ToDO(getToDoValues());

export const addToDoValues = (projId) => tasks[findIdxofProj(projId)].todoes?.push(logToDoValues());

export const findIdxofProj = (projId) => {
 const idx = tasks.findIndex(item => item.id === projId);
 return idx === -1 ? null : idx;
};
export const findIdxofTodo = (projId, todoId) => {
  const projIdx = findIdxofProj(projId);
  if (projIdx === -1 || projIdx === null) return null;
  const todoIdx = tasks[projIdx].todoes.findIndex(item => item.id === todoId);
  return todoIdx === -1 ?  null : todoIdx; 
}

export const logProjectValues = () => new Project(getProjectValues());

export const addProjValues = () => tasks.push(logProjectValues());

//export const logEditedProjectValues = (editedEl) => new Project(getEditedProjectValues(editedEl));



export const removeProject = (projId) => {
  const deleteIdx = findIdxofProj(projId);
  tasks.splice(deleteIdx, 1);
}

export const removeToDo = (projId, todoId) => {
  const projIdx = findIdxofProj(projId);
  const todoIdx = findIdxofTodo(projId, todoId); 
  if(projIdx === null || todoIdx === null) return null;
  tasks[projIdx].todoes.splice(todoIdx, 1);
}

export const saveEditedProj = (projId, editedEl) => {
  const projIdx = findIdxofProj(projId);
  if(projIdx === null) return null;
  const oldProj = tasks[projIdx];
  tasks.splice(projIdx, 1, getEditedProjectValues(editedEl, oldProj));
};

export const saveEditedToDos = (projId, todoId, editedEl) => {
  const projIdx = findIdxofProj(projId);
  const todoIdx = findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  const oldTodo = tasks[projIdx].todoes[todoIdx];
  tasks[projIdx].todoes.splice(todoIdx, 1, getEditedToDoValues(editedEl, oldTodo));
};

export const projTitleValidity = () => {
  if (!getProjectValues(el)) {
  el.projectError.textContent = "Project title is required.";
  return;
  };
}

export const projTitleEditedValidity = (editedEl) => {
  if (!getProjectValues(editedEl)) {
  edited.projectError.textContent = "Project title is required.";
  return;
  };
  el.projectError.textContent = "";
};

export const projTitleEditValidity = (editedEl) => {
  if (!getProjectValues(editedEl)) {
  edited.projectError.textContent = "Project title is required.";
  return;
  };
  edited.projectError.textContent = "";
}



