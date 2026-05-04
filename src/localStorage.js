
export const fromLocalStorage = () => {
  try {
   const raw = localStorage.getItem("key67");
   return raw? JSON.parse(raw) : [];
  }
  catch {
    return [];
  }
}

export const toLocalStorage = (tasksArr) => {
  
  localStorage.setItem("key67", JSON.stringify(tasksArr));
}