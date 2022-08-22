import AbstractView from '../framework/view/abstract-view.js';

const createEventListTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripEventsListView extends AbstractView {

  get template() {
    return createEventListTemplate();
  }
}
