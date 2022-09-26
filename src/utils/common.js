// const getRandomInteger = (a = 0, b = 1) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));

//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };

// const getRandomArrayElement = (array) => {
//   const randomIndex = getRandomInteger(0, array.length - 1);

//   return array[randomIndex];
// };

const getNumberFromString = ( str ) => Number( str.split('').filter((item) => Number(item)).join('') );

const getUpperCaseValue = (str) => str[0].toUpperCase() + str.substring(1);

export {
  // getRandomInteger,
  // getRandomArrayElement,
  getNumberFromString,
  getUpperCaseValue,
};
