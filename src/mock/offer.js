import { getRandomInteger } from '../utils/common.js'; //, getRandomArrayElement
// import { OFFER_TYPES, OFFER_TITLES } from './const.js';

export const offersData = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade taxi 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade taxi 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade taxi 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade taxi 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade taxi 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade bus 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade bus 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade bus 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade bus 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade bus 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade train 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade train 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade train 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade train 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade train 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade ship 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade ship 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade ship 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade ship 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade ship 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Upgrade drive 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade drive 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade drive 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade drive 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade drive 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade flight 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade flight 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade flight 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade flight 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade flight 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Upgrade check-in 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade check-in 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade check-in 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade check-in 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade check-in 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Upgrade sightseeing 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade sightseeing 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade sightseeing 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade sightseeing 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade sightseeing 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Upgrade restaurant 1',
        price: getRandomInteger(0, 200),
      },
      {
        id: 2,
        title: 'Upgrade restaurant 2',
        price: getRandomInteger(0, 200),
      },
      {
        id: 3,
        title: 'Upgrade restaurant 3',
        price: getRandomInteger(0, 200),
      },
      {
        id: 4,
        title: 'Upgrade restaurant 4',
        price: getRandomInteger(0, 200),
      },
      {
        id: 5,
        title: 'Upgrade restaurant 5',
        price: getRandomInteger(0, 200),
      },
    ]
  },
];

// export const generateOffer = () => ({
//   type: getRandomArrayElement(OFFER_TYPES),
//   offers: [
//     {
//       id: 1,
//       title: getRandomArrayElement(OFFER_TITLES),
//       price: getRandomInteger(0, 200)
//     },
//     {
//       id: 2,
//       title: getRandomArrayElement(OFFER_TITLES),
//       price: getRandomInteger(0, 200)
//     }
//   ]
// });
