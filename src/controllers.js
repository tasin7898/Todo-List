

import { ToDO, Project } from "./models";


export const getProjectValues = (el) => el.titleProject.value.trim();

export const logToDoValues = (el) => new ToDO(getToDoValues(el));

export const addToDoValues = (uniqueId) => tasks[findIdxofProj(uniqueId)].todoes.push(logToDoValues(el));

export const findIdxofProj = (uniqueId) => {
 const idx = tasks.findIndex(item => item.id === uniqueId);
 return idx === -1 ? null : idx;
};
export const findIdxofTodo = (uniqueIdProj, uniqueIdToDo) => {
  const projIdx = findIdxofProj(uniqueIdProj);
  if (projIdx === -1 || projIdx === null) return null;
  const todoIdx = tasks[projIdx].todoes.findIndex(item => item.id === uniqueIdToDo);
  return todoIdx === -1 ?  null : todoIdx; 
}

export const logProjectValues = (el) => new Project(getProjectValues(el));


export const addProjValues = () => tasks.push(logProjectValues());



export const removeProject = (uniqueId) => {
  const deleteIdx = findIdxofProj(uniqueId);
  tasks.splice(deleteIdx, 1);
}

export const removeToDo = (uniqueIdProj, uniqueIdTodo) => {
  const deleteIdx = tasks[findIdxofProj(uniqueIdProj)].todoes.findIndex(item => item.id === uniqueIdTodo);
  tasks.todoes.splice(deleteIdx, 1);
}

export const saveEditedToDos = (uniqueIdProj, uniqueIdToDo) => {
  const projIdx = findIdxofProj(uniqueIdProj);
  const todoIdx = findIdxofTodo(uniqueIdProj, uniqueIdToDo);
  if(projIdx === null || todoIdx === null) return null;
  tasks[projIdx].todoes.splice(todoIdx, 1, logToDoValues(form));
};