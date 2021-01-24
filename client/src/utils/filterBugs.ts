import { BugState, BugFilterValues } from '../redux/types';

const filterBugs = (filterBy: BugFilterValues, bug: BugState) => {
  switch (filterBy) {
    case 'all':
      return true;
    case 'closed':
      return bug.isResolved === true;
    case 'open':
      return bug.isResolved === false;
  }
};

export default filterBugs;
