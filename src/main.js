import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );
const newTripEventButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new MainPresenter(tripMainElement, tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel, pointsModel);

const handleNewEventFormClose = () => {
  newTripEventButtonElement.disabled = false;
};

const handleNewEventButtonClick = () => {
  tripPresenter.createPoint(handleNewEventFormClose);
  newTripEventButtonElement.disabled = true;
};

newTripEventButtonElement.addEventListener('click', handleNewEventButtonClick);

tripPresenter.init();
filterPresenter.init();
