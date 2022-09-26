import dayjs from 'dayjs';
import { MAX_SHOW_CITIES } from './const.js';


export const generateTripInfo = (pointsModel) => {

  const tripInfo = {};
  const pointsSequence = pointsModel.points.slice();
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

  if (pointsSequence.length > MAX_SHOW_CITIES) {
    let startPoint = '';
    let endPoint = '';

    for (const dest of pointsModel.destinationsData) {
      if (pointsSequence[0].destination === dest.id) {
        startPoint = dest.name;
      }
    }

    for (const dest of pointsModel.destinationsData) {
      if (pointsSequence[pointsSequence.length - 1].destination === dest.id) {
        endPoint = dest.name;
      }
    }

    tripInfo['tripTitle'] = `${startPoint} —...— ${endPoint}`;
  } else {
    const tripTitle = pointsSequence.map((point) => {
      for (const dest of pointsModel.destinationsData) {
        if (point.destination === dest.id) {
          return dest.name;
        }
      }
    });

    tripInfo['tripTitle'] = tripTitle.join(' — ');
  }

  const dateFrom = pointsSequence[0].dateFrom;
  const dateTo = pointsSequence[pointsSequence.length - 1].dateTo;
  let dateFromFormat = '';
  let dateToFormat = '';

  if ( dateFrom !== null && dateTo !== null ) {
    const dateFromMonth = dayjs(dateFrom).format('M');
    const dateToMonth = dayjs(dateTo).format('M');
    if ( dateFromMonth !== dateToMonth ) {
      dateFromFormat = dayjs(dateFrom).format('MMM D');
      dateToFormat = dayjs(dateTo).format('MMM D');
    } else {
      dateFromFormat = dayjs(dateFrom).format('MMM D');
      dateToFormat = dayjs(dateTo).format('D');
    }
  }

  tripInfo['tripDateFrom'] = dateFromFormat;
  tripInfo['tripDateTo'] = dateToFormat;

  tripInfo['tripCost'] = tripCost;

  return tripInfo;
};
