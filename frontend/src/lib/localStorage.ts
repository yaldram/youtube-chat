export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  return item;
}

export function getLocalStorageJson(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function setLocalStorageJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}
