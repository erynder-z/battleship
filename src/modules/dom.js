const renderBoard = (p1Board, pAIBoard, player1, playerAI) => {
  const p1board = p1Board;
  const pAIboard = pAIBoard;
  const p1 = player1;
  const pAI = playerAI;
  const p1Grid = document.getElementById('p1Board');
  const pAIGrid = document.getElementById('pAIBoard');

  const createGrids = (p1board, pAIboard) => {
    p1Grid.innerHTML = '';
    pAIGrid.innerHTML = '';
    // create 10 rows
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row-p1');
      row.setAttribute('id', `p1-row${i}`);
      p1Grid.appendChild(row);
      // fill the rows with one div for each object in the board
      p1board[i].forEach((element, j) => {
        const field = document.createElement('div');
        field.classList.add('field-p1');
        field.setAttribute('id', `p1-row${i}-field${j}`);
        if (element.occupied === true) {
          field.classList.add('p1-ship');
        }
        if (element.hit === true && element.occupied === true) {
          field.classList.add('hit');
        }
        if (element.hit === true && element.occupied === false) {
          field.classList.add('miss');
        }
        field.addEventListener('click', () => {
          // place ship
        });
        row.appendChild(field);
      });
    }
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row-pAI');
      row.setAttribute('id', `pAI-row${i}`);
      pAIGrid.appendChild(row);

      pAIboard[i].forEach((element, j) => {
        const field = document.createElement('div');
        field.classList.add('field-pAI');
        field.setAttribute('id', `pAI-row${i}-field${j}`);
        if (element.occupied === true) {
          field.classList.add('pAI-ship');
        }
        if (element.hit === true && element.occupied === true) {
          field.classList.add('hit');
        }
        if (element.hit === true && element.occupied === false) {
          field.classList.add('miss');
        }
        field.addEventListener('click', () => {
          // attack field
          const vert = element.vertical;
          const horiz = element.horizontal;
          p1.attack([vert, horiz]);
          if (
            field.classList.contains('miss') === false &&
            field.classList.contains('hit') === false
          ) {
            const move = (() => {
              renderBoard(p1Board, pAIBoard, p1, pAI);
              pAI.attack(pAI.getRandomPosition());
              renderBoard(p1Board, pAIBoard, p1, pAI);
            })();
          }

          if (element.occupied === true) {
            field.classList.add('hit');
          } else {
            field.classList.add('miss');
          }
        });
        row.appendChild(field);
      });
    }
    return { p1, pAI };
  };

  createGrids(p1board, pAIboard);
};

export default renderBoard;
