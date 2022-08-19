import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );

const pointsModel = new PointsModel();
const tripPresenter = new MainPresenter(tripMainElement, tripFiltersElement, tripEventsElement, pointsModel);

tripPresenter.init();
