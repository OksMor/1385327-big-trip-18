import AbstractView from '../framework/view/abstract-view.js';
import { slashesFullDate } from '../utils/trip-utils.js';
import { POINT_TYPES, DESTINATION_NAMES } from '../mock/const.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  offers: [],
  type: '',
};

const createOfferTemplate = (offer) => {
  const prefix = offer.title.toLowerCase().replace(' ', '-');

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${prefix}-${offer.id}"
          type="checkbox"
          name="event-offer-${prefix}"
      >
      <label class="event__offer-label" for="event-offer-${prefix}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
};

const createOffersTemplate = (offers) => offers.map(createOfferTemplate).join('');

const createEventTypesTemplate = (types, eventType) => (
  `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${types.map((type) => {
    const upperCaseValue = type[0].toUpperCase() + type.substring(1);
    return `
          <div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === eventType ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${upperCaseValue}</label>
          </div>
          `;
  }).join('')}
          </fieldset>
        `
);

const createDestinationsTemplate = (destinations) => (
  `
    ${destinations.map((destination) => `<option value="${destination}"></option>`).join('')}
  `
);

const createDestinationPhotosTemplate = (destinationPhotos) => (
  `
    ${destinationPhotos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  `
);

const createEventEditTemplate = (point) => {
  // const {basePrice, dateFrom, dateTo, destination, offers, type} = point;
  const {
    basePrice = 0,
    dateFrom = null,
    dateTo = null,
    destination = {
      description: '',
      name: '',
      pictures: []
    },
    offers = [],
    type = ''
  } = point;

  const dateFromSlashes = dateFrom !== null
    ? slashesFullDate(dateFrom)
    : '';

  const dateToSlashes = dateTo !== null
    ? slashesFullDate(dateTo)
    : '';

  const buttonEditTemplate = Object.keys(point).length !== 0
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  const offersTemplate = createOffersTemplate(offers);
  const eventTypesTemplate = createEventTypesTemplate(POINT_TYPES, type);
  const destinationsTemplate = createDestinationsTemplate(DESTINATION_NAMES);
  const destinationPhotosTemplate = createDestinationPhotosTemplate(destination.pictures);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="${type !== '' ? `img/icons/${type}.png` : ''}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${eventTypesTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromSlashes}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToSlashes}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${Object.keys(point).length === 0 ? 'Cancel' : 'Delete'}</button> ${buttonEditTemplate}
          <!-- <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button> -->
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${destinationPhotosTemplate}
              </div>
            </div>
          </section>

        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractView {
  #point = null;

  constructor(point = BLANK_POINT) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventEditTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.formSubmit(this.#point);
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };
}
