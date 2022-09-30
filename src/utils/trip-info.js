import dayjs from 'dayjs';
import { MAX_SHOW_CITIES } from '../const.js';
import { sortByDay } from './trip-utils.js';


export const generateTripInfo = (pointsModel) => {

  const tripInfo = {};
  const pointsSequence = pointsModel.points.slice().sort(sortByDay);
  const dateFrom = pointsSequence[0].dateFrom;
  const dateTo = pointsSequence[pointsSequence.length - 1].dateTo;

  let tripCost = 0;

  pointsSequence.forEach((point) => {
    pointsModel.offersData.forEach((offersByType) => {
      if (offersByType.type === point.type) {
        offersByType.offers.forEach((offerByType) => {
          if (point.offers.includes(offerByType.id)) {
            tripCost += Number(offerByType.price);
          }
        });
      }
    });
    tripCost += Math.abs(Number(point.basePrice));
  });

  tripInfo['tripCost'] = tripCost;

  if (pointsSequence.length > MAX_SHOW_CITIES) {
    const startPoint = pointsModel.destinationsData.find((dest) => pointsSequence[0].destination === dest.id).name;
    const endPoint = pointsModel.destinationsData.find((dest) => pointsSequence[pointsSequence.length - 1].destination === dest.id).name;

    tripInfo['tripTitle'] = `${startPoint} —...— ${endPoint}`;
  } else {
    const tripTitle = pointsSequence.map((point) => pointsModel.destinationsData.find((dest) => point.destination === dest.id).name);

    tripInfo['tripTitle'] = tripTitle.join(' — ');
  }

  if ( dateFrom !== null && dateTo !== null ) {
    let dateFromFormat = '';
    let dateToFormat = '';

    const dateFromMonth = dayjs(dateFrom).format('M');
    const dateToMonth = dayjs(dateTo).format('M');

    if ( dateFromMonth !== dateToMonth ) {
      dateFromFormat = dayjs(dateFrom).format('MMM D');
      dateToFormat = dayjs(dateTo).format('MMM D');
    } else {
      dateFromFormat = dayjs(dateFrom).format('MMM D');
      dateToFormat = dayjs(dateTo).format('D');
    }

    tripInfo['tripDateFrom'] = dateFromFormat;
    tripInfo['tripDateTo'] = dateToFormat;
  }

  return tripInfo;
};
