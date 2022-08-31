import HeaderInfoView from '../view/header-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NoPointView from '../view/no-point-view.js';

import PointPresenter from './point-presenter.js';

import { render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #infoContainer = null;
  #tripContainer = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();
  #headerInfoComponent = new HeaderInfoView();
  #noPointComponent = new NoPointView();
  #tripSortComponent = new TripSortView();

  #tripPoints = [];

  #pointPresenter = new Map();

  constructor( infoContainer, tripContainer, pointsModel ) {
    this.#infoContainer = infoContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];
    //console.log(this.#tripPoints);
    this.#renderEvent();
  };

  #renderHeaderInfo = () => {
    render( this.#headerInfoComponent, this.#infoContainer, 'afterbegin' );
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderNoPoints = () => {
    render( this.#noPointComponent, this.#tripContainer);
  };

  #renderSort = () => {
    render( this.#tripSortComponent, this.#tripContainer );
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for ( let i = 0; i < this.#tripPoints.length; i++ ) {
      this.#renderPoint( this.#tripPoints[i] );
    }
  };

  #clearTripList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderTripList = () => {
    render( this.#tripListComponent, this.#tripContainer );

    this.#renderPoints();
  };

  #renderEvent = () => {

    if (this.#tripPoints.length === 0) { // завязка на фильтрацию
      this.#renderNoPoints();
    } else {
      this.#renderHeaderInfo();

      this.#renderSort();
      this.#renderTripList();
    }
  };
}
