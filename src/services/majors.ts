import users from './users';

const baseUrl = '/major';

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      Authorization: users.getToken(),
    },
  });

export default { getAll };
