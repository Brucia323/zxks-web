import { PaperType } from '../types';
import users from './users';

const baseUrl = '/paper';

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      Authorization: users.getToken(),
    },
  });

const create = async (value: PaperType) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
    body: JSON.stringify(value),
  });

const update = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { Authorization: users.getToken() },
  });

const deletePaper = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: users.getToken() },
  });

export default { getAll, create, update, deletePaper };
