import { Tab } from './tabSelector.js';
import { DateCalc } from './datecalc.js';
import { Timer } from './timer.js';

import '../css/style.css';
import '../media/alarm.mp3';
import '../images/schedule.png';

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => new Tab(tab));

new DateCalc(document.getElementById('datecalc'));
new Timer(document.getElementById('timer'));
