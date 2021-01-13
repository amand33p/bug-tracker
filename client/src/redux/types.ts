export interface UserState {
  id: string;
  username: string;
  token: string;
}

export type BugPriority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  username: string;
}

export interface ProjectMember {
  id: number;
  joinedAt: Date;
  member: User;
}

export interface Note {
  id: number;
  bugId: string;
  body: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectState {
  id: string;
  name: string;
  members: ProjectMember[];
  bugs: Array<{ id: string }>;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface BugState {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: BugPriority;
  createdBy: User;
  updatedBy: User;
  closedBy: User;
  reopenedBy: User;
  notes: Note[];
  isResolved: boolean;
  closedAt: Date;
  reopenedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectSortValues =
  | 'newest'
  | 'oldest'
  | 'a-z'
  | 'z-a'
  | 'most-bugs'
  | 'least-bugs'
  | 'most-members'
  | 'least-members';

export interface UserCredentials {
  username: string;
  password: string;
}

export type ResetFields = () => void;
