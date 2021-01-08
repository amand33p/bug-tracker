const storageKeyUser = 'bugTrackerUserKey';
const storageKeyDarkMode = 'bugTrackerDarkMode';

interface User {
  id: string;
  username: string;
  token: string;
}

const saveUser = (user: User) => {
  localStorage.setItem(storageKeyUser, JSON.stringify(user));
};

const loadUser = () => {
  const userKey = localStorage.getItem(storageKeyUser);

  if (userKey) {
    return JSON.parse(userKey);
  }

  return null;
};

const removeUser = () => localStorage.removeItem(storageKeyUser);

const saveDarkMode = (boolean: boolean) => {
  localStorage.setItem(storageKeyDarkMode, String(boolean));
};

const loadDarkMode = () => {
  const darkMode = localStorage.getItem(storageKeyDarkMode);

  if (darkMode) {
    return JSON.parse(darkMode);
  }

  return null;
};

const storage = { saveUser, loadUser, removeUser, saveDarkMode, loadDarkMode };

export default storage;
