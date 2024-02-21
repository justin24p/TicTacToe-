function gameboard() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }
    const getboard = () => board;

    const printboard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };
    // this method will handel
    const dropToken = (index, player) => {
        const row = Math.floor((index - 1) / 3);
        const collumn = index % 3;
        if (board[row][collumn].getValue() === 0) {
            board[row][collumn].addToken(player);
            return true;
        } else {
            return false;
        }
        // implement drop token function
    };

    return { getboard, printboard, dropToken };
}

// i need to create way that will allow me to alter the values of cell
// that also checks if there currently is a value within cell

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
    const getValue = () => {
        return value;
    };

    return { getValue, addToken };
}

function GameController() {
    const board = gameboard();

    let printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn.`);
        board.printboard();
    };

    const playerOneName = "playername1";
    const playerTwoName = "playername2";

    const player = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        },
    ];

    let ActivePlayer = player[0];

    const getActivePlayer = () => ActivePlayer;

    const switchPlayer = () => {
        ActivePlayer = ActivePlayer === player[0] ? player[1] : player[0];
    };

    const checkifWinner = () => {};

    const playRound = (gridspot) => {
        if (board.dropToken(gridspot, getActivePlayer().token)) {
            switchPlayer();
            printNewRound();
            checkifWinner();
        } else {
            handleUserInput();
        }
    };
    printNewRound();

    const handleUserInput = () => {
        const input = prompt("Please choose a grid spot from 1-9: ");
        const number = parseInt(input);
        console.log(number);
        if (number > 0 && number < 9 && !isNaN(number)) {
            playRound(number);
        } else {
            handleUserInput();
        }
    };
    let counter = 1;
    // loop to run game
    while (counter < 9) {
        handleUserInput();
        counter++;
    }

    return { getActivePlayer, playRound };
}
playgame = GameController();
