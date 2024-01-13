export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}
