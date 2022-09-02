import dayjs from 'dayjs';
import { getRandomInteger } from './common';

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
  const fullMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute'); //console.log(fullMinutes);
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

const isPointInFuture = ({dateFrom, dateTo}) => dayjs().isSame(dayjs(dateFrom)) || dayjs().isBefore(dayjs(dateFrom)) || dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

const isPointInPast = ({dateFrom, dateTo}) => dayjs().isAfter(dayjs(dateTo)) || (dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo)));

const sortByDay = (a, b) => {
  if (dayjs(b.dateFrom).isAfter(dayjs(a.dateFrom))) {
    return 1;
  } else {
    return -1;
  }
};

const sortByPrice = (a, b) => b.basePrice - a.basePrice;

const sortByTime = (a, b) => {
  const fullMinutesA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
  const fullMinutesB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
  return fullMinutesB - fullMinutesA;
};

export {
  humanizeDate,
  hoursMinutesDate,
  yearMonthDate,
  fullDate,
  slashesFullDate,
  generateDate,
  eventDuration,
  isPointInFuture,
  isPointInPast,
  sortByDay,
  sortByPrice,
  sortByTime,
};
