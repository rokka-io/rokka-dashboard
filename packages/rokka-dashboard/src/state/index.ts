import { checkAuthentication, fetchOperations, OperationsResponse, StackOptionsResponse, fetchStackOptions } from '../api';
import { set as setCookie } from '../utils/cookie';
import { Maybe } from '../utils/types';

export const SESSION_COOKIE_KEY = 'rka_session';

export interface AppUser {
  organization: string;
  apiKey: string;
}

export interface AppState {
  user: Maybe<AppUser>;
  operations?: OperationsResponse;
  stackOptions?: StackOptionsResponse;
}

const defaultState: AppState = {
  user: null
};

let internalState = defaultState;

type Subscriber = (state: AppState) => void;

let subscribers: Subscriber[] = [];

export function subscribe(callback: Subscriber) {
  subscribers.push(callback);
}

export function unsubscribe(callback: Subscriber) {
  subscribers = subscribers.filter(cb => cb !== callback);
}

function updateState(...partialStates: Array<Partial<AppState>>) {
  internalState = Object.assign({}, internalState, ...partialStates);
  notifySubscribers();
}

function notifySubscribers() {
  if (subscribers.length) {
    for (const subscriber of subscribers) {
      if (subscriber) {
        subscriber(internalState);
      }
    }
  }
}

export async function login(organization: string, apiKey: string) {
  const authenticated = await checkAuthentication(organization, apiKey);

  if (authenticated === true) {
    const user = { organization, apiKey };
    updateState({ user });
    updateState(await listOperations(), await getStackOptions());
    setCookie(SESSION_COOKIE_KEY, { user });
    return;
  }

  // tslint:disable-next-line no-console
  console.error(authenticated);

  setCookie(SESSION_COOKIE_KEY, {}); // clear session on error
}

export async function listOperations(): Promise<Partial<AppState>> {
  try {
    const operations = await fetchOperations();
    return { operations };
  } catch (err) {
    if (err.statusCode === 403) {
      return {
        user: null
      };
    }
    return {};
  }
}

export async function getStackOptions(): Promise<Partial<AppState>> {
  try {
    const stackOptions = await fetchStackOptions();
    return { stackOptions };
  } catch (err) {
    return {};
  }
}

// export state as readonly
export const currentState = () => Object.assign({}, internalState);
