import { checkAuthentication, fetchOperations, fetchStackOptions, OperationsResponse, StackOptionsResponse } from '../api';
import { set as setCookie } from '../utils/cookie';

export const SESSION_COOKIE_KEY = 'rka_session';

export interface AppUser {
  organization: string;
  apiKey: string;
}

export interface AppState {
  showSidebar: boolean;
  user?: AppUser;
  operations?: OperationsResponse;
  stackOptions?: StackOptionsResponse;
}

const defaultState: AppState = {
  showSidebar: false
};

let internalState = defaultState;

type Subscriber = (state: AppState) => void;

let subscribers: Subscriber[] = [];

/**
 * Subscribe callback to state updates.
 */
export function subscribe(callback: Subscriber) {
  subscribers.push(callback);
}

/**
 * Unsubscribe existing callback from state updates.
 */
export function unsubscribe(callback: Subscriber) {
  subscribers = subscribers.filter(cb => cb !== callback);
}

/**
 * Merge internalState with updated partialStates.
 */
function updateState(...partialStates: Array<Partial<AppState>>) {
  internalState = Object.assign({}, internalState, ...partialStates);
  notifySubscribers();
}

/**
 * Notify subscribers with current state.
 */
function notifySubscribers() {
  if (subscribers.length) {
    for (const subscriber of subscribers) {
      if (subscriber) {
        subscriber(internalState);
      }
    }
  }
}

/**
 * Checks if organization/apiKey combination is correct and logs the user in.
 */
export async function login(organization: string, apiKey: string) {
  const authenticated = await checkAuthentication(organization, apiKey);

  if (authenticated === true) {
    const user = { organization, apiKey };
    updateState({ user });
    updateState(await listOperations(), await getStackOptions());
    setCookie(SESSION_COOKIE_KEY, { user });
    return Promise.resolve();
  }

  setCookie(SESSION_COOKIE_KEY, {}); // clear session on error

  return Promise.reject(new Error('Invalid authentication'));
}

/**
 * Fetches stack operations.
 */
async function listOperations(): Promise<Partial<AppState>> {
  try {
    const operations = await fetchOperations();
    return { operations };
  } catch (err) {
    return {};
  }
}

/**
 * Fetches stack options.
 */
async function getStackOptions(): Promise<Partial<AppState>> {
  try {
    const stackOptions = await fetchStackOptions();
    return { stackOptions };
  } catch (err) {
    return {};
  }
}

/**
 * Show or hide sidebar.
 */
export function toggleSidebar() {
  updateState({ showSidebar: !internalState.showSidebar });
}

/**
 * Export current state (readonly).
 */
export const currentState = () => Object.assign({}, internalState);

/**
 * Do not use. Only used for tests.
 */
export const testResetState = () => {
  internalState = defaultState;
};

export const testSubscriberCount = () => subscribers.length;
