import rokka, { authenticate } from './client';

type AuthResponse = boolean | Error;

function errorLog(err: Error) {
  if (process.env.NODE_ENV !== 'test') {
    // tslint:disable-next-line no-console
    console.error(err);
  }
}

// FIXME: error handling
// FIXME: generic data mapping

export async function checkAuthentication(organization: string, apiKey: string): Promise<AuthResponse> {
  authenticate(apiKey);

  try {
    await rokka().organizations.get(organization);

    return true;
  } catch (err) {
    errorLog(err);

    throw err;
  }
}

enum PropertyType {
  integer = 'integer',
  string = 'string',
  boolean = 'boolean',
  number = 'number'
}

type PropertyValueType = string | number | boolean;

interface Property {
  type: PropertyType;
  minimum?: number;
  maximum?: number;
  description: string;
  default?: PropertyValueType;
  values?: PropertyValueType[];
  pattern?: string;
}

interface Properties {
  [property: string]: Property;
}

interface Operation {
  properties: Properties;
  description: string;
  oneOf?: string[];
  required?: string[];
}

export interface OperationsResponse {
  [operation: string]: Operation;
}

export async function fetchOperations(): Promise<OperationsResponse> {
  try {
    const { body } = await rokka().operations.list();
    return body as OperationsResponse;
  } catch (err) {
    errorLog(err);

    throw err;
  }
}

export type StackOptionsResponse = Properties;

export async function fetchStackOptions(): Promise<StackOptionsResponse> {
  try {
    const { body } = await rokka().stackoptions.get();
    return body as StackOptionsResponse;
  } catch (err) {
    errorLog(err);
    throw err;
  }
}
