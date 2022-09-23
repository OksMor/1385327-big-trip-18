import { remove, render, replace } from '../framework/render.js';

import EditPointView from '../view/edit-point-view.js';
import TripItemCardView from '../view/trip-item-card-view.js';

import { Mode, UserAction, UpdateType } from '../mock/const.js';

export default class PointPresenter {
  #tripContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #changeMode = null;

  #point = null;
  #allOffers = null;
  #allDestinations = null;

  #mode = Mode.DEFAULT;

  constructor(tripContainer, changeData, changeMode) {
    this.#tripContainer = tripContainer;

    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offersData, destinationsData) => {
    this.#point = point;
    this.#allOffers = offersData;
    this.#allDestinations = destinationsData;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripItemCardView(point, this.#allOffers, this.#allDestinations);
    this.#pointEditComponent = new EditPointView(point, this.#allOffers, this.#allDestinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormSubmitClickHandler(this.#handleFormSubmit);
    // this.#pointEditComponent.setFormDeleteClickHandler(this.#handleFormDelete);
    this.#pointEditComponent.setFormCancelClickHandler(this.#handleFormDelete);
    this.#pointEditComponent.setEditFormOpenClickHandler(this.#handleClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      // replace(this.#pointEditComponent, prevPointEditComponent);
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
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

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {

    const updatePoint = {...point};
    delete updatePoint.type;

    const currentPoint = {...this.#point};
    delete currentPoint.type;

    const isMinorUpdate = JSON.stringify(updatePoint) !== JSON.stringify(currentPoint);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
    );
    // this.#replaceFormToCard();
  };

  #handleFormDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

}
