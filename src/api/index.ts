import { login, signup } from './auth';
import { getProjects, getProjectById } from './project';
import { getUserById, updateUserPassword } from './users';

export default {
  login,
  signup,
  getProjects,
  getProjectById,
  // users
  getUserById,
  updateUserPassword,
};
