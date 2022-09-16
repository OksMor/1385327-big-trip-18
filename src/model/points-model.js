import { generatePoint } from '../mock/point.js';
import { destinationsData } from '../mock/destination.js';
import { offersData } from '../mock/offer.js';

export default class PointsModel {
  #points = Array.from({length: 3}, generatePoint);
  #destinationsData = destinationsData;
  #offersData = offersData;

  get points () {
    return this.#points;
  }

  get destinationsData() {
    return this.#destinationsData;
  }

  get offersData() {
    return this.#offersData;
  }
}
