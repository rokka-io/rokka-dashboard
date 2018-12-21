import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { AlertMessage } from '../../elements/alertMessage/alertMessage';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';

export enum AlertType {
  Success,
  Error,
  Pending,
  Info
}

interface Alert {
  message: string | string[];
  type: AlertType;
}
interface AlertProps {
  alert?: Alert;
}

export const Alert: FunctionComponent<AlertProps> = ({ alert = null }) => {
  if (!alert) {
    return null;
  }
  const { message, type } = alert;
  const messages: string[] = message instanceof Array ? message : [message];

  return (
    <StyledAlert type={type}>
      {messages.map((msg, index) => (
        <AlertMessage key={index}>{msg}</AlertMessage>
      ))}
    </StyledAlert>
  );
};

interface StyledAlertProps {
  type: AlertType;
}

function fail(message: string): never {
  throw new Error(message);
}

function ColorForAlertType(type: AlertType): string {
  switch (type) {
    case AlertType.Success:
      return colors.brand.dark;
    case AlertType.Error:
      return colors.cranberry.primary;
    case AlertType.Pending:
      return colors.gray.darker;
    case AlertType.Info:
      return colors.orange.dark;
    default:
      return fail(`${type} not in switch-case`);
  }
}

const StyledAlert = styled.div<StyledAlertProps>`
  transition: 0.4s ease opacity, 0.4s ease background;
  opacity: 1;
  padding: ${spaces.medium} ${spaces.medium} ${spaces.small};
  color: ${colors.tints.white};

  ${({ type }) => `background: ${ColorForAlertType(type)}`}
`;
