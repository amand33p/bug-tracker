export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserState {
  id: string;
  username: string;
  token: string;
}

export type ResetFields = () => void;
