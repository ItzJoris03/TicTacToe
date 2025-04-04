"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function () {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');

    /* Testdata för att testa rättningslösning */
    // oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    // oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    // oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    // oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    // oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function () {
    // Set winner to initialy the horizontal winner, if 0 then check vertically and so on until a draw occured or there is no winner yet.
    let winner = oGameData.checkHorizontal();
    if (winner == 0) winner = oGameData.checkVertical();
    if (winner == 0) winner = oGameData.checkDiagonalLeftToRight();
    if (winner == 0) winner = oGameData.checkDiagonalRightToLeft();
    if (winner == 0) winner = oGameData.checkForDraw() ? 3 : 0;

    // console.log(winner);

    // switch (winner) {
    //     case 0: return "No winner";
    //     case 1: return "X is winner";
    //     case 2: return "O is winner";
    //     case 3: return "Draw";
    //     default: return "Error";
    // }

    return winner;
}

/**
 * Checks if a user won by cells
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkInput = (c1, c2, c3) => {
    // Checking if all cells are filled in or not
    if (c1 != "" || c2 != "" || c3 != "") {

        // Checking if all cell data are the same
        if (c1 == c2 && c1 == c3) {
            // Returns 1 if the cells are X else 2 for O
            return c1 == oGameData.playerOne ? 1 : 2;
        }
    }

    return 0;
}

/**
 * Checks if a user won horizontally
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkHorizontal = () => {
    let c1, c2, c3; // Initializing cell 1, 2 and 3
    for (let i = 0; i < 3; i++) {
        // Retrieving cell data from gameField Array using at() function.
        c1 = oGameData.gameField.at(3 * i); // 0 - 3 - 6
        c2 = oGameData.gameField.at(3 * i + 1); // 1 - 4 - 7
        c3 = oGameData.gameField.at(3 * i + 2); // 2 - 5 - 8

        // console.log(`Check row ${i}: ${c1} - ${c2} - ${c3} = ${c1 == c2 && c1 == c3}`)

        // get result is oGameData.checkInput with the cell data to see if a player won or not.
        let res = oGameData.checkInput(c1, c2, c3);
        if (res != 0) return res;
    }

    return 0;
}


/**
 * Checks if a user won vertically
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkVertical = () => {
    let c1, c2, c3; // Initializing cell 1, 2 and 3
    for (let i = 0; i < 3; i++) {
        // Retrieving cell data from gameField Array using at() function.
        c1 = oGameData.gameField.at(i); // 0 - 1 - 2
        c2 = oGameData.gameField.at(i + 3); // 3 - 4 - 5
        c3 = oGameData.gameField.at(i + 3 * 2); // 6 - 7 - 8

        // console.log(`Check column ${i}: ${c1} - ${c2} - ${c3} = ${c1 == c2 && c1 == c3}`)

        // get result is oGameData.checkInput with the cell data to see if a player won or not.
        let res = oGameData.checkInput(c1, c2, c3);
        if (res != 0) return res;
    }

    return 0;
}


/**
 * Checks if a user won diagonally
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkDiagonal = (ltr) => {
    let c1, c2, c3; // Initializing cell 1, 2 and 3

    // Retrieving cell data from gameField Array using at() function.
    c1 = oGameData.gameField.at(ltr ? 0 : 2); // 0 - 2
    c2 = oGameData.gameField.at(4); // 1
    c3 = oGameData.gameField.at(ltr ? 8 : 6); // 6 - 8

    // console.log(`Check diagonal ${ltr ? 'LTR' : 'RTL'}: ${c1} - ${c2} - ${c3} = ${c1 == c2 && c1 == c3}`)

    // get result is oGameData.checkInput with the cell data to see if a player won or not.
    let res = oGameData.checkInput(c1, c2, c3);
    if (res != 0) return res;

    return 0;
}


/**
 * Checks if a user won diagonally from left to right
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkDiagonalLeftToRight = () => { return oGameData.checkDiagonal(true); }


/**
 * Checks if a user won diagonally from right to left
 * 
 * returns 1 if user "X" won
 * returns 2 if user "O" won
 * returns 0 if no one won
 */
oGameData.checkDiagonalRightToLeft = () => { return oGameData.checkDiagonal(false); }


/**
 * Checks if a draw occured
 * 
 * returns false if either someone won of a field is left open
 * returns true if no one won and no field is left open
 */
oGameData.checkForDraw = () => {
    // Check for every field if it is left open
    for (let i = 0; i < 8; i++) {
        if (oGameData.gameField.at(i) == "") return false;
    }

    // check if a player already won after all fields are filled in
    if (
        oGameData.checkHorizontal() != 0 ||
        oGameData.checkVertical() != 0 ||
        oGameData.checkDiagonalLeftToRight() != 0 ||
        oGameData.checkDiagonalRightToLeft() != 0
    ) return false;

    return true;
}

//Testutskrifter

// console.log( oGameData );
oGameData.initGlobalObject();
console.log(oGameData.gameField);
console.log(oGameData.checkForGameOver());


// console.log(oGameData.checkHorizontal());
// console.log(oGameData.checkVertical());
// console.log(oGameData.checkDiagonalLeftToRight());
// console.log(oGameData.checkDiagonalRightToLeft());
// console.log(oGameData.checkForDraw());