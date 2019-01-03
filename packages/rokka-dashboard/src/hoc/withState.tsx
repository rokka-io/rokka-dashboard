import React, { ComponentType, useEffect, useState } from 'react';
import { AppState, currentState, subscribe, unsubscribe } from '../state';

type Reducer<S> = (state: AppState) => S;

const noopReducer: Reducer<AppState> = state => state;

/**
 * withState is a Higher-Order-Component which passes the global state (possibly reduced by the reducer function).
 */
export function withState<T>(WrappedComponent: ComponentType<T>, reducer: Reducer<Partial<AppState>> = noopReducer) {
  return (props: T) => {
    const [compState, setCompState] = useState(reducer(currentState()));

    useEffect(() => {
      const updateState = (state: AppState) => {
        setCompState(reducer(state));
      };
      subscribe(updateState);
      return () => unsubscribe(updateState);
    });

    return <WrappedComponent {...compState} {...props} />;
  };
}
