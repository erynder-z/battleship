import renderBoard from './dom';
import { runGame } from './game';
import { getCoordinates } from './helpers';

const p1info = document.getElementById('p1info');

const activatePlacementButtons = (p1Board, pAIBoard, player1, playerAI) => {
  const alignmentBtn = document.getElementById('alignment');
  const carrierBtn = document.getElementById('carrier');
  const battleshipBtn = document.getElementById('battleship');
  const cruiserBtn = document.getElementById('cruiser');
  const submarineBtn = document.getElementById('submarine');
  const destroyerBtn = document.getElementById('destroyer');

  alignmentBtn.addEventListener('click', () => {
    if (alignmentBtn.innerText === 'horizontal') {
      alignmentBtn.innerText = 'vertical';
    } else if (alignmentBtn.innerText === 'vertical') {
      alignmentBtn.innerText = 'horizontal';
    }
  });

  carrierBtn.addEventListener('click', () => {
    placePlayerShips(carrierBtn.innerText.toLowerCase(), 5, carrierBtn);
  });

  battleshipBtn.addEventListener('click', () => {
    placePlayerShips(battleshipBtn.innerText.toLowerCase(), 4, battleshipBtn);
  });

  cruiserBtn.addEventListener('click', () => {
    placePlayerShips(cruiserBtn.innerText.toLowerCase(), 3, cruiserBtn);
  });

  submarineBtn.addEventListener('click', () => {
    placePlayerShips(submarineBtn.innerText.toLowerCase(), 2, submarineBtn);
  });

  destroyerBtn.addEventListener('click', () => {
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
          btn.remove();
        } else {
          alert('unable to place here. try again!');
          return;
        }

        if (p1Board.myFleet.length === 5) {
          alignmentBtn.remove();
        }

        renderBoard(p1Board, pAIBoard, player1, playerAI);
      });
    });
  };
};

const activateResetButton = () => {
  const resetBtn = document.getElementById('reset');

  resetBtn.addEventListener('click', () => {
    runGame();
    p1info.innerText = '';
  });
};

export { activatePlacementButtons, activateResetButton };
