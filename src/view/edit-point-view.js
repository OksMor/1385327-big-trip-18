import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { slashesFullDate } from '../utils/trip-utils.js';
import { getNumberFromString, getUpperCaseValue } from '../utils/common.js';

import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

const createEventTypesTemplate = (allOffers, eventType) => (
  `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${allOffers.map((offer) => (
    `
          <div class="event__type-item">
            <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${offer.type === eventType ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${getUpperCaseValue(offer.type)}</label>
          </div>
          `
  )).join('')}
    </fieldset>
  `
);

const createDestinationsTemplate = (currentDestination, allDestinations, type) => {
  const destinationsOptions = allDestinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
  return (
    `
      <label class="event__label  event__type-output"
        for="event-destination-1">
          ${getUpperCaseValue(type)}
      </label>
      <input class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${currentDestination !== undefined ? he.encode(currentDestination.name) : ''}"
        required
        autocomplete="disabled"
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationsOptions}
      </datalist>
    `
  );
};

const createDestinationPhotosTemplate = (currentDestination) => (
  `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${currentDestination.description}</p>
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${currentDestination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
    </div>
  </div>
</section>`
);

const createOffersTemplate = (currentOffers, selectedOffers) => {
  const prefix = currentOffers.type.toLowerCase().replace(' ', '-');
  return (
    `
      <section class="event__section  event__section--offers ${currentOffers.offers.length === 0 ? 'visually-hidden' : ''}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${currentOffers.offers.map((offer) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden"
                id="event-offer-${prefix}-${offer.id}"
                data-offer-id="${offer.id}"
                type="checkbox"
                name="event-offer-${prefix}"
                ${selectedOffers.includes(offer) ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${prefix}-${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `).join('')}
        </div>
      </section>
    `
  );
};

const createEventEditTemplate = (data, allOffers, allDestinations) => {
  const {basePrice, type, dateFrom, dateTo, offers, destination} = data;

  const currentOffers = allOffers.find((offer) => offer.type === type);
  const selectedOffers = allOffers.find((offer) => offer.type === type).offers.filter((offer) => offers.includes(offer.id));
  const currentDestination = allDestinations.find((destinations) => (destinations.id === destination));

  const dateFromSlashes = dateFrom !== null
    ? slashesFullDate(dateFrom)
    : '';

  const dateToSlashes = dateTo !== null
    ? slashesFullDate(dateTo)
    : '';

  const buttonEditTemplate = data
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : ''; //  пока кнопку оставлю (data.id)

  const eventTypesTemplate = createEventTypesTemplate(allOffers, type);

  const offersTemplate = currentOffers !== undefined ? createOffersTemplate(currentOffers, selectedOffers) : '';

  const destinationsTemplate = createDestinationsTemplate(currentDestination, allDestinations, type);
  const destinationPhotosTemplate = currentDestination !== undefined ? createDestinationPhotosTemplate(currentDestination) : '';

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
            ${destinationsTemplate}
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
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${Math.abs(Number(basePrice))}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${data.id ? 'Delete' : 'Cancel'}</button>
          ${buttonEditTemplate}
          <!-- <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button> -->
        </header>

        <section class="event__details">
          ${offersTemplate}
          ${destinationPhotosTemplate}
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #datepicker = null;

  #allOffers = null;
  #allDestinations = null;

  constructor(point, allOffers, allDestinations) {
    super();
    // if (!point) {
    //   point = BLANK_POINT;
    // }
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this._state = EditPointView.parsePointToState(point);

    this.#setInnerHandlers();
    this.#setFromDatepicker();
    this.#setToDatepicker();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      EditPointView.parseStateToPoint(point) //parsePointToState - parseStateToPoint
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitClickHandler(this._callback.formSubmit);
    this.setClickHandler(this._callback.click);
    this.setFormDeleteClickHandler(this._callback.formDelete);
    this.#setFromDatepicker();
    this.#setToDatepicker();
  };

  setFormSubmitClickHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click(EditPointView.parseStateToPoint(this._state));
  };

  setFormDeleteClickHandler = (callback) => {
    this._callback.formDelete = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.formDelete(EditPointView.parseStateToPoint(this._state));
  };

  #eventTypeToggleHandler = (evt) => {
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #eventOffersToggleHandler = (evt) => {
    if ( evt.target.classList.contains('event__offer-checkbox') ) {
      const isTrue = this._state.offers.includes(getNumberFromString(evt.target.id));
      const numberId = getNumberFromString(evt.target.id);

      this._setState({
        offers: !isTrue ? [...this._state.offers, numberId] : this._state.offers.filter((item) => item !== numberId),
      });
    }
  };

  #eventDestinationInputHandler = (evt) => {
    if (this.#allDestinations.map((dest) => dest.name).includes(evt.target.value)) {
      this.#allDestinations.forEach((dest) => {
        if (evt.target.value && dest.name === evt.target.value) {
          this.updateElement({
            destination: dest.id,
          });
        }
      });
    }
    else {
      evt.target.value = '';
    }
  };

  #dateStartHandler = ([userDateStart]) => {
    if (userDateStart > this._state.dateTo) {
      this.updateElement({
        dateFrom: userDateStart,
        dateTo: userDateStart,
      });
    }
    this.updateElement({
      dateFrom: userDateStart,
    });
  };

  #dateEndHandler = ([userDateEnd]) => {
    this.updateElement({
      dateTo: userDateEnd,
    });
  };

  #eventPriceChangeHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  #setFromDatepicker = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');
    this.#datepicker = flatpickr(
      dateStartInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateStartInput.value,
        dateFormat: 'd/m/y H:i',
        onClose: this.#dateStartHandler,
      },
    );
  };

  #setToDatepicker = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');
    const dateEndInput = this.element.querySelector('input[name="event-end-time"]');
    this.#datepicker = flatpickr(
      dateEndInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateEndInput.value,
        dateFormat: 'd/m/y H:i',
        minDate: dateStartInput.value,
        onClose: this.#dateEndHandler,
      },
    );
  };

  #setInnerHandlers = () => {
    // this.element.querySelector('.event__type-list').addEventListener('click', this.#eventTypeToggleHandler);
    Array.from(this.element.querySelectorAll('.event__type-input')).forEach((eventType) => eventType.addEventListener('click', this.#eventTypeToggleHandler));

    // this.element.querySelector('.event__section--offers').addEventListener('click', this.#eventOffersToggleHandler);
    Array.from(this.element.querySelectorAll('.event__offer-checkbox')).forEach((eventOffer) => eventOffer.addEventListener('change', this.#eventOffersToggleHandler));

    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#eventDestinationInputHandler);

    this.element.querySelector('#event-price-1').addEventListener('input', this.#eventPriceChangeHandler);
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    return point;
  };
}
