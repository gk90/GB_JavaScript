/*
2*. Заполнить созданную таблицу фигурами, фигуры должны выглядеть как картинки,
либо можно использовать символы (существуют символы шахматных фигур) причем все
фигуры должны стоять на своих местах и быть соответственно черными и белыми.
*/
"use strict";

/**
 * Массив хранит объекты фигур, где:
 * @param {string} figure символ фигуры;
 * @param {array} position координаты на доске
 * @param {string} color цвет
 */
const chessFigures = [
  {
    figure: '♙',
    position: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2' ],
    color: 'black'
  },
  {
    figure: '♖',
    position: ['A1', 'H1'],
    color: 'black'
  },
  {
    figure: '♘',
    position: ['B1', 'G1'],
    color: 'black'
  },
  {
    figure: '♗',
    position: ['C1', 'F1'],
    color: 'black'
  },
  {
    figure: '♕',
    position: ['E1'],
    color: 'black'
  },
  {
    figure: '♔',
    position: ['D1'],
    color: 'black'
  },
  {
    figure: '♟',
    position: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7' ],
    color: 'white'
  },
  {
    figure: '♜',
    position: ['A8', 'H8'],
    color: 'white'
  },
  {
    figure: '♞',
    position: ['B8', 'G8'],
    color: 'black'
  },
  {
    figure: '♝',
    position: ['C8', 'F8'],
    color: 'black'
  },
  {
    figure: '♛',
    position: ['E8'],
    color: 'black'
  },
  {
    figure: '♚',
    position: ['D8'],
    color: 'black'
  },
];

/**
 * Объект шахматная доска, хранит свойства и методы связанные с доской
 * @param {object} container элементы DOM с классом chess
 * @param {int} rows количество рядов
 * @param {int} cols количество колонок
 * @param {array} letters буквы для обозначения колонок
 */
const chessBoard = {
  container: document.getElementById('chess'),
  rows: 10,
  cols: 10,
  letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],

  /**
   * функция инициализацирует остальные методы объекта
   */
  init() {
    this.drawBoard();
  },

  /**
   * функция отрисовывает игровое поле
   */
  drawBoard() {
    // цикл для генерации рядов
    for (let i = 0; i < this.rows; i++) {
      let tr = this.container.appendChild(document.createElement('tr'));

      // цикл для генерации колонок
      for (let j = 0; j < this.cols; j++) {
        let td = document.createElement('td');
        tr.appendChild(td);

        // ветвления для генерации неигровых ячеек
        if (i > 0 && i < this.rows - 1) {
          if (j === 0 || j === this.cols - 1) {
            td.textContent = this.rows - 1 - i;
            continue;
          }
        } else {
          if (j !== 0 || j !== this.cols - 1) {
            td.textContent = this.letters[j - 1];
            continue;
          }
        }
        // герерируем атрибуты позиции ячеек
        td.setAttribute('data-position',  (this.letters[j - 1]) + (this.rows - 1 - i));

        // определяем должна ли закрашиваться ячейка
        if ((i + j) % 2 !== 0) {
          td.style.backgroundColor = 'grey';
        }
      }
    }
  },
};

/**
 * объект игры, здесь хранятся свойства и методы, связанные с игрой в целом.
 * @param {object} chessBoard объект игровое поле
 * @param {object} chessFigures объект фигуры
 */
const game = {
  chessBoard,
  chessFigures,

  // запускает игру
  run() {
    this.chessBoard.init();
    this.placeFigures();
  },

  /**
   * Функция размещает фигуры на игровом поле
   */
  placeFigures() {
    const board = this.chessBoard.container;
    // выбор элементов DOM td
    const cells = board.querySelectorAll('td');
    // цикл по элементам cells
    for (let cell of cells) {
      // условие опередляет наличие атрибута позиции у cell
      if (cell.hasAttribute('data-position')) {
        // цикл по массиву шахматных фигур
        for (let figure of this.chessFigures) {
          // цикл по массиву позиций figure
          for (let position of figure.position) {
            // условие для размещения фигуры
            if (cell.getAttribute('data-position') === position) {
              cell.textContent = figure.figure;
              break;
            }
          }
        }
      }
    }
  },
};

game.run();