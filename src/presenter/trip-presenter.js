import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripItemCardView from '../view/trip-item-card-view.js';

import { render } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripList = new TripEventsListView();
  #tripPoint = [];
  #pointModel = null;

  init = ( tripContainer, pointModel ) => {
    this.#tripContainer = tripContainer;

    this.#pointModel = pointModel;
    this.#tripPoint = [...this.#pointModel.points];

    // console.log(this.tripPoint);

    render( new TripSortView(), this.#tripContainer );
    render( this.#tripList, this.#tripContainer );
    render( new EditPointView(this.#tripPoint[0]), this.#tripList.element, 'afterbegin' );

    for ( let i = 0; i < this.#tripPoint.length; i++ ) {
      render( new TripItemCardView(this.#tripPoint[i]), this.#tripList.element );
    }
    // render( new EditPoint(this.tripPoint), this.tripList.getElement());
    // проверка пустого или лучше сделать add-point-view...
  };
}
