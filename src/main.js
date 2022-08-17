import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import PointModel from './model/point-model.js';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );

const pointModel = new PointModel();
const headerPresenter = new HeaderPresenter();
const tripPresenter = new TripPresenter();

headerPresenter.init( tripMainElement, tripFiltersElement );
tripPresenter.init( tripEventsElement, pointModel );
