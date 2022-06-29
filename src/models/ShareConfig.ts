import {
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';

interface ShareConfigCommon {
  name: string;
  public: boolean;
  description: string;
  password_protected: boolean;
  password: string;
}

export interface ShareConfigRaw extends ShareConfigCommon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  created_by: ObjectIdRaw;
  linked_project: ObjectIdRaw;
}

export interface ShareConfig {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
  linked_project: ObjectId;
}
