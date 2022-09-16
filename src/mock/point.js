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
  const currentOffers = offersData.find((offer) => offer.type === type); console.log('currentOffers', currentOffers);
  const currentOffersLength = currentOffers.offers.length; console.log('!!!!!!!!!!!', type, 'currentOffers.offers.length', currentOffersLength);

  const randomLength = getRandomInteger(0, currentOffersLength); console.log('randomLength', randomLength);

  if (randomLength === 0) {
    console.log(type, 'nononononono');

    return randomIds;
  } else {
    while (randomIds.length < randomLength) {
      const randomOfferId = getRandomInteger(0, (currentOffersLength - 1));
      console.log('randomOfferId', randomOfferId);
      const t = randomIds.includes(randomIds.value === randomOfferId); console.log(t);

      randomIds.push(currentOffers.offers[randomOfferId].id);
      console.log('offer randomIds -', randomIds);

    }
    // for (let i = 0; i < randomLength; i++) {
    //   randomIds.push(currentOffers.offers[i].id);
    //   const randomOfferId = getRandomInteger(0, (currentOffersLength - 1));
    //   console.log('zahod', i, 'randomOfferId', randomOfferId);
    //   randomIds.push(currentOffers.offers[randomOfferId].id);
    //   console.log('offer randomIds -', randomIds);
    // }
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
