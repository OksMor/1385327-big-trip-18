import { getRandomArrayElement, getRandomInteger, generateDate } from '../utils.js';
import { generateDestination } from './destination.js';
import { generateOffer } from './offer.js';
import { POINT_TYPES } from './const.js';

export const generatePoint = () => ({
  basePrice: getRandomInteger(10, 500),
  dateFrom: generateDate(0, 1),
  dateTo: generateDate(1, 2),
  destination: getRandomArrayElement(Array.from({length: 5}, generateDestination)),
  id: getRandomInteger(1, 5),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: getRandomArrayElement(Array.from({length: 5}, generateOffer)).offers,
  type: getRandomArrayElement(POINT_TYPES),
});
