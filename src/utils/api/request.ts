interface IRequest {
  body?: object
  method?: string
  token?: string
}

interface IResponse {
  error?: string
}

export const jsonFetch = async (url: string, request: IRequest): Promise<any> => {
  const requestObject = await createJsonRequestObject(request)
  const response = await fetch(url, requestObject)
  return await response.json()
}

const createJsonRequestObject = async (request: IRequest) => {
  const headers = Object.assign(
    {'Content-Type': 'application/json'},
    request.token && { authorization: request.token },
  )
  return Object.assign(
    {
      headers,
      method: request.method,
    },
    request.body && {
      body: JSON.stringify({...request.body}),
    },
  )
}

export const validateResponse = (name: string, response: IResponse) => {
  if (response.error !== undefined) {
    handleError(name, response.error)
  }
}

export const handleError = (name: string, error: any) => {
  console.warn(`${name} failed with error:`, error)
}