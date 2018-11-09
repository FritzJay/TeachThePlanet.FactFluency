export const setCached = (key: string, value: any) => {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

export const getCached = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}

export const removeCached = (key: string) => {
  localStorage.removeItem(key);
}

export const clearCached = () => {
  localStorage.clear()
}