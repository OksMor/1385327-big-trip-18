import { getTripInfo } from '../utils/trip-utils.js'; //переделать - названия городов а не точек, одинаковые название!

export const generateTripInfo = (pointsModel) => {

  const tripInfo = getTripInfo(pointsModel);
  const mockTripInfo = {};

  if (tripInfo.pointsSequence.length > 3) {
    let startPoint = '';
    let endPoint = '';
    for (const dest of pointsModel.destinationsData) {
      if (tripInfo.pointsSequence[0].destination === dest.id) {
        startPoint = dest.name;
      }
    }
    for (const dest of pointsModel.destinationsData) {
      if (tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].destination === dest.id) {
        endPoint = dest.name;
      }
    }
    mockTripInfo['tripTitle'] = `${startPoint} —...— ${endPoint}`;
  } else {
    const tripTitle = tripInfo.pointsSequence.map((point) => {
      for (const dest of pointsModel.destinationsData) {
        if (point.destination === dest.id) {
          return dest.name;
        }
      }
    });

    mockTripInfo['tripTitle'] = tripTitle.join(' — ');
  }

  mockTripInfo['tripDateFrom'] = tripInfo.pointsSequence[0].dateFrom;
  mockTripInfo['tripDateTo'] = tripInfo.pointsSequence[tripInfo.pointsSequence.length - 1].dateTo;
  mockTripInfo['tripCost'] = tripInfo.tripCost;

  return mockTripInfo;
};
