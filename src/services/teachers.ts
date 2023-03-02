import { TeacherType } from '../types';
import users from './users';

const baseUrl = '/teacher';

const create = async (values: TeacherType) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

const get = async () =>
  await fetch(baseUrl, { headers: { Authorization: users.getToken() } });

export default { create, get };
