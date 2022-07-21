export type ObjectIdRaw = {
  $oid: ObjectId;
};

export type ObjectId = string;

export const polishObjectIdRaw = (objectIdRaw: ObjectIdRaw) => {
  const objectId: ObjectId = objectIdRaw.$oid;
  return objectId;
};
