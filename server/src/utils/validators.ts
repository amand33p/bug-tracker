interface AuthErrors {
  username?: string;
  password?: string;
}

interface ProjectErrors {
  name?: string;
  members?: string;
}

interface BugErrors {
  title?: string;
  description?: string;
  priority?: string;
}

export const registerValidator = (username: string, password: string) => {
  const errors: AuthErrors = {};

  if (
    !username ||
    username.trim() === '' ||
    username.length > 20 ||
    username.length < 3
  ) {
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

  if (!username || username.trim() === '') {
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

export const projectNameError = (name: string) => {
  if (!name || name.trim() === '' || name.length > 60) {
    return 'Project name length must not be more than 60.';
  }
};

export const projectMembersError = (members: string[]) => {
  if (!Array.isArray(members)) {
    return 'Members field must be an array.';
  }

  if (members.filter((m, i) => members.indexOf(m) !== i).length !== 0) {
    return 'Members field must not have already-added/duplicate IDs.';
  }

  if (members.some((m) => m.length !== 36)) {
    return 'Members array must contain valid UUIDs.';
  }
};

export const createProjectValidator = (name: string, members: string[]) => {
  const errors: ProjectErrors = {};
  const nameError = projectNameError(name);
  const membersError = projectMembersError(members);

  if (nameError) {
    errors.name = nameError;
  }

  if (membersError) {
    errors.members = membersError;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const createBugValidator = (
  title: string,
  description: string,
  priority: string
) => {
  const errors: BugErrors = {};
  const validPriorities = ['low', 'medium', 'high'];

  if (!title || title.trim() === '' || title.length > 60 || title.length < 3) {
    errors.title = 'Title must be in range of 3-60 characters length.';
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description field must not be empty.';
  }

  if (!priority || !validPriorities.includes(priority)) {
    errors.priority = 'Priority can only be - low, medium or high.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
