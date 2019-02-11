import React, { ComponentType, useEffect, useState, FunctionComponent } from 'react';
import { AppState, currentState, subscribe, unsubscribe } from '../state';

type Reducer<S> = (state: AppState) => S;

/**
 * withState is a Higher-Order-Component which passes the global state (possibly reduced by the reducer function).
 */
export function withState<TInputProps, TOutputProps>(
  WrappedComponent: ComponentType<TOutputProps>,
  reducer: Reducer<TOutputProps>
): FunctionComponent<TInputProps> {
  return (props: TInputProps) => {
    const [compState, setCompState] = useState(reducer(currentState()));

    useEffect(() => {
      const updateState = (state: AppState) => {
        setCompState(reducer(state));
      };
      subscribe(updateState);
      return () => unsubscribe(updateState);
    }, []);

    return <WrappedComponent {...compState} {...props} />;
  };
}
