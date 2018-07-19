import { URLS } from "../App";

export const saveState = (component: React.Component, state: any) => {
  console.log('Saving the state:');
  console.log(state);
  component.setState({...state});
  const keys = Object.getOwnPropertyNames(state);
  for (const key of keys) {
    localStorage.setItem(key, state[key]);
  }
}

export const loadState = (component: React.Component, key: string) => {
  console.log('Loading State: ' + key);
  return new Promise((resolve, reject) => {
    const state = localStorage.getItem(key);
    if (state) {
      console.log('Success');
      component.setState(state);
      resolve();
    } else {
      console.log('Failed to load state')
      reject('Local Storage does not contain ' + key);
    }
  });
}

export const signOut = (component: React.Component<any>) => {
  console.log('Signing out!')
  localStorage.clear();
  component.props.history.push(URLS.signin);
}