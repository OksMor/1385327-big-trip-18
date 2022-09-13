import { generateDate } from '../utils/trip-utils.js';
import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { nanoid } from 'nanoid';
// import { generateDestination } from './destination.js';
import { destinationsData } from './destination.js';
// import { generateOffer } from './offer.js';
import { offersData } from './offer.js';
import { POINT_TYPES } from './const.js';

const getPointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const getRandomOffersIds = (type) => {
  const randomIds = [];
  const currentOffers = offersData.find((offer) => offer.type === type);
  const randomLength = getRandomInteger(0, currentOffers.offers.length);
  if (randomLength === 0) {
    return randomIds;
  }
  for (let i = 0; i < randomLength; i++) {
    randomIds.push(currentOffers.offers[i].id);
  }
  return randomIds;
};

export const generatePoint = () => {
  const type = getPointType();

  return ({
    basePrice: getRandomInteger(10, 500),
    dateFrom: generateDate(-1, 1),
    dateTo: generateDate(1, 2),
    destination: getRandomArrayElement(destinationsData).id,
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomOffersIds(type),
    type
  });
};
