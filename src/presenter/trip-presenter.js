import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripItemCardView from '../view/trip-item-card-view.js';

import { render } from '../render.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripList = new TripEventsListView();
  #tripPoints = [];
  #pointsModel = null;

  init = ( tripContainer, pointsModel ) => {
    this.#tripContainer = tripContainer;

    this.#pointsModel = pointsModel;
    this.#tripPoints = [...this.#pointsModel.points];

    // console.log(this.tripPoint);

    render( new TripSortView(), this.#tripContainer );
    render( this.#tripList, this.#tripContainer );

    for ( let i = 0; i < this.#tripPoints.length; i++ ) {
      this.#renderPoint( this.#tripPoints[i] );
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new TripItemCardView(point);
    const pointEditComponent = new EditPointView(point);

    const replaceCardToForm = () => {
      this.#tripList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
    });

    render(pointComponent, this.#tripList.element);
  };
}
