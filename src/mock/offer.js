import { getRandomInteger, getRandomArrayElement } from '../utils';
import { OFFER_TYPES, OFFER_TITLES } from './const.js';

export const generateOffer = () => ({
  type: getRandomArrayElement(OFFER_TYPES),
  offers: [
    {
      id: 1,
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomInteger(0, 200)
    },
    {
      id: 2,
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomInteger(0, 200)
    }
  ]
});
