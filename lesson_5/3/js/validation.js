/*
3**. Создать форму в html со следующими полями:
* Имя - текстовое поле
* Телефон - текстовое поле
* Пароль - поле типа password
* Повтор пароля - поле типа password
* Кнопка отправить форму

Необходимо реализовать валидацию этой формы по следующим правилам:

* Имя - должно содержать как минимум 1 символ, не более 50 символов.
* Телефон - должно содержать 11 цифр, не больше, не меньше.
* Пароль - минимум 5 символов, максимум 50.
* Повтор пароля - значение должно совпадать с полем пароль.
* Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при прохождении проверки, форма
отправляется, если проверка не была пройдена, то:
- Каждое поле, которое не прошло проверку должно выделяться красным цветом.
- Под каждым полем, что не прошло проверку, должна писаться подсказка по какой причине проверка провалилась.

Можете пользоваться стилями бутстрапа, если лень самим писать.
Пользоваться аттрибутами HTML5 запрещено, необходимо проверки реализовать с помощью javascript.
*/

"use strict";

/**
 * объект валидации:
 * @param {object} form форма, над которой проводится валидация
 */
const validation = {
  form: document.querySelector('form'),

  /**
   * запускает валидацию.
   * */
  run() {
    // устанавливаем обработчик событий.
    this.form.addEventListener('click', (event) => this.handler(event));
  },

  /**
   * Проводит валидацию формы, если успешно, то отправляет форму.
   * @param {object} event событие
   * */
  handler(event) {
    // отключаем отправление запроса до проверки
    event.preventDefault();
    // устанавливаем область срабатывания обработчика
    if (event.target.tagName === 'BUTTON') {
      let password, isName, isPhone, isPass1, isPass2;
      let inputs = document.querySelectorAll('input');

      // цикл по выбранным элементам
      for (let input of inputs) {
        // очистка выведенных ошибок (вынесена для избегания повторений)
        this.clearError(input);
        // ветвления на значения атрибутов
        switch (input.name) {
          case 'name':
            isName = this.nameValidator(input);
            break;
          case 'phoneNumber':
            isPhone = this.phoneValidator(input);
            break;
          case 'password1':
            password = input.value;
            isPass1 = this.password1Validator(input);
            break;
          case 'password2':
            isPass2 = this.password2Validator(input, password);
            break;
        }
      }
      // отправляем форму, если валидация успешна
      if (isName && isPhone && isPass1 && isPass2) {
        this.form.submit()
      }
    }
  },

  /**
   * Функция проводит валидацию input со значением атрибутa name: 'name'
   * Если валидация не успешна, то устанавливает красную границу элементу
   * и запускает функцию по отображению ошибки
   * @param {object} input html input
   * @return {boolean} true если валидация пройдена
   * */
  nameValidator(input) {
    const error = 'Имя должно содержать от 1 до 50 символов.';
    if (input.value.length === 0 || input.value.length >= 50) {
      input.style.borderColor = 'red';
      this.showError(error, input);
      return false;
    }
    input.style.borderColor = 'green';
    return true;
  },

  /**
   * Функция проводит валидацию input со значением атрибутa name: 'phoneNumber'
   * Если валидация не успешна, то устанавливает красную границу элементу
   * и запускает функцию по отображению ошибки
   * @param {object} input html input
   * @return {boolean} true если валидация пройдена
   * */
  phoneValidator(input) {
    const error = 'Номер должен состоять из 11 цифр';
    if (input.value.length !== 11 || +input.value < 0 || !Number.isInteger(+input.value)) {
      input.style.borderColor = 'red';
      this.showError(error, input);
      return false;
    }
    input.style.borderColor = 'green';
    return true;
  },

  /**
   * Функция проводит валидацию input со значением атрибутa name: 'password1'
   * Если валидация не успешна, то устанавливает красную границу элементу
   * и запускает функцию по отображению ошибки
   * @param {object} input html input
   * @return {boolean} true если валидация пройдена
   * */
  password1Validator(input) {
    const error = 'Пароль должен быть не менее 5 символов и не более 50. ';
    if (input.value.length < 5 || input.value.length >= 50) {
      input.style.borderColor = 'red';
      this.showError(error, input);
      return false;
    }
    input.style.borderColor = 'green';
    return true;
  },

  /**
   * Функция проводит валидацию input со значением атрибутa name: 'paswword2'
   * Если валидация не успешна, то устанавливает красную границу элементу
   * и запускает функцию по отображению ошибки
   * @param {object} input html input
   * @return {boolean} true если валидация пройдена
   * */
  password2Validator(input, password) {
    const error = 'Пароли не совпадают.';
    if (input.value.length === 0 || input.value !== password) {
      input.style.borderColor = 'red';
      this.showError(error, input);
      return false
    }
    input.style.borderColor = 'green';
    return true;
  },

  /**
   * Создает элемент div под соответствующий input
   * @param {string} error текст ошибки
   * @param {object} input элемент input
   * */
  showError(error, input) {
    let errorDiv = document.createElement('div');
    errorDiv.textContent = error;
    input.parentNode.appendChild(errorDiv);
  },

  /**
   * Очищает DOM от div с текстом ошибки
   * @param {object} input элемент input
   * */
  clearError(input) {
    let el = input.parentNode.querySelector('div');
    if (el !== null) {
      el.remove();
    }
  },
};

validation.run();