import TripSort from '../view/trip-sort-view.js';
import TripEventsList from '../view/trip-events-list-view.js';
import EditPoint from '../view/edit-point-view.js';
import TripItemCard from '../view/trip-item-card-view.js';

import { render } from '../render.js';

export default class TripPresenter {
  tripList = new TripEventsList();

  init = ( tripContainer, pointModel ) => {
    this.tripContainer = tripContainer;

    this.pointModel = pointModel;
    this.tripPoint = [...this.pointModel.getPoint()];

    // console.log(this.tripPoint);

    render( new TripSort, this.tripContainer );
    render( this.tripList, this.tripContainer );
    render( new EditPoint(this.tripPoint[0]), this.tripList.getElement(), 'afterbegin' );

    for ( let i = 0; i < this.tripPoint.length; i++ ) {
      render( new TripItemCard(this.tripPoint[i]), this.tripList.getElement() );
    }
    render( new EditPoint(this.tripPoint), this.tripList.getElement()); // проверка пустого или лучше сделать add-point-view...
  };
}
