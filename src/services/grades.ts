import users from './users';

const baseUrl = '/grade';

const getGradeByExamination = async (id: string) =>
  await fetch(`${baseUrl}/examination/${id}`, {
    headers: {
      Authorization: users.getToken(),
    },
  });

const create = async (id: string) =>
  await fetch(`${baseUrl}/${id}`, {
    method: 'POST',
    headers: {
      Authorization: users.getToken(),
    },
  });

export default { getGradeByExamination, create };
