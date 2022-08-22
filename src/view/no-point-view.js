import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>
    <!--* Everthing – 'Click New Event to create your first point'
        * Past — 'There are no past events now';
        * Future — 'There are no future events now'. -->
  `
);

export default class NoPointView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
