import React from 'react';
import { Button, ButtonProps, Spinner } from '../../elements';
import { colors } from '../../identity/colors/colors';

interface LoadingIndicatingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingIndicatingButton({ loading, children, ...props }: LoadingIndicatingButtonProps) {
  if (loading) {
    props.disabled = true;
  }

  return <Button {...props}>{loading ? <Spinner small={true} backgroundColor={colors.tints.white} /> : children}</Button>;
}
