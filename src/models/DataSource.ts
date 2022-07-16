import type {
  // DataSourceType,
  DateTs,
  DateTsRaw,
  ObjectId,
  ObjectIdRaw,
} from './fields';
import { polishDateTsRaw, polishObjectIdRaw } from './fields';

interface DataSourceCommon {
  name: string;
  public: boolean;
  description: string;
  static_data: string;
  // type: DataSourceType;
}

export interface DataSourceRaw extends DataSourceCommon {
  _id: ObjectIdRaw;
  created: DateTsRaw;
  modified: DateTsRaw;
  created_by: ObjectIdRaw;
}

export interface DataSource extends DataSourceCommon {
  id: ObjectId;
  created: DateTs;
  modified: DateTs;
  created_by: ObjectId;
}

export const polishDataSourceRaw = (dataSourceRaw: DataSourceRaw) => {
  const dataSource: DataSource = {
    // eslint-disable-next-line no-underscore-dangle
    id: polishObjectIdRaw(dataSourceRaw._id),
    name: dataSourceRaw.name,
    created: polishDateTsRaw(dataSourceRaw.created),
    modified: polishDateTsRaw(dataSourceRaw.modified),
    created_by: polishObjectIdRaw(dataSourceRaw.created_by),
    public: dataSourceRaw.public,
    description: dataSourceRaw.description,
    static_data: dataSourceRaw.static_data,
  };
  return dataSource;
};
