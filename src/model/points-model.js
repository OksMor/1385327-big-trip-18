import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';
import { destinationsData } from '../mock/destination.js';
import { offersData } from '../mock/offer.js';

export default class PointsModel extends Observable{
  #points = Array.from({length: 5}, generatePoint);
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

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
