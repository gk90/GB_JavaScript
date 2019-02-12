/*
2. Реализовать модуль корзины. У каждого товара есть кнопка «Купить», при нажатии на которую
происходит добавление имени и цены товара в блок корзины. Корзина должна уметь считать
общую сумму заказа. Один товар можно добавить несколько раз.
*/
"use strict";

/**
 * объект корзины, здесь хранятся её свойства и методы.
 * @param {object} settings настройки корзины.
 * @param {array} goods массив для добавления товаров.
 * @param {int} price цена товара.
 * @param {number} count количество товара.
 */
const basket = {
  settings: {
    countSelector: '#basket-count',
    priceSelector: '#basket-price',
  },
  goods: [],
  price: 0,
  count: 0,

  /**
   * Метод инициализации корзины.
   * @param {object} settings пользовательские значения для корзины.
   */
  init(settings = {}) {
    Object.assign(this.settings, settings);
    this.addHandlers();
    this.render();
  },

  /**
   * Метод отрисовывает значения количества товара и значения стоимости в html.
   */
  render() {
    document.querySelector(`${this.settings.countSelector}`).textContent = this.count;
    document.querySelector(`${this.settings.priceSelector}`).textContent = this.price;
  },

  /**
   * Вызывает методы устнаовки обработчиков для разных событий на различные buttons
   */
  addHandlers() {
    const buyBtn = document.querySelectorAll('.buy-btn');
    const removeBtn = document.querySelectorAll('.remove-btn');
    const clearBasket = document.querySelector('#remove-all-btn');
    // вызов метода для установки обработчиков для всех button купить
    this.addListenersForBuy(buyBtn);
    // вызов метода для установки обработчиков для всех button удалить
    this.addListenersForRemove(removeBtn);
    // Обработчик для button очистить корзину
    clearBasket.addEventListener('click', () => this.buttonRemoveAllHandler());
  },

  /**
   * Метод для установки обработчиков на каждую клавишу button купить
   * @param {NodeList} buttons все клавиши купить
   */
  addListenersForBuy(buttons) {
    for (let button of buttons) {
      button.addEventListener('click', (event) => this.buttonBuyClickHandler(event));
    }
  },

  /**
   * Метод для установки обработчиков на каждую клавишу button удалить
   * @param {NodeList} buttons все клавиши удалить
   */
  addListenersForRemove(buttons) {
    for (let button of buttons) {
      button.addEventListener('click', (event) => this.buttonRemoveClickHandler(event));
    }
  },

  /**
   * Обработчик событий при нажатии на button купить
   * @param {MouseEvent} event событие клика
   * */
  buttonBuyClickHandler(event) {
    let goodName = event.target.dataset.name;
    let goodPrice = event.target.dataset.price;
    // вызываем метод добавляющий товар в массив goods.
    this.addGoods(goodName, +goodPrice);
    // отрисовываем вновь полученные значения.
    this.render();
  },

  /**
   * Обработчик событий при нажатии на button удалить
   * @param {MouseEvent} event событие клика
   * */
  buttonRemoveClickHandler(event) {
    let goodName = event.target.dataset.name;
    this.removeGoods(goodName);
    this.render();
  },

  /**
   * Очищает корзину от товаров и обнуляет значения стоимости и количества.
   */
  buttonRemoveAllHandler() {
    this.goods = [];
    this.price = 0;
    this.count = 0;
    this.render();
  },

  /**
   * добавляет товары в массив this.goods
   * @param {string} good имя товара,
   * @param {int} price стоимость товара.
   */
  addGoods(good, price) {
    this.goods.push({'name': good, 'price': price});
    this.setCount();
    this.setPrice();
  },

  /**
   * удаляет товары из массива this.goods
   * @param {string} good имя товара,
   */
  removeGoods(good) {
    for (let i in this.goods) {
      if (this.goods[i].name === good) {
        this.goods.splice(i, 1);
        break;
      }
    }
    this.setCount();
    this.setPrice();
  },

  /**
   * Устанавливает this.count равной количеству товаров в массиве goods
   */
  setCount() {
    this.count = this.goods.length;
  },

  /**
   * Устанавливает this.price равной сумме стоимостей всех товаров в массиве this.goods/
   */
  setPrice() {
    let sum = 0;
    for (let good of this.goods)
      sum += good.price;
    this.price = sum;
  },
};

window.onload = () => basket.init({});