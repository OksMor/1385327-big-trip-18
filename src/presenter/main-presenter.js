import HeaderInfoView from '../view/header-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import PointPresenter from './point-presenter.js';

import { render, remove } from '../framework/render.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/trip-utils.js';
import { SortType, UserAction, UpdateType } from '../mock/const.js';

export default class MainPresenter {
  #infoContainer = null;
  #tripContainer = null;
  #pointsModel = null;
  #tripSortComponent = null;

  #tripListComponent = new TripEventsListView();
  // #headerInfoComponent = new HeaderInfoView();
  #headerInfoComponent = null;
  #noPointComponent = new NoPointView();

  // #tripPoints = [];
  // #sourcedEvents = [];

  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor( infoContainer, tripContainer, pointsModel ) {
    this.#infoContainer = infoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);

      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);

      default:
        return [...this.#pointsModel.points].sort(sortByDay);
    }

    // return this.#pointsModel.points;
  }

  init = () => {
    // console.log(this.#tripPoints);
    this.#renderContent(); //#renderEvent
  };

  #renderHeaderInfo = () => {
    this.#headerInfoComponent = new HeaderInfoView();
    render( this.#headerInfoComponent, this.#infoContainer, 'afterbegin' );
  };

  // #renderFilter = () => {
  //   const tripMainElement = document.querySelector( '.trip-main' );
  //   const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
  //   const filters = generateFilter(this.#pointsModel.points);
  //   render( new HeaderFiltersView(filters), tripFiltersElement );
  // };

  #renderNoPoints = () => {
    render( this.#noPointComponent, this.#tripContainer);
  };

  #renderSort = (sortType = SortType.DAY) => {
    if (this.#tripSortComponent instanceof TripSortView) {
      remove(this.#tripSortComponent);
    }

    this.#tripSortComponent = new TripSortView(sortType);
    render( this.#tripSortComponent, this.#tripContainer );
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    pointPresenter.init(point, this.#pointsModel.offersData, this.#pointsModel.destinationsData); // this.#pointsModel
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
      // this.#renderFilter();

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
    // remove(this.#filterComponent);

    if (this.#noPointComponent){
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
