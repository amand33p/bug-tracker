import { Note } from '../redux/types';
import { NoteSortValues } from '../pages/Main/NotesCard';

const sortNotes = (notes: Note[], sortBy: NoteSortValues) => {
  switch (sortBy) {
    case 'newest':
      return notes
        .slice()
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

    case 'oldest':
      return notes
        .slice()
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

    case 'updated':
      return notes
        .slice()
        .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }
};

export default sortNotes;
