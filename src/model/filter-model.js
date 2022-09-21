import Observable from '../framework/observable.js';
// import { filter } from '../utils/filter.js';
import { FilterType } from '../mock/const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}