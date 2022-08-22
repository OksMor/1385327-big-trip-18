import HeaderInfoView from '../view/header-info-view.js';
import HeaderFiltersView from '../view/header-filters-view.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import TripItemCardView from '../view/trip-item-card-view.js';
import NoPointView from '../view/no-point-view.js';

import { render, replace } from '../framework/render.js';

export default class MainPresenter {
  #infoContainer = null;
  #filterContainer = null;
  #tripContainer = null;
  #pointsModel = null;
  #tripList = new TripEventsListView();
  #tripPoints = [];

  constructor( infoContainer, filterContainer, tripContainer, pointsModel ) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderEvent();
  };


  #renderPoint = (point) => {
    const pointComponent = new TripItemCardView(point);
    const pointEditComponent = new EditPointView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent); // this.#tripList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent); // this.#tripList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      // evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setClickHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#tripList.element);
  };

  #renderEvent = () => {
    render( new HeaderFiltersView(), this.#filterContainer );
    if (this.#tripPoints.length === 0) { // завязка на фильтрацию
      render( new NoPointView(), this.#tripContainer);
    } else {
      render( new HeaderInfoView(), this.#infoContainer, 'afterbegin' );


      render( new TripSortView(), this.#tripContainer );
      render( this.#tripList, this.#tripContainer );

      for ( let i = 0; i < this.#tripPoints.length; i++ ) {
        this.#renderPoint( this.#tripPoints[i] );
      }
    }
  };
}
