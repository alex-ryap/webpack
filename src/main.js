import { Tab } from './tabSelector.js';
import { DateCalc } from './datecalc.js';
import { Timer } from './timer.js';

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => new Tab(tab));

new DateCalc(document.getElementById('datecalc'));
new Timer(document.getElementById('timer'));
