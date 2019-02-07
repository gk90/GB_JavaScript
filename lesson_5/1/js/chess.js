/*
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
*/
"use strict";

/**
 * Объект шахматная доска, хранит свойства и методы связанные с доской
 * @param {object} container элементы DOM с классом chess
 * @param {int} rows количество рядов
 * @param {int} cols количество колонок
 */
const chessBoard = {
  container: document.getElementById('chess'),
  rows: 10,
  cols: 10,

  /**
   * функция отрисовывает игровое поле
   */
  drawBoard() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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
            td.textContent = letters[j - 1];
            continue;
          }
        }

        // определяем должна ли закрашиваться ячейка
        if ((i + j) % 2 !== 0) {
          td.style.backgroundColor = 'grey';
        }
      }
    }
  },
};

chessBoard.drawBoard();