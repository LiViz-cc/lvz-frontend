import dayjs from 'dayjs';
import type { DateTs } from '../models';

export const dateTsToStr = (dateTs: DateTs, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  // format: https://day.js.org/docs/en/display/format
  const dateTsStr = dayjs(dateTs).format(format);
  return dateTsStr;
};
