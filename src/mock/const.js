import dayjs from 'dayjs';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  offers: [],
  type: 'bus',
};

const maxShowCities = 3;
export {
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  BLANK_POINT,
  maxShowCities,
};
