import type {
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';
import { polishDateTsRaw, polishObjectIdRaw } from './fields';

interface ProjectCommon {
  name: string;
  public: boolean;
  description: string;
}

export interface ProjectRaw extends ProjectCommon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  created_by: ObjectIdRaw;
  data_sources: ObjectIdRaw[];
  share_configs: ObjectIdRaw[];
}

export interface Project extends ProjectCommon {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
  data_sources: ObjectId[];
  share_configs: ObjectId[];
}

export const polishProjectRaw = (projectRaw: ProjectRaw) => {
  const project: Project = {
    // eslint-disable-next-line no-underscore-dangle
    id: polishObjectIdRaw(projectRaw._id),
    name: projectRaw.name,
    created: polishDateTsRaw(projectRaw.created),
    modified: polishDateTsRaw(projectRaw.modified),
    created_by: polishObjectIdRaw(projectRaw.created_by),
    public: projectRaw.public,
    description: projectRaw.description,
    data_sources: projectRaw.data_sources.map((objectIdRaw) => polishObjectIdRaw(objectIdRaw)),
    share_configs: projectRaw.share_configs.map((objectIdRaw) => polishObjectIdRaw(objectIdRaw)),
  };
  return project;
};
