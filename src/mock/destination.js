import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { DESTINATION_NAMES, DESTINATION_DESCRIPTIONS } from './const.js';

export const generateDestination = () => ({
  //id: getRandomInteger(1, 5),
  description: getRandomArrayElement(DESTINATION_DESCRIPTIONS),
  name: getRandomArrayElement(DESTINATION_NAMES),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
      description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
    },
  ]
});
