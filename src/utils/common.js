
const getNumberFromString = ( str ) => Number( str.split('').filter((item) => Number(item)).join('') );

const getUpperCaseValue = (str) => str[0].toUpperCase() + str.substring(1);

export {
  getNumberFromString,
  getUpperCaseValue,
};
