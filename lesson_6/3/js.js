/*
3*. Добавить в галерею функцию перехода к следующему изображению. По сторонам от большой картинки
должны быть стрелки “вперед” и “назад”, по нажатию на которые происходит замена изображения на
следующее или предыдущее.
*/
"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.errorImageSrc Путь до картики при ошибке открытия увеличенной картинки.
 * @property {string} settings.toPrevImg Класс для картинки прокрутить назад.
 * @property {string} settings.toPrevImgSrc Путь до картинки пркрутить назад.
 * @property {string} settings.toNextImg Класс для картинки прокрутить вперед.
 * @property {string} settings.toNextImgSrc Путь до картинки прокрутить вперел.
 * @property {null|Node} openedImageEl открытая картинка.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    errorImageSrc: 'images/error/error.jpg',
    toPrevImg: 'galleryWrapper__back',
    toPrevImgSrc: 'images/arrows/left.png',
    toNextImg: 'galleryWrapper__next',
    toNextImgSrc: 'images/arrows/right.png',
  },
  openedImageEl: null,

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // Сохряняем элемент - открытую картинку.
    this.openedImageEl = event.target;
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);
    image.onerror = (event) => this.openError(event);

    // Создаем картинку, для перехода к предыдущему изображению, ставим класс, src обработчик
    // и добавляем в контейнер-обертку
    const leftArrow = new Image();
    leftArrow.classList.add(this.settings.toPrevImg);
    leftArrow.src = this.settings.toPrevImgSrc;
    galleryWrapperElement.appendChild(leftArrow);
    leftArrow.addEventListener('click', () => this.setPrevImage());

    // Создаем картинку, для перехода к следующему изображению, ставим класс, src обработчик
    // и добавляем в контейнер-обертку
    const rightArrow = new Image();
    rightArrow.classList.add(this.settings.toNextImg);
    rightArrow.src = this.settings.toNextImgSrc;
    rightArrow.addEventListener('click', () => this.setNextImage());
    galleryWrapperElement.appendChild(rightArrow);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * обработка события ошибки загрузки картинки.
   */
  openError(event) {
    event.target.src = this.settings.errorImageSrc;
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  },

  /**
   * Открывает в контейнере-обертке следующую по расположению в HTML картинку.
   */
  setNextImage() {
    // Получаем элемент - открытую картинку
    const image = document.
    querySelector(`.${this.settings.openedImageWrapperClass}`).
    querySelector(`.${this.settings.openedImageClass}`);

    // Получаем следующую по расположению в HTML картинку
    const nextImage = this.openedImageEl.nextElementSibling;

    // Если получить следующий элемент возможно, то открытой картинке
    // присваевается src равный значению атрибута full_image_url следующей картинки,
    // openedImageEl присваевается следующая картинка.
    if (nextImage) {
      this.openImage(nextImage.dataset.full_image_url);
      this.openedImageEl = nextImage;
    // Если следующий элемент отсутствует, то открытой картинке
    // присваевается src равный значению атрибута full_image_url первой картинки в контейнере,
    // openedImageEl присваевается первая в контейнере картинка.
    } else {
      // Получаем контейнер в котором расположены картинки
      const previewSelector = document.querySelector(`${this.settings.previewSelector}`);
      this.openImage(previewSelector.firstElementChild.dataset.full_image_url);
      this.openedImageEl = previewSelector.firstElementChild;
    }
  },

  /**
   * Открывает в контейнере-обертке предыдущую по расположению в HTML картинку.
   */
  setPrevImage() {
    // Получаем элемент - открытую картинку
    const image = document.
    querySelector(`.${this.settings.openedImageWrapperClass}`).
    querySelector(`.${this.settings.openedImageClass}`);

    // Получаем предыдущую по расположению в HTML картинку
    const previousImage = this.openedImageEl.previousElementSibling;

    // Если получить предыдущий элемент возможно, то открытой картинке
    // присваевается src равный значению атрибута full_image_url предыдущей картинки,
    // openedImageEl присваевается предыдущая картинка.
    if (previousImage) {
      this.openImage(previousImage.dataset.full_image_url);
      this.openedImageEl = previousImage;
    // Если предыдущий элемент отсутствует, то открытой картинке
    // присваевается src равный значению атрибута full_image_url последней картинки в контейнере,
    // openedImageEl присваевается последняя в контейнере картинка.
    } else {
      // Получаем контейнер в котором расположены картинки
      const previewSelector = document.querySelector(`${this.settings.previewSelector}`);
      this.openImage(previewSelector.lastElementChild.dataset.full_image_url);
      this.openedImageEl = previewSelector.lastElementChild;
    }
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});