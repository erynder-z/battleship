import renderBoard from './dom';
import { getCoordinates } from './helpers';

const activatePlacementButtons = (p1Board, pAIBoard, player1, playerAI) => {
  const boardContainer = document.querySelector('.board-container');
  const p1info = document.getElementById('p1info');
  const fleetHeading = document.querySelector('.fleet-heading');
  const pAIContainer = document.querySelector('.pAI-container');
  const alignmentBtn = document.getElementById('alignment');
  /* const p1FleetContainer = document.querySelector('.p1-fleet-container'); */
  const p1Fleet = document.querySelector('.p1-fleet-wrapper');
  const carrierBtn = document.getElementById('carrierButton');
  const battleshipBtn = document.getElementById('battleshipButton');
  const cruiserBtn = document.getElementById('cruiserButton');
  const submarineBtn = document.getElementById('submarineButton');
  const destroyerBtn = document.getElementById('destroyerButton');

  alignmentBtn.addEventListener('click', () => {
    if (alignmentBtn.innerText === 'horizontal') {
      alignmentBtn.innerText = 'vertical';
    } else if (alignmentBtn.innerText === 'vertical') {
      alignmentBtn.innerText = 'horizontal';
    }
  });

  carrierBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(carrierBtn.innerText.toLowerCase(), 5, carrierBtn);
  });

  battleshipBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(battleshipBtn.innerText.toLowerCase(), 4, battleshipBtn);
  });

  cruiserBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(cruiserBtn.innerText.toLowerCase(), 3, cruiserBtn);
  });

  submarineBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(submarineBtn.innerText.toLowerCase(), 3, submarineBtn);
  });

  destroyerBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(destroyerBtn.innerText.toLowerCase(), 2, destroyerBtn);
  });

  const placePlayerShips = (shipname, length, btn) => {
    p1info.innerText = `place your ${shipname}`;
    const fields = document.querySelectorAll('.field-p1');
    fields.forEach((field) => {
      const vert = parseInt(field.id[6]);
      const horiz = parseInt(field.id[field.id.length - 1]);
      const pos = [vert, horiz];
      field.addEventListener('click', () => {
        const align = document.getElementById('alignment').textContent;
        p1Board.placeShip(
          shipname,
          length,
          getCoordinates(shipname, align, pos, p1Board)
        );

        if (p1Board.myFleet.some((element) => element.type === shipname)) {
          p1info.innerText = '';
          btn.classList.add('hidden');
          const element = document.getElementById(`${shipname}`);
          element.classList.add('placed');
        } else {
          alert('unable to place here. try again!');
          return;
        }

        if (p1Board.myFleet.length === 5) {
          alignmentBtn.classList.add('hidden');
          pAIContainer.classList.remove('hidden');
          p1Fleet.classList.add('fleet-set');
          boardContainer.classList.add('board-set');
          fleetHeading.classList.add('hidden');
        }

        renderBoard(p1Board, pAIBoard, player1, playerAI);
      });

      field.addEventListener('mouseover', () => {
        hoverEffect(pos);
      });
      field.addEventListener('mouseout', () => {
        hoverEffect(pos);
      });

      function hoverEffect(pos) {
        const align = document.getElementById('alignment').textContent;
        const position = [...pos];
        const claimed = [];

        if (align === 'horizontal') {
          for (let i = 0; i < length; i++) {
            const addition = position[1] + 1;
            const arr = position.splice(1, 1, addition);
            claimed.push([position[0], arr[0]]);
          }
        } else if (align === 'vertical') {
          for (let i = 0; i < length; i++) {
            const addition = position[0] + 1;
            const arr = position.splice(0, 1, addition);
            claimed.push([arr[0], position[1]]);
          }
        }
        claimed.length = length;

        claimed.forEach((item) => {
          const vertical = item[0];
          const horizontal = item[1];
          const board = document.querySelector('.grid-p1');
          const row = board.querySelector(`#p1-row${vertical}`);
          if (vertical <= 9 && horizontal <= 9) {
            const element = row.querySelector(
              `#p1-row${vertical}-field${horizontal}`
            );
            element.classList.toggle('hover');
          }
        });
      }
    });
  };
};

const activateResetButton = () => {
  const resetBtn = document.getElementById('reset');

  resetBtn.addEventListener('click', () => {
    location.reload();
  });
};

export { activatePlacementButtons, activateResetButton };
