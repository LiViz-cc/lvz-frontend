import getServer from './getServer';
import type { ProjectRaw } from '../models';
import { polishProjectRaw } from '../models';
import type { ObjectId } from '../models/fields';

export const getProjects = () => getServer()
  .get<ProjectRaw[]>('/projects')
  .then((response) => {
    const projectRaws = response.data;
    const projects = projectRaws.map((projectRaw) => polishProjectRaw(projectRaw));
    return { data: projects, response };
  });

export const getProjectById = (id: ObjectId) => getServer()
  .get<ProjectRaw>(`projects/${id}`)
  .then((response) => {
    const projectRaw = response.data;
    const project = polishProjectRaw(projectRaw);
    return { data: project, response };
  });
