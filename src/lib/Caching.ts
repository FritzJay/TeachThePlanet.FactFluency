export const setCached = async (key: string, value: any): Promise<void> => {
  const json = JSON.stringify(value)
  localStorage.setItem(key, json)
  console.log(localStorage)
}

export const getCached = async (key: string): Promise<any> => {
  const value = localStorage.getItem(key)
  if (value) {
    return await JSON.parse(value)
  }
}

export const removeCached = async (key: string): Promise<void> => {
  localStorage.removeItem(key)
}

export const clearCached = async (): Promise<void> => {
  localStorage.clear()
}
