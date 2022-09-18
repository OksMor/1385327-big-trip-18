import HeaderInfoView from '../view/header-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import PointPresenter from './point-presenter.js';

import { render, remove } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/trip-utils.js';
import { filter } from '../utils/filter.js';
import { generateTripInfo } from '../mock/info.js';
import { FilterType, SortType, UserAction, UpdateType } from '../mock/const.js';

export default class MainPresenter {
  #infoContainer = null;
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #tripSortComponent = null;

  #tripListComponent = new TripEventsListView();
  #headerInfoComponent = null;
  #noPointComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor( infoContainer, tripContainer, pointsModel, filterModel ) {
    this.#infoContainer = infoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);

      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);

      default:
        return filteredPoints.sort(sortByDay);
    }
  }

  init = () => {
    // console.log(this.#tripPoints);
    this.#renderContent();
  };

  #renderHeaderInfo = () => {
    const tripInfo = generateTripInfo(this.#pointsModel);
    this.#headerInfoComponent = new HeaderInfoView(tripInfo);
    render( this.#headerInfoComponent, this.#infoContainer, 'afterbegin' );
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render( this.#noPointComponent, this.#tripContainer);
  };

  #renderSort = () => {
    if (this.#tripSortComponent instanceof TripSortView) {
      remove(this.#tripSortComponent);
    }

    this.#tripSortComponent = new TripSortView(this.#currentSortType);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render( this.#tripSortComponent, this.#tripContainer );
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({resetSortType: true});
        this.#renderContent();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // this.#sortPoints(sortType);
    this.#currentSortType = sortType;
    this.#renderSort(sortType);
    this.#clearContent();
    this.#renderContent();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offersData, this.#pointsModel.destinationsData);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for ( let i = 0; i < this.points.length; i++ ) {
      this.#renderPoint( this.points[i] );
    }
  };

  #renderContent = () => {
    if (this.points.length === 0) {
      this.#renderNoPoints();
    } else {
      this.#renderHeaderInfo();
      this.#renderSort();

      render( this.#tripListComponent, this.#tripContainer );

      this.#renderPoints();
    }
  };

  #clearContent = ({resetSortType = false} = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#tripSortComponent);
    remove(this.#headerInfoComponent);

    if (this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
