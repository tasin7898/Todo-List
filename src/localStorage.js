
export const fromLocalStorage = () => {
  try {
   const raw = localStorage.getItem();
   return raw? JSON.parse(raw) : [];
  }
  catch {
    return [];
  }
}

export const toLocalStoreage = (currentObj) => {
  const store = fromLocalStorage("key67");
  store.push(currentObj);
  localStorage.setItem("key67", JSON.stringify(store));
}