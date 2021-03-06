import renderBoard from './dom';
import { getCoordinates } from './helpers';

const activatePlacementButtons = (p1Board, pAIBoard, player1, playerAI) => {
  const boardContainer = document.querySelector('.board-container');
  const p1info = document.getElementById('p1info');
  const fleetHeading = document.querySelector('.fleet-heading');
  const pAIContainer = document.querySelector('.pAI-container');
  const infoContainer = document.getElementById('infoContainer');
  const alignmentBtn = document.getElementById('alignment');
  const p1Fleet = document.querySelector('.p1-fleet-wrapper');
  const carrierBtn = document.getElementById('carrierButton');
  const battleshipBtn = document.getElementById('battleshipButton');
  const cruiserBtn = document.getElementById('cruiserButton');
  const submarineBtn = document.getElementById('submarineButton');
  const destroyerBtn = document.getElementById('destroyerButton');

  infoContainer.addEventListener('click', () => {
    if (alignmentBtn.innerText === 'horizontal') {
      alignmentBtn.innerText = 'vertical';
      infoContainer.classList.toggle('vert');
    } else if (alignmentBtn.innerText === 'vertical') {
      alignmentBtn.innerText = 'horizontal';
      infoContainer.classList.toggle('vert');
    }
  });

  carrierBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(carrierBtn.parentNode.id.toLowerCase(), 5, carrierBtn);
  });

  battleshipBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(
      battleshipBtn.parentNode.id.toLowerCase(),
      4,
      battleshipBtn
    );
  });

  cruiserBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(cruiserBtn.parentNode.id.toLowerCase(), 3, cruiserBtn);
  });

  submarineBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(submarineBtn.parentNode.id.toLowerCase(), 3, submarineBtn);
  });

  destroyerBtn.addEventListener('click', () => {
    renderBoard(p1Board, pAIBoard);
    placePlayerShips(destroyerBtn.parentNode.id.toLowerCase(), 2, destroyerBtn);
  });

  const placePlayerShips = (shipname, length, btn) => {
    p1info.innerText = `Place your ${shipname}`;
    p1info.classList.add('selected');
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
          p1info.innerText = 'Deploy the rest of your fleet!';
          btn.classList.add('hidden');
          const element = document.getElementById(`${shipname}`);
          element.classList.add('placed');
          p1info.classList.remove('selected');
        } else {
          alert('unable to place here. try again!');
          return;
        }

        if (p1Board.myFleet.length === 5) {
          p1info.innerText = 'Your fleet';
          infoContainer.classList.add('hidden');
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
        // get all fields covered by currently selected ship in real time
        const align = document.getElementById('alignment').innerText;
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

const reportSunkShip = (board) => {
  board.myFleet.forEach((ship) => {
    if (ship.isSunk() === true) {
      document.getElementById(ship.type).classList.add('sunk');
      // get the closest .fleet-element to prefent it from being transformed when ship is sunk
      const closestElement = document
        .getElementById(ship.type)
        .closest('.fleet');
      closestElement.style.transform = 'none';
    }
  });
};

const gameOver = (loserID) => {
  if (loserID === 'Player1') {
    loserID = 'You were';
  }
  if (loserID === 'Player2') {
    loserID = 'AI was';
  }

  const modalBody = document.querySelector('.modal-body');
  const overlay = document.getElementById('overlay');

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
  }
  openModal(modal);
  modalBody.textContent = `${loserID} defeated. 
  There are no winners in war! `;
  const resetBtn = document.getElementById('resetBtnModal');

  resetBtn.addEventListener('click', () => {
    location.reload();
  });
};

export {
  activatePlacementButtons,
  activateResetButton,
  reportSunkShip,
  gameOver,
};
