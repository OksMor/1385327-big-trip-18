import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { slashesFullDate } from '../utils/trip-utils.js';
import { getNumberFromString } from '../utils/common.js';
import { POINT_TYPES, DESTINATION_NAMES } from '../mock/const.js'; //DESTINATION_NAMES

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

const createDestinationsTemplate = (destinationName) => (
  `
    ${destinationName.map((destination) => `<option value="${destination.name}"></option>`).join('')}
  `
);

const createDestinationPhotosTemplate = (currentDestination) => (
  `
    ${currentDestination.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('')}
  `
);

// const createOfferTemplate = (offer) => {
//   const prefix = offer.title.toLowerCase().replace(' ', '-');
//   return `
//     <div class="event__offer-selector">
//       <input class="event__offer-checkbox  visually-hidden"
//           id="event-offer-${prefix}-${offer.id}"
//           type="checkbox"
//           name="event-offer-${prefix}"
//       >
//       <label class="event__offer-label" for="event-offer-${prefix}-${offer.id}">
//         <span class="event__offer-title">${offer.title}</span>
//         &plus;&euro;&nbsp;
//         <span class="event__offer-price">${offer.price}</span>
//       </label>
//     </div>
//   `;
// };
// const createOffersTemplate = (offersData) => offersData.map(createOfferTemplate(offersData)).join('');

const createOffersTemplate = (allOffers) => {
  const availableOffers = allOffers.offers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
      id="event-offer-${offer.title.toLowerCase()}-1"
      data-offer-id="${offer.id}"
      type="checkbox"
      name="event-offer-${offer.title.toLowerCase()}">
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `).join('');
  return availableOffers;
};

const createEventEditTemplate = (data) => {
  const {type, offers, dateFrom, dateTo, basePrice, destination, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination } = data;
  console.log('data Template!!!', data);
  console.log('offers Template', offers);
  console.log('allOffers Temp', allOffers);
  console.log('currentOffers Temp', currentOffers);
  console.log('selectedOffers Temp', selectedOffers);
  console.log('allDestinations Temp', allDestinations);
  console.log('currentDestination Temp', currentDestination);

  const dateFromSlashes = dateFrom !== null
    ? slashesFullDate(dateFrom)
    : '';

  const dateToSlashes = dateTo !== null
    ? slashesFullDate(dateTo)
    : '';

  const buttonEditTemplate = Object.keys(data).length !== 0
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  const eventTypesTemplate = createEventTypesTemplate(POINT_TYPES, type);

  const offersTemplate = createOffersTemplate(data);

  const destinationsTemplate = createDestinationsTemplate(DESTINATION_NAMES);//DESTINATION_NAMES
  const destinationPhotosTemplate = createDestinationPhotosTemplate(data);
  // const tripDestination = destinations.find((pointDestination) => (pointDestination.id === destination));

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
          <button class="event__reset-btn" type="reset">${Object.keys(data).length === 0 ? 'Cancel' : 'Delete'}</button> ${buttonEditTemplate}
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

export default class EditPointView extends AbstractStatefulView {

  constructor(point = BLANK_POINT, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination) {
    super();
    this._state = EditPointView.parsePointToState(point, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination);
    this.#setInnerHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#changeTypePoint );
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#changeOffer );
    this.element.querySelector('#event-destination-1' ).addEventListener( 'change', this.#changeDestination );

    this.element.querySelector('#event-start-time-1').addEventListener('input', this.#dateFromInputHandler);
    this.element.querySelector('#event-end-time-1').addEventListener('input', this.#dateToInputHandler);
    this.element.querySelector('#event-price-1').addEventListener('input', this.#priceInputHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    // this._callback.formSubmit(this.#point);
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setClickHandler(this._callback.click);
  };

  #changeTypePoint = ( evt ) => {
    if ( evt.target.classList.contains('event__type-input') ) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #changeOffer = ( evt ) => {
    if ( evt.target.classList.contains('event__offer-checkbox') ) {
      const isTrue = this._state.offers.includes(getNumberFromString( evt.target.id ));
      const numberId = getNumberFromString( evt.target.id );

      this._setState({
        offers: !isTrue ? [...this._state.offers, numberId] : this._state.offers.filter(( item ) => item !== numberId ),
      });
    }
  };

  #changeDestination = ( evt ) => {
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #dateFromInputHandler = (evt) => {
    this._setState({
      dateFrom: evt.target.value
    });
  };

  #dateToInputHandler = (evt) => {
    this._setState({
      dateTo: evt.target.value
    });
  };

  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: evt.target.value
    });
  };

  reset = ( point ) => {
    this.updateElement(
      EditPointView.parsePointToState( point )
    );
  };

  static parsePointToState = (point, allOffers, currentOffers, selectedOffers, allDestinations, currentDestination) => ({
    ...point,
    allOffers: allOffers,
    currentOffers: currentOffers,
    selectedOffers: selectedOffers,
    allDestinations: allDestinations,
    currentDestination: currentDestination});

  static parseStateToPoint = (state) => {
    const point = { ...state };

    delete point.allOffers;
    delete point.currentOffers;
    delete point.selectedOffers;
    delete point.allDestinations;
    delete point.currentDestination;

    return point;
  };
}
