import users from './users';

const baseUrl = '/question';

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
  });

const create = async (values: unknown) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
    body: JSON.stringify(values),
  });

const update = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: users.getToken(),
    },
  });

const deleteQuestion = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: users.getToken(),
    },
  });

export default { getAll, create, update, deleteQuestion };
