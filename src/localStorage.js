
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
  const store = fromLocalStorage(key);
  store.push(currentObj);
  localStorage.setItem(key, JSON.stringify(store));
}