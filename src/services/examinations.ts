import { ExaminationType } from '../types';
import users from './users';

const baseUrl = '/examination';

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      Authorization: users.getToken(),
    },
  });

const create = async (value: ExaminationType) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
    body: JSON.stringify(value),
  });

const deleteExamination = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: users.getToken() },
  });

export default { getAll, create, deleteExamination };
