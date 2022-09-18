import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../utils/trip-utils.js';

const createInfoTemplate = (tripInfo) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo.tripTitle}</h1>

      <p class="trip-info__dates">${humanizeDate(tripInfo.tripDateFrom)} — ${humanizeDate(tripInfo.tripDateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfo.tripCost}</span>
    </p>
  </section>`
);

export default class HeaderInfoView extends AbstractView { // ДОРАБОТАТЬ если начало и конец в одном месяце, то указываем только в первом
  #tripInfo = null;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }

  get template() {
    return createInfoTemplate(this.#tripInfo);
  }
}
