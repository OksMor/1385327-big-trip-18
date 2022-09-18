import { getRandomInteger } from '../utils/common.js';

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
  {
    id: 4, // Если информация о пункте назначения отсутствует .... какая? ждем данные с серва!
    name: 'Madrid',
    description: '',
    pictures: []
  },
];
