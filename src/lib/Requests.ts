import { IRequest } from './Interfaces';

export interface IRequestComponentProps {
  history: any;
  token?: string;
}

export const jsonFetch = (url: string, request: IRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestObject = createJsonRequestObject(request);
    fetch(url, requestObject)
    .then((response: Response) => response.json())
    .then((json: any) => {
      if (!json.error) {
        resolve(json);
      } else {
        reject(json.error);
      }
    })
    .catch((error: Error) => {
      reject(error);
    });
  });
};

const createJsonRequestObject = (request: IRequest) => {
  const headers = Object.assign(
    {"Content-Type": "application/json"},
    request.token && { authorization: request.token },
  );
  return Object.assign(
    {
      headers,
      method: request.method,
    },
    request.body && {
      body: JSON.stringify({...request.body}),
    },
  );
}