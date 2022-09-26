import { FilterType } from '../mock/const.js';
import { isPointInFuture, isPointInPast } from './trip-utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point)),
};

export { filter };
