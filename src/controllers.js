
import { tasks } from "./barrel.js";
import { ToDO, Project } from "./models.js";
import { el, edited } from "./dom.js";

export const getProjectValues = (el) => el.titleProject.value.trim();
export const getToDoValues = (el) => ({
  title : el.titleToDo.value.trim(),
  description : el.description.value.trim() || "",
  dueDate : el.dueDate.value || "",
  priority : el.priority.value || "",
  checklist : el.checklist.checked,
});

export const logToDoValues = (el) => new ToDO(getToDoValues(el));

export const addToDoValues = (projId) => tasks[findIdxofProj(projId)].todoes.push(logToDoValues(el));

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

export const logProjectValues = (el) => new Project(getProjectValues(el));


export const addProjValues = () => tasks.push(logProjectValues(el));



export const removeProject = (projId) => {
  const deleteIdx = findIdxofProj(projId);
  tasks.splice(deleteIdx, 1);
}

export const removeToDo = (projId, todoId) => {
  const deleteIdx = tasks[findIdxofProj(projId)].todoes.findIndex(item => item.id === todoId);
  tasks.todoes.splice(deleteIdx, 1);
}

export const saveEditedToDos = (projId, todoId) => {
  const projIdx = findIdxofProj(projId);
  const todoIdx = findIdxofTodo(projId, todoId);
  if(projIdx === null || todoIdx === null) return null;
  tasks[projIdx].todoes.splice(todoIdx, 1, logToDoValues(edited));
};

export const projTitleValidity = () => {
  if (!getProjectValues(el)) {
  el.projectError.textContent = "Project title is required.";
  return;
  };
}

export const projTitleEditedValidity = () => {
  if (!getProjectValues(edited)) {
  edited.projectError.textContent = "Project title is required.";
  return;
  };
  el.projectError.textContent = "";
};

export const projTitleEditValidity = () => {
  if (!getProjectValues(edited)) {
  edited.projectError.textContent = "Project title is required.";
  return;
  };
  edited.projectError.textContent = "";
}

export const saveEditedProj = (projid) => {
  const projIdx = findIdxofProj(projId);
  if(projIdx === null) return null;
  tasks[projIdx].splice(projIdx, 1, logProjectValues(edited));
}