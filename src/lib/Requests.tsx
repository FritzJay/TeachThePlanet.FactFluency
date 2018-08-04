import { URLS } from "../App";
import { loadState } from "./Caching";

export interface IRequest {
  body?: object;
  method?: string;
  token?: string;
}

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

export const setTokenToStateOrSignOut = (component: React.Component<IRequestComponentProps>): Promise<void> => {
  return new Promise((resolve) => {
    if (component.props.token) {
      component.setState({token: component.props.token}, () => {
        resolve();
      });
    } else {
      loadState(component, 'token')
      .then(() => resolve())
      .catch((error: string) => {
        console.log(error);
        console.log(localStorage);
        signOut(component);
        resolve();
      });
    }
  });
}

export const signOut = (component: React.Component<IRequestComponentProps>) => {
  localStorage.clear();
  component.setState({user: undefined, token: undefined}, () => {
    component.props.history.push(URLS.signin);
  });
}
