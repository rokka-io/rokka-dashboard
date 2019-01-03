import rokka, { authenticate } from './client';

type AuthResponse = boolean | Error;

export async function checkAuthentication(organization: string, apiKey: string): Promise<AuthResponse> {
  authenticate(apiKey);

  try {
    rokka().organizations.get(organization);

    return true;
  } catch (err) {
    // tslint:disable-next-line no-console
    console.error(err);

    return err;
  }
}
