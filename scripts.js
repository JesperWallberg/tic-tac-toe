let gameBoard = [];
let player = 1;
let score = [0, 0];
let tie = false;

function startGame(){
    tie = false;
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    document.querySelectorAll('.game-tile').forEach(tile => {
        tile.classList.remove('player-one', 'player-two');
    });
    document.getElementById("win-container").style.display = "none";
}

function gameLogic(tileNumber){
    let tile = document.querySelectorAll('.game-tile')[tileNumber - 1];

    if(gameBoard[tileNumber - 1] === 0){
        gameBoard[tileNumber - 1] = player;

        let playerDiv = document.createElement('div');

        if(player === 1){
            playerDiv.className = 'player-one';
        }else{
            playerDiv.className = 'player-two';
        }

        tile.appendChild(playerDiv);


        if(winCheck() === true){
            winScreen();
        }
        player = (player === 1 ? 2 : 1);
    }
}

function winCheck(){
    // Horizontal and vertical
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i * 3] !== 0 && gameBoard[i * 3] === gameBoard[i * 3 + 1] && gameBoard[i * 3] === gameBoard[i * 3 + 2]) {
            return true;
        }

        if (gameBoard[i] !== 0 && gameBoard[i] === gameBoard[i + 3] && gameBoard[i] === gameBoard[i + 6]) {
            return true;
        }
    }

    // Top-left to bottom-right diagonal
    if (gameBoard[0] !== 0 && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
        return true;
    }

    // Top-right to bottom-left diagonal
    if (gameBoard[2] !== 0 && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
        return true;
    }

    // Check for tie
    if (!gameBoard.includes(0)) {
        tie = true;
        winScreen()
    }
}

function winScreen(){
    if(tie === true) {
        winScreenText("It's a tie!")
    }else{
        score[player - 1]++;
        if (player === 1) {
            document.getElementById('player-one-score').innerText = `Score: ${score[0]}`;
        } else {
            document.getElementById('player-two-score').innerText = `Score: ${score[1]}`;
        }
        winScreenText("Player " + player + " is the winner!");
    }
    document.getElementById("win-container").style.display = "block";
}

function winScreenText(str){
    document.getElementById('win-text').innerText = str;
}
