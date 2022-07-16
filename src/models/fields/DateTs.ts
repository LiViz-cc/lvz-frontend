export type DateTsRaw = {
  $date: DateTs;
};

export type DateTs = number;

export const polishDateTsRaw = (dateTsRaw: DateTsRaw) => {
  const dateTs: DateTs = dateTsRaw.$date;
  return dateTs;
};
