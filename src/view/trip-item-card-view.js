import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, hoursMinutesDate, yearMonthDate, fullDate, eventDuration } from '../utils/trip-utils.js';

const createOfferTemplate = (offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `;

const createOffersTemplate = (offers) => offers.map(createOfferTemplate).join('');

const createCardTemplate = (point) => {
  const {basePrice, type, dateFrom, dateTo, destination, isFavorite, offers} = point;

  const dateHum = dateFrom !== null ? humanizeDate(dateFrom) : '';
  const dateYMD = dateFrom !== null ? yearMonthDate(dateFrom) : '';
  const dateFromHM = dateFrom !== null ? hoursMinutesDate(dateFrom) : '';
  const dateToHM = dateTo !== null ? hoursMinutesDate(dateTo) : '';
  const dateFromFull = dateFrom !== null ? fullDate(dateFrom) : '';
  const dateToFull = dateTo !== null ? fullDate(dateTo) : '';

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateYMD}">${dateHum}</time> <!--MAR 18-->
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFromFull}">${dateFromHM}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateToFull}">${dateToHM}</time>
        </p>
        <p class="event__duration">${eventDuration(dateTo, dateFrom)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class TripItemCardView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createCardTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.favoriteClick();
  };

}
