import dayjs from 'dayjs';
import { MAX_SHOW_CITIES } from './const.js';


export const generateTripInfo = (pointsModel) => {

  const tripInfo = {};
  const pointsSequence = pointsModel.points.slice();
  let tripCost = 0;

  pointsSequence.sort((a, b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1).forEach((point) => {
    pointsModel.offersData.forEach((offersByType) => {
      if (offersByType.type === point.type) {
        offersByType.offers.forEach((offerByType) => { //forEach
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

  tripInfo['tripDateFrom'] = pointsSequence[0].dateFrom;
  tripInfo['tripDateTo'] = pointsSequence[pointsSequence.length - 1].dateTo;
  tripInfo['tripCost'] = tripCost;

  return tripInfo;
};
