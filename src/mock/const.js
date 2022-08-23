const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const OFFER_TITLES = ['Order Uber', 'Add luggage', 'Switch to comfort', 'Rent a car', 'Add meal', 'Add breakfast', 'Book tickets', 'Lunch in city', 'Choose seats', 'Travel by train'];
const DESTINATION_NAMES = ['Amsterdam', 'Chamonix', 'Geneva'];
const DESTINATION_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export {
  OFFER_TYPES,
  POINT_TYPES,
  OFFER_TITLES,
  DESTINATION_NAMES,
  DESTINATION_DESCRIPTIONS,
  FilterType,
};
