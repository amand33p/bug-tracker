interface AuthErrors {
  username?: string;
  password?: string;
}

interface ProjectErrors {
  name?: string;
  members?: string;
}

export const registerValidator = (username: string, password: string) => {
  const errors: AuthErrors = {};

  if (username.trim() === '' || username.length > 20 || username.length < 3) {
    errors.username = 'Username must be in range of 3-20 characters length.';
  }

  if (!/^[a-zA-Z0-9-_]*$/.test(username)) {
    errors.username = 'Username must have alphanumeric characters only.';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be atleast 6 characters long.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const loginValidator = (username: string, password: string) => {
  const errors: AuthErrors = {};

  if (username.trim() === '') {
    errors.username = 'Username field must not be empty.';
  }

  if (!password) {
    errors.password = 'Password field must not be empty.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const createProjectValidator = (name: string, members: string[]) => {
  const errors: ProjectErrors = {};

  if (name.trim() === '' || name.length > 30) {
    errors.name = 'Project name must be in range of 1-30 characters length.';
  }

  if (!Array.isArray(members)) {
    errors.members = 'Members field must be an array.';
  }

  if (members.filter((m, i) => members.indexOf(m) !== i).length !== 0) {
    errors.members = 'Members array must not have duplicate IDs.';
  }

  if (members.some((m) => m.length !== 36)) {
    errors.members = 'Members array must contain valid UUIDs.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
