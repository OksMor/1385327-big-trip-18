import { generateDate } from '../utils/trip-utils.js';
import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { destinationsData } from './destination.js';
import { offersData } from './offer.js';
import { POINT_TYPES } from './const.js';

const getPointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const getRandomOffersIds = (type) => {

  const randomIds = [];
  const currentOffers = offersData.find((offer) => offer.type === type);
  const currentOffersLength = currentOffers.offers.length;

  const randomLength = getRandomInteger(0, currentOffersLength);

  if (randomLength === 0) {

    return randomIds;
  } else {
    while ( randomIds.length < randomLength) {
      const randomOfferId = getRandomInteger(1, (currentOffersLength));

      if (randomIds.indexOf(randomOfferId) === -1) {
        randomIds.push(randomOfferId);
      }
    }

    return randomIds;
  }
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
