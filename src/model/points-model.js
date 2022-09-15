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

  getSelectedOffers = (point) => {
    const selectedOffers = this.#offersData.find((offer) => offer.type === point.type).offers.filter((offer) => point.offers.includes(offer.id));
    return selectedOffers;
  };

  getCurrentOffers = (point) => {
    const currentOffers = this.#offersData.find((offer) => offer.type === point.type);
    return currentOffers;
  };

  getCurrentDestination = (point) => {
    this.currentDestination = destinationsData.find((destination) => (destination.id === point.destination));
    return this.currentDestination;
  };
}
