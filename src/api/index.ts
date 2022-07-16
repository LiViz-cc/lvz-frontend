import { login, signup } from './auth';
import { getProjects, getProjectById } from './projects';
import { getUserById, updateUserPassword } from './users';

export default {
  // auth
  login,
  signup,
  // projects
  getProjects,
  getProjectById,
  // users
  getUserById,
  updateUserPassword,
};
