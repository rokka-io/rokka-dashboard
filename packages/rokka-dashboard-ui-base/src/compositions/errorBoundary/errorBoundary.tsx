import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from '../../components/errorPage/errorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state = { hasError: false };

  public componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== 'test') {
      // tslint:disable-next-line:no-console
      console.error(error, info);
    }

    this.setState({
      hasError: true
    });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
