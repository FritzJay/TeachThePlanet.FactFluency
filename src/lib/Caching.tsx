import { URLS } from "../App";

export const saveState = (component: React.Component, state: any): Promise<any> => {
  console.log('Saving the state:');
  console.log(state);
  return new Promise<any>((resolve) => {
    component.setState({...state}, () => {
      const keys = Object.getOwnPropertyNames(state);
      for (const key of keys) {
        const json = JSON.stringify(state[key])
        localStorage.setItem(key, json);
      }
      console.log(localStorage);
      resolve();
    });
  });
}

export const loadState = (component: React.Component, key: string) => {
  console.log('Loading State: ' + key);
  return new Promise((resolve, reject) => {
    const json = localStorage.getItem(key);
    if (json) {
      const state = JSON.parse(`{"${key}": ${json}}`);
      console.log('Success');
      console.log(state);
      component.setState(state, () => {
        resolve();
      });
    } else {
      reject('Local Storage does not contain ' + key);
    }
  });
}

export const signOut = (component: React.Component<any>) => {
  console.log('Signing out!')
  localStorage.clear();
  component.props.history.push(URLS.signin);
}

export const getCached = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
}