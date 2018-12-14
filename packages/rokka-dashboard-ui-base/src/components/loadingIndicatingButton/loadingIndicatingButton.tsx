import React, { FunctionComponent } from 'react';
import { Button, ButtonProps, Spinner } from '../../elements';
import { colors } from '../../identity/colors/colors';

interface LoadingIndicatingButtonProps extends ButtonProps {
  loading?: boolean;
}

export const LoadingIndicatingButton: FunctionComponent<LoadingIndicatingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  if (loading) {
    props.disabled = true;
  }

  return <Button {...props}>{loading ? <Spinner small={true} backgroundColor={colors.tints.white} /> : children}</Button>;
};
