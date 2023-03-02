const baseUrl = '/captcha';

const get = async (email: string) => await fetch(`${baseUrl}?email=${email}`);

export default { get };
