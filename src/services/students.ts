import users from './users';

const baseUrl = '/student';

const getByMajor = async (id: string, year: number) =>
  await fetch(`${baseUrl}/major/${id}/${year}`, {
    headers: {
      Authorization: users.getToken(),
    },
  });

const getAll = async () =>
  await fetch(baseUrl, {
    headers: {
      Authorization: users.getToken(),
    },
  });

export default { getByMajor, getAll };
