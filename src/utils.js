import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const humanizeDate = (date) => dayjs(date).format('MMM D');
const hoursMinutesDate = (date) => dayjs(date).format('hh:mm');
const yearMonthDate = (date) => dayjs(date).format('YYYY-MM-DD');
const fullDate = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const slashesFullDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const MINUTES = {
  minuteInHour: 60,
  hoursInDay: 24,
  minuteInDay: 1440,
};

const eventDuration = (dateTo, dateFrom) => {
  const fullMinutes = dayjs(dateTo).diff(dateFrom, 'minute'); //console.log(fullMinutes);
  const hours = Math.trunc(fullMinutes / MINUTES.minuteInHour);
  const minutes = fullMinutes % MINUTES.minuteInHour;
  const days = Math.trunc(hours / MINUTES.hoursInDay);
  const hoursDays = hours % MINUTES.hoursInDay;

  const viewHours = hours < 10 ? `0${hours}` : hours;
  const viewMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const viewDays = days < 10 ? `0${days}` : days;
  const viewHoursDays = hoursDays < 10 ? `0${hoursDays}` : hoursDays;

  if (fullMinutes < MINUTES.minuteInHour) {
    return `${viewMinutes}M`;
  }

  if (fullMinutes >= MINUTES.minuteInHour && fullMinutes < MINUTES.minuteInDay) {
    return `${viewHours}H ${viewMinutes}M`;
  }

  if (fullMinutes >= MINUTES.minuteInDay) {
    return `${viewDays}D ${viewHoursDays}H ${viewMinutes}M`;
  }
};

const generateDate = (dayStart, dayEnd) => {
  const daysGap = getRandomInteger(dayStart, dayEnd);
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 60);
  const secondsGap = getRandomInteger(0, 60);

  return dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').add(secondsGap, 'second').toDate();
};

export {
  getRandomInteger,
  getRandomArrayElement,
  humanizeDate,
  hoursMinutesDate,
  yearMonthDate,
  fullDate,
  slashesFullDate,
  generateDate,
  eventDuration
};
