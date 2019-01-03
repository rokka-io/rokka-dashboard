import { checkAuthentication } from '../api';
import { get as getCookie, set as setCookie } from '../utils/cookie';
import { Maybe } from '../utils/types';

const SESSION_COOKIE_KEY = 'rka_session';

const session = getCookie(SESSION_COOKIE_KEY);

if (session && session.auth) {
  const { auth } = session;
  login(auth.organization, auth.apiKey);
}

export interface AppUser {
  organization: string;
  apiKey: string;
}

export interface AppState {
  user: Maybe<AppUser>;
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

function updateState(partialState: Partial<AppState>) {
  internalState = Object.assign({}, internalState, partialState);
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
    updateState({
      user: {
        organization,
        apiKey
      }
    });
    return;
  }

  // tslint:disable-next-line no-console
  console.error(authenticated);

  setCookie(SESSION_COOKIE_KEY, {}); // clear session on error
}

// export state as readonly
export const currentState = () => Object.assign({}, internalState);
