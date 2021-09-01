import { formatErr, formatRes } from './common.js';
import { DateTime } from 'luxon';

export class Timer {
  constructor(form) {
    this.form = form;
    this.btn = document.querySelector(`.${form.id}-btn`);
    this.result = document.querySelector(`#${form.id}__result`);
    this.timer = null;
    this.addListener();
    this.loadAudio();
  }

  addListener() {
    this.form.addEventListener('submit', this.handleTimer);
  }

  loadAudio() {
    this.audio = new Audio('../media/alarm.mp3');
    this.audio.loop = true;
  }

  handleTimer = (event) => {
    event.preventDefault();
    this.result.innerHTML = '';

    const timeAlarm = this.getAlarmTime(event.target.elements);

    if (timeAlarm) {
      if (this.timer) {
        this.btn.innerHTML = 'Старт';
        this.audio.pause();

        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.btn.innerHTML = 'Стоп';
        this.result.innerHTML = formatRes(
          this.formatTimer(...this.calcLostTime(timeAlarm))
        );
        this.tick(timeAlarm);
      }
    } else {
      this.result.innerHTML = formatErr('Необходимо установить время');
    }
  };

  tick(timeAlarm) {
    this.timer = setInterval(() => {
      const timeNow = new Date(Date.now());
      if (timeNow < timeAlarm) {
        this.result.innerHTML = formatRes(
          this.formatTimer(...this.calcLostTime(timeAlarm))
        );
      } else {
        console.log('ALARM');
        this.result.innerHTML = formatRes(this.formatTimer(0, 0, 0));
        clearInterval(this.timer);
        this.audio.play();
      }
    }, 1000);
  }

  calcLostTime(time) {
    const timeNow = new Date(Date.now());
    const firstDate = DateTime.fromJSDate(timeNow);
    const secondDate = DateTime.fromJSDate(time);

    let result = secondDate
      .diff(firstDate, ['hours', 'minutes', 'seconds'])
      .toObject();

    return [result.hours, result.minutes, Math.round(result.seconds)];
  }

  formatTimer(hours, minutes, seconds) {
    return `${hours < 10 ? '0' + hours : hours}:
            ${minutes < 10 ? '0' + minutes : minutes}:
            ${seconds < 10 ? '0' + seconds : seconds}`;
  }

  getAlarmTime(elements) {
    let { hours, minutes, seconds } = elements;
    hours = +hours.value;
    minutes = +minutes.value;
    seconds = +seconds.value;

    if (hours || minutes || seconds) {
      let currentTime = new Date(Date.now());
      currentTime.setHours(currentTime.getHours() + hours);
      currentTime.setMinutes(currentTime.getMinutes() + minutes);
      currentTime.setSeconds(currentTime.getSeconds() + seconds);

      return currentTime;
    }

    return false;
  }
}
