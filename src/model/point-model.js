import { generatePoint } from '../mock/point.js';

export default class PointModel {
  point = Array.from({length: 5}, generatePoint);

  getPoint = () => this.point;
}
