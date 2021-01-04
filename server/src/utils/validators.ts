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
  if (!name || name.trim() === '' || name.length > 30) {
    return 'Project name length must not be more than 30.';
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

export const bugTitleError = (title: string) => {
  if (!title || title.trim() === '' || title.length > 50 || title.length < 3) {
    return 'Title must be in range of 3-50 characters length.';
  }
};

export const bugDescriptionError = (description: string) => {
  if (!description || description.trim() === '') {
    return 'Description field must not be empty.';
  }
};

export const bugPriorityError = (priority: string) => {
  const validPriorities = ['low', 'medium', 'high'];

  if (!priority || !validPriorities.includes(priority)) {
    return 'Priority can only be - low, medium or high.';
  }
};

export const createBugValidator = (
  title: string,
  description: string,
  priority: string
) => {
  const errors: BugErrors = {};
  const titleError = bugTitleError(title);
  const descriptionError = bugDescriptionError(description);
  const priorityError = bugPriorityError(priority);

  if (titleError) {
    errors.title = titleError;
  }

  if (descriptionError) {
    errors.description = descriptionError;
  }

  if (priorityError) {
    errors.priority = priorityError;
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
