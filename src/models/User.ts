import type {
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';
import { polishDateTsRaw, polishObjectIdRaw } from './fields';

interface UserCommmon {
  email: string;
}

export interface UserRaw extends UserCommmon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  created_by: ObjectIdRaw;
  projects: ObjectIdRaw[];
  data_sources: ObjectIdRaw[];
}

export interface User extends UserCommmon {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
  projects: ObjectId[];
  data_sources: ObjectId[];
}

export const polishUserRaw = (userRaw: UserRaw) => {
  const user: User = {
    // eslint-disable-next-line no-underscore-dangle
    id: polishObjectIdRaw(userRaw._id),
    email: userRaw.email,
    created: polishDateTsRaw(userRaw.created),
    modified: polishDateTsRaw(userRaw.modified),
    created_by: polishObjectIdRaw(userRaw.created_by),
    projects: userRaw.projects.map((objectIdRaw) => polishObjectIdRaw(objectIdRaw)),
    data_sources: userRaw.data_sources.map((objectIdRaw) => polishObjectIdRaw(objectIdRaw)),
  };
  return user;
};
