const isUsernameValid = (username: string) => {
  const usernameRegex =
    /^(?=.{6,30}$)(?![0-9_.])(?!.*([._-])\1)(?!.*(?:_\.|\._))(?!.*(?:-\\-|-\.|\.-|\.\.))[\w.-]+$/;
  return usernameRegex.test(username);
};

export default isUsernameValid;
