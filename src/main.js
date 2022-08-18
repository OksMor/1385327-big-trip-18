import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );

const pointModel = new PointsModel();
const headerPresenter = new HeaderPresenter();
const tripPresenter = new TripPresenter();

headerPresenter.init( tripMainElement, tripFiltersElement );
tripPresenter.init( tripEventsElement, pointModel );
