import { getRandomInteger } from '../utils/common.js'; //, getRandomArrayElement
// import { DESTINATION_NAMES, DESTINATION_DESCRIPTIONS } from './const.js';
// import { getRandomInteger } from '../utils/common.js';
// import { DESTINATION_NAMES } from './const.js';

export const destinationsData = [
  {
    id: 1,
    name:'Chamonix',
    description: 'Chamonix, is a beautiful city',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Chamonix parliament building',
      }
    ]
  },
  {
    id: 2,
    name: 'Geneva',
    description: 'Geneva, is a beautiful city',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Geneva parliament building',
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Geneva parliament building',
      }
    ]
  },
  {
    id: 3,
    name: 'Amsterdam',
    description: 'Amsterdam, is a beautiful city',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Amsterdam parliament building',
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Amsterdam parliament building',
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
        description: 'Amsterdam parliament building',
      }
    ]
  },
];

// export const generateDestination = () => ({
//   id: getRandomInteger(1, 5),
//   description: getRandomArrayElement(DESTINATION_DESCRIPTIONS),
//   name: getRandomArrayElement(DESTINATION_NAMES),
//   pictures: [
//     {
//       src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
//       description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
//     },
//     {
//       src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
//       description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
//     },
//     {
//       src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
//       description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
//     },
//     {
//       src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
//       description: getRandomArrayElement(DESTINATION_DESCRIPTIONS)
//     },
//   ]
// });
