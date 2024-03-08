function gameboard() {
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }
    const getboard = () => board;

    // this method will handel
    const dropToken = (mainindex, index, player) => {
        if (board[mainindex][index].getValue() === 0) {
            board[mainindex][index].addToken(player);
        } else {
            return;
        }
        // implement drop token function
    };

    return { getboard, dropToken };
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

    const playerOneName = "X";
    const playerTwoName = "O";

    const player = [
        {
            name: playerOneName,
            token: "X",
        },
        {
            name: playerTwoName,
            token: "O",
        },
    ];

    let ActivePlayer = player[0];

    const getActivePlayer = () => ActivePlayer;

    const switchPlayer = () => {
        ActivePlayer = ActivePlayer === player[0] ? player[1] : player[0];
    };

    const checkifWinner = () => {
        let gameboard = board.getboard();
        let matrixlength = gameboard.length - 1;
        // rows
        function helperWinner(array) {
            if (array.every((element) => element.getValue() === "X")) {
                return true;
            }
        }
        // Handle Rows
        gameboard.forEach((array) => {
            helperWinner(array);
        });

        // Handle Collumns
        for (let i = 0; i < 3; i++) {
            let collumn = gameboard.map((element) => {
                return element[i];
            });
            helperWinner(collumn) ? true : false;
        }
        // Handle Diagonals
        let diagonalone = gameboard.map((array, index) => {
            return array[index];
        });
        helperWinner(diagonalone) ? true : false;

        let diagonaltwo = gameboard.map((array) => {
            return array[matrixlength--];
        });
        helperWinner(diagonaltwo) ? true : false;
    };

    const playRound = (row, collumn) => {
        board.dropToken(row, collumn, getActivePlayer().token);
        switchPlayer();
        // if checkwinner call the overlay theme
        checkifWinner() ? console.log("winner for x") : console.log("no win");
    };
    return { getActivePlayer, playRound, getboard: board.getboard };
}
playgame = GameController();

const ScreenController = () => {
    const game = GameController();
    const board_div = document.querySelector(".board");
    const player_div = document.querySelector(".player");

    const updateScreen = () => {
        board_div.textContent = "";

        const activeplayer = game.getActivePlayer(".player");
        const board = game.getboard();

        player_div.textContent = `${activeplayer.name}'s Turn`;

        const playercolor = (num) => {
            if (num === "X") {
                return "red";
            } else if (num === "O") {
                return "yellow";
            } else return "black";
        };
        board.forEach((row, mainindex) => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue() ? cell.getValue() : "";
                cellButton.style.color = playercolor(cell.getValue());
                cellButton.dataset.row = mainindex;
                cellButton.dataset.collumn = index;

                board_div.appendChild(cellButton);
            });
        });
    };

    function clickHandlerBoard(event) {
        selectedcolumn = event.target.dataset.collumn;
        selectedrow = event.target.dataset.row;
        if (!selectedcolumn) return;

        game.playRound(selectedrow, selectedcolumn);
        updateScreen();
    }
    board_div.addEventListener("click", clickHandlerBoard);

    updateScreen();
};

ScreenController();
