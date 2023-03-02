import users from './users';

const baseUrl = '/group';

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      Authorization: users.getToken(),
    },
  });

const create = async (value: { title: string; studentIdList: string[] }) =>
  await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
    body: JSON.stringify(value),
  });

const update = async (
  value: { title: string; studentIdList: string[] },
  id: string
) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: users.getToken(),
    },
    body: JSON.stringify(value),
  });

const deleteGroup = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: users.getToken(),
    },
  });

export default { getAll, create, update, deleteGroup };
