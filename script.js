  let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    let player1Name = '';
    let player2Name = '';

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    function startGame() {
      player1Name = document.getElementById('player1').value.trim();
      player2Name = document.getElementById('player2').value.trim();
      if (!player1Name || !player2Name) {
        alert('Please enter names for both players!');
        return;
      }
      document.getElementById('playerInput').style.display = 'none';
      document.getElementById('gameContainer').style.display = 'block';
      gameActive = true;
      renderBoard();
    }

    function renderBoard() {
      const gameBoard = document.getElementById('gameBoard');
      gameBoard.innerHTML = '';
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        for (let i = 0; i < 9; i++) {
          const subCell = document.createElement('div');
          subCell.classList.add('sub-cell');
          cellElement.appendChild(subCell);
        }
        if (cell) {
          const symbol = document.createElement('div');
          symbol.classList.add('symbol');
          symbol.innerText = cell;
          cellElement.appendChild(symbol);
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoard.appendChild(cellElement);
      });
    }

    function handleCellClick(index) {
      if (board[index] !== '' || !gameActive) return;
      board[index] = currentPlayer;
      renderBoard();
      checkResult();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkResult() {
      let roundWon = false;
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          gameActive = false;
          const winner = currentPlayer === 'X' ? player1Name : player2Name;
          document.getElementById('result').innerText = `${winner} Wins!`;
          document.getElementById('restart').style.display = 'block';
          break;
        }
      }
      if (!roundWon && board.every(cell => cell !== '')) {
        gameActive = false;
        document.getElementById('result').innerText = "It's a Draw!";
        document.getElementById('restart').style.display = 'block';
      }
    }

    function restartGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      document.getElementById('result').innerText = '';
      document.getElementById('restart').style.display = 'none';
      renderBoard();
    }