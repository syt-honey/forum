const localStorage = window.localStorage;

const addItem = (key, value) => {
  return localStorage.setItem(key, value);
};

const removeItem = key => {
  return localStorage.removeItem(key);
};

const getItem = key => {
  return localStorage.getItem(key);
};

const clearItem = () => {
  localStorage.clear();
};

export { addItem, removeItem, getItem, clearItem };
