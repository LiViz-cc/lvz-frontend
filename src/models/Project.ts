import {
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';
import { DataSourceRaw, DataSource } from './DataSource';
import { ShareConfigRaw, ShareConfig } from './ShareConfig';

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
  data_source: DataSourceRaw[];
  share_configs: ShareConfigRaw[];
}

export interface Project extends ProjectCommon {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
  data_source: DataSource[];
  share_configs: ShareConfig[];
}
