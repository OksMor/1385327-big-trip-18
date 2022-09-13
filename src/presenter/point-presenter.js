import { remove, render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import TripItemCardView from '../view/trip-item-card-view.js';
import { Mode } from '../mock/const.js';

export default class PointPresenter {
  #tripContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #changeMode = null;

  #point = null;

  #mode = Mode.DEFAULT;

  constructor(tripContainer, changeData, changeMode) {
    this.#tripContainer = tripContainer;

    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, pointsModel) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    console.log('PK-1', prevPointComponent);
    console.log('PE-1', prevPointEditComponent);
    const allOffers = pointsModel.offersData; console.log('allOffers', allOffers);

    const currentOffers = pointsModel.getCurrentOffers(this.#point); console.log('currentOffers', currentOffers);
    const selectedOffers = pointsModel.getSelectedOffers(this.#point); console.log('selectedOffers', selectedOffers);

    const allDestinations = pointsModel.destinationsData; console.log('allDestinations', allDestinations);
    const currentDestination = pointsModel.getCurrentDestination(this.#point); console.log('currentDestination', currentDestination);


    this.#pointComponent = new TripItemCardView(point, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination); console.log('PK-2', this.#pointComponent);
    this.#pointEditComponent = new EditPointView(point, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination); console.log('PE-2', this.#pointEditComponent);//, currentOffers, selectedOffers, allDestinations, currentDestination

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setClickHandler(this.#handleClick);
    console.log('PK-3', prevPointComponent);
    console.log('PE-3', prevPointEditComponent);
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point); // this.#offer, this.#destinations
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point); // this.#offer, this.#destinations
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };

  #handleClick = () => {
    this.#pointEditComponent.reset(this.#point); // this.#offer, this.#destinations
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
