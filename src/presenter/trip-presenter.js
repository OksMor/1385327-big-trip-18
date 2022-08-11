import TripSort from '../view/trip-sort-view.js';
import TripEventsList from '../view/trip-events-list-view.js';
import EditPoint from '../view/edit-point-view.js';
import TripItemCard from '../view/trip-item-card-view';

import { render } from '../render.js';

export default class TripPresenter {
  tripList = new TripEventsList();

  init = ( tripContainer ) => {
    this.tripContainer = tripContainer;

    render( new TripSort, this.tripContainer );
    render( this.tripList, this.tripContainer );
    render( new EditPoint, this.tripList.getElement(), 'afterbegin' );

    for ( let i = 0; i < 3; i++ ) {
      render( new TripItemCard, this.tripList.getElement() );
    }
  };
}
