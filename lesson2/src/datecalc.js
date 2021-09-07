import { formatErr, formatRes } from './common.js';
import { DateTime } from 'luxon';

export class DateCalc {
  constructor(form) {
    this.form = form;
    this.result = document.querySelector(`#${form.id}__result`);
    this.addListener();
  }

  addListener() {
    this.form.addEventListener('submit', this.handleCalcDates);
  }

  handleCalcDates = (event) => {
    event.preventDefault();
    this.result.innerHTML = '';

    const { firstDate, secondDate } = this.getDates(event.target.elements);

    if (firstDate && secondDate) {
      this.result.innerHTML = formatRes(
        this.formatDiff(this.diffDates(firstDate, secondDate))
      );
    } else {
      this.result.innerHTML = formatErr(
        'Для рассчетов необходимо ввести 2 даты'
      );
    }
  };

  diffDates(firstDate, secondDate) {
    firstDate = DateTime.fromISO(firstDate);
    secondDate = DateTime.fromISO(secondDate);

    if (firstDate > secondDate) {
      [firstDate, secondDate] = [secondDate, firstDate];
    }

    return secondDate.diff(firstDate, ['years', 'months', 'days']).toObject();
  }

  formatDiff(diff) {
    let result = '';
    if (diff.years) {
      result += diff.years + ' г. ';
    }
    if (diff.months) {
      result += diff.months + ' мес. ';
    }
    if (diff.days) {
      result += diff.days + ' дн.';
    }

    return result;
  }

  getDates(elements) {
    const { firstDate, secondDate } = event.target.elements;
    return {
      firstDate: firstDate.value,
      secondDate: secondDate.value,
    };
  }
}
