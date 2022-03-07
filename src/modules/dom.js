const renderBoard = (p1Board, pAIBoard) => {
  const p1 = p1Board;
  const pAI = pAIBoard;
  const p1Grid = document.getElementById('p1Board');
  const pAIGrid = document.getElementById('pAIBoard');

  const createGrids = (p1, pAI) => {
    // create 10 rows
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row-p1');
      row.setAttribute('id', `p1-row${i}`);
      p1Grid.appendChild(row);
      // fill the rows with one div for each object in the board
      p1[i].forEach((element, j) => {
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

      pAI[i].forEach((element, j) => {
        const field = document.createElement('div');
        field.classList.add('field-pAI');
        field.setAttribute('id', `pAI-row${i}-field${j}`);
        if (element.occupied === true) {
          field.classList.add('pAI-ship');
        }
        field.addEventListener('click', () => {
          // attack field
          const vert = element.vertical;
          const horiz = element.horizontal;
          pAI.recieveAttack([vert, horiz]);
          if (element.occupied === true) {
            field.classList.add('hit');
          } else {
            field.classList.add('miss');
          }
        });
        row.appendChild(field);
      });
    }
  };

  createGrids(p1, pAI);
};

export default renderBoard;
