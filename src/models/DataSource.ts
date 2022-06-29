import {
  DataSourceType,
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';

interface DataSourceCommon {
  name: string;
  public: boolean;
  description: string;
  static_data: string;
  type: DataSourceType;
}

export interface DataSourceRaw extends DataSourceCommon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  created_by: ObjectIdRaw;
}

export interface DataSource {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
}
