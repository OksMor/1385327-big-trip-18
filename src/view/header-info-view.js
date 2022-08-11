import { createElement } from '../render.js';

export default class HeaderInfoView {
  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

                <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
              </div>

              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
              </p>
            </section>`;
  }

  getElement() {
    if ( !this.element ) {
      this.element = createElement( this.getTemplate() );
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
