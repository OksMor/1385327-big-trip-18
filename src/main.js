import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import HeaderFiltersView from './view/header-filters-view.js';
import { generateFilter } from './mock/filter.js';
import { render } from './framework/render.js';

const tripMainElement = document.querySelector( '.trip-main' );
const tripFiltersElement = tripMainElement.querySelector( '.trip-controls__filters' );
const tripEventsElement = document.querySelector( '.trip-events' );

const pointsModel = new PointsModel();
const tripPresenter = new MainPresenter(tripMainElement, tripEventsElement, pointsModel);

const filters = generateFilter(pointsModel.points);

render( new HeaderFiltersView(filters), tripFiltersElement );

tripPresenter.init();
