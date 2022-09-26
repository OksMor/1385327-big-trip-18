import PointsApiService from './points-api-service.js';

import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const AUTHORIZATION = 'Basic lsa22S2fla2f4w4w1s2j2sS4l1j1';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );
const newTripEventButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel( new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(tripMainElement, tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel, pointsModel);

const handleNewEventFormClose = () => {
  newTripEventButtonElement.disabled = false;
};

const handleNewEventButtonClick = () => {
  mainPresenter.createPoint(handleNewEventFormClose);
  newTripEventButtonElement.disabled = true;
};

mainPresenter.init();
filterPresenter.init();
pointsModel.init().finally(() => {
  handleNewEventFormClose();
  newTripEventButtonElement.addEventListener('click', handleNewEventButtonClick);
});
