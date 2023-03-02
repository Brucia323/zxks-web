interface UserType {
  id: string;
  name: string;
  token: string;
}

let user =
  sessionStorage.getItem('user') != null
    ? JSON.parse(sessionStorage.getItem('user')!)
    : null;

const setUser = (values: UserType) => {
  user = values;
  sessionStorage.setItem('user', JSON.stringify(values));
};

const getUser = () => user;

const getToken = () => `bearer ${user.token}`;

const getId = () => user.id;

export default { setUser, getUser, getToken, getId };
