export class Tab {
  constructor(tab) {
    this.tab = tab;
    this.name = tab.dataset.name;
    this.addListener();
  }

  addListener() {
    this.tab.addEventListener('click', (event) => {
      this.removeTabActiveClass();
      this.selectTab(event);
    });
  }

  removeTabActiveClass() {
    document.querySelector('.tab-active').classList.remove('tab-active');
  }

  selectTab(event) {
    event.target.classList.add('tab-active');
    document.querySelector('form.visible').classList = '';
    document.querySelector(`#${this.name}`).classList.add('visible');
  }
}
