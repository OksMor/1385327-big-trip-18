import { createElement } from '../render.js';

const createEmptyListTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>
    <!--* Everthing – 'Click New Event to create your first point'
        * Past — 'There are no past events now';
        * Future — 'There are no future events now'. -->
  `
);

export default class NoPointView {
  #element = null;

  get template() {
    return createEmptyListTemplate();
  }

  get element() {
    if ( !this.#element ) {
      this.#element = createElement( this.template );
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
