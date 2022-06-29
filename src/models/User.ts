import {
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';
import { ProjectRaw, Project } from './Project';

interface UserCommmon {
  email: string;
  password: string;
}

export interface UserRaw extends UserCommmon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  projects: ProjectRaw[];
}

export interface User extends UserCommmon {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
  projects: Project[];
}
