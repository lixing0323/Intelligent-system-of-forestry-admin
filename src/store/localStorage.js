export const clearAll = () => {
  localStorage.clear()
}

export function setObject(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getObject(key) {
  return JSON.parse(localStorage.getItem(key))
}
