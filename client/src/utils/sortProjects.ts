import { ProjectState, ProjectSortValues } from '../redux/types';

const sortProjects = (projects: ProjectState[], sortBy: ProjectSortValues) => {
  switch (sortBy) {
    case 'newest':
      return projects
        .slice()
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    case 'oldest':
      return projects
        .slice()
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

    case 'a-z':
      return projects
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
        );

    case 'z-a':
      return projects
        .slice()
        .sort((a, b) =>
          b.name.localeCompare(a.name, 'en', { sensitivity: 'base' })
        );

    case 'most-bugs':
      return projects.slice().sort((a, b) => b.bugs.length - a.bugs.length);

    case 'least-bugs':
      return projects.slice().sort((a, b) => a.bugs.length - b.bugs.length);

    case 'most-members':
      return projects
        .slice()
        .sort((a, b) => b.members.length - a.members.length);

    case 'least-members':
      return projects
        .slice()
        .sort((a, b) => a.members.length - b.members.length);
  }
};

export default sortProjects;
