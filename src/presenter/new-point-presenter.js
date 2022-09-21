import { remove, render, RenderPosition } from '../framework/render.js';
import { nanoid } from 'nanoid';

import EditPointView from '../view/edit-point-view.js';

import { UserAction, UpdateType, BLANK_POINT } from '../mock/const.js';

export default class NewPointPresenter {
  #tripListContainer = null;
  #pointEditComponent = null;

  #changeData = null;

  #allOffers = null;
  #allDestinations = null;

  #destroyCallback = null;

  constructor(tripListContainer, changeData) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeData;
  }

  init = (callback, offersData, destinationsData) => {
    this.#destroyCallback = callback;
    this.#allOffers = offersData;
    this.#allDestinations = destinationsData;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView(BLANK_POINT, this.#allOffers, this.#allDestinations);

    this.#pointEditComponent.setFormSubmitClickHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormDeleteClickHandler(this.#handleFormClose);

    render(this.#pointEditComponent, this.#tripListContainer.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }
    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
  };

  #handleFormClose = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

}
