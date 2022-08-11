import HeaderInfoView from '../view/header-info-view.js';
import HeaderFiltersView from '../view/header-filters-view.js';
import { render } from '../render.js';

export default class HeaderPresenter {

  init = ( infoContainer, filterContainer ) => {
    this.infoContainer = infoContainer;
    this.filterContainer = filterContainer;

    render( new HeaderInfoView, this.infoContainer, 'afterbegin' );
    render( new HeaderFiltersView, this.filterContainer );
  };
}
