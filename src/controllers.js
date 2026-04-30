const getProjectValues = () => el.titleProject.value.trim();

const logToDoValues = () => new ToDO(getToDoValues());

const addToDoValues = (uniqueId) => tasks[findIdxofProj(uniqueId)].todoes.push(logToDoValues());

const findIdxofProj = (uniqueId) => {
 const idx = tasks.findIndex(item => item.id === uniqueId);
 return idx === -1 ? null : idx;
};
const findIdxofTodo = (uniqueIdProj, uniqueIdToDo) => {
  projIdx = findIdxofProj(uniqueIdProj);
  if (projIdx === -1 || projIdx === null) return null;
  const todoIdx = tasks[projIdx].todoes.findIndex(item => item.id === uniqueIdToDo);
  return todoIdx === -1 ?  null : todoIdx; 
}

const logProjectValues = () => new Project(getProjectValues());


const addProjValues = () => tasks.push(logProjectValues());

export const logToDoEditedValues = () => new ToDO(getToDoEditedValues());

const removeProject = (uniqueId) => {
  const deleteIdx = findIdxofProj(uniqueId);
  tasks.splice(deleteIdx, 1);
}

const removeToDo = (uniqueIdProj, uniqueIdTodo) => {
  const deleteIdx = tasks[findIdxofProj(uniqueIdProj)].todoes.findIndex(item => item.id === uniqueIdTodo);
  tasks.todoes.splice(deleteIdx, 1);
}

export const saveEditedToDos = (uniqueIdProj, uniqueIdToDo) => {
  const projIdx = findIdxofProj(uniqueIdProj);
  const todoIdx = findIdxofTodo(uniqueIdProj, uniqueIdToDo);
  if(projIdx === null || todoIdx === null) return null;
  tasks[projIdx].todoes.splice(todoIdx, 1, logToDoEditedValues());
};