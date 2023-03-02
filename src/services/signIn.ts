import { CredentialsType } from '../types';

const baseUrl = '/sign_in';

const signIn = async (credentials: CredentialsType) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

export default { signIn };
