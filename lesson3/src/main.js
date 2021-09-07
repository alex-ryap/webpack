import './style.scss';
import { items } from './data.js';
import { createTemplate } from './utils';

items.forEach((item) => {
  createTemplate(item);
});
