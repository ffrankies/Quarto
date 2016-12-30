/******************************************************************************
 * The Quarto Game Board logic.
 * Author: Frank Wanye
 * Date: 12/29/2016
 *****************************************************************************/
 "use strict";

// Holds the Game Board and Pieces arrays
var board = null;

// Holds the two Players' information
var player1 = null, player2 = null;

// Holds the scores for both Players
var player1score = 0, player2score = 0;

// Holds a reference to the current player
var currentPlayer;

// Notifies when the game has ended.
var END = false;

/**************************************************************************
 * Shorter form of getElementById
 *************************************************************************/
function selectId(id) {
    var object = document.getElementById(id);
    return object;
};

/**************************************************************************
 * Shorter form of getElementsByClassName
 *************************************************************************/
function selectClass(classtext) {
    var objects = document.getElementsByClassName(classtext);
    return objects;
};

/**
 * Selects the first element with a given class name that is a child of a
 * given parent object.
 */
function selectOne(parent, classtext) {
    var objects = parent.getElementsByClassName(classtext);
    return objects[0];
};

/**
 * Checks if a game has been set up or not.
 * If a game has been set up, places correct information in divs.
 * If not, redirects to homepage.
 */
function checkSetUp() {
    var keys = ["player1Name", "player1Rank", "player2Name", "player2Rank"];

    for (var i = 0; i < keys.length; ++i) {
        if (window.localStorage.getItem(keys[i]) == null) {
            window.location.href = "index.html";
        }
    }

    player1 = Player.init(
        window.localStorage.getItem(keys[0]),
        window.localStorage.getItem(keys[1])
    );

    player2 = Player.init(
        window.localStorage.getItem(keys[2]),
        window.localStorage.getItem(keys[3])
    );

    currentPlayer = player1;

    selectId("notification").innerHTML = "<h2>" + currentPlayer.name +
        ": Select a piece for your opponent to place.</h2>";

    selectId("player1").innerHTML = window.localStorage.getItem(keys[0]);
    selectId("player1rank").innerHTML = Player.RANKS[
        window.localStorage.getItem(keys[1])];

    selectId("player2").innerHTML = window.localStorage.getItem(keys[2]);
    selectId("player2rank").innerHTML = Player.RANKS[
        window.localStorage.getItem(keys[3])];
};

/**
 * Converts an index to a position array [row, col].
 */
function indexToPos(index) {
    if (index < 4) {
        return [0, index];
    } else if (index < 8) {
        return [1, index - 4];
    } else if (index < 12) {
        return [2, index - 8];
    } else {
        return [3, index - 12];
    }
};

/**
 * Converts a [row, col] position to a linear index.
 */
function posToIndex(pos) {
    var row = pos[0];
    var col = pos[1];
    return (row * 4) + col;
};

/*
 * Returns true if this is the first turn of the game.
 * Checks for first turn by looking at number of empty board cells. - WRONG
 */
function firstTurn() {
    return (board.numEmpty() == 16);
};

/**
 * Checks to see if there is a winner. Ends round if there is a winner.
 */
function isWinner() {
    // TO-DO;
    if (board.isWinner() === true) {
        selectId("notification").innerHTML = "<h2>" + currentPlayer.name +
            " has won!</h2>";
        END = true;
        return true;
    } else {
        return false;
    }
};

/**
 * Updates the player's score.
 */
function updateScore() {
    if (isWinner()) {
        if (currentPlayer == player1) {
            player1score++;
            selectId("player1score").innerHTML = player1score;
        } else {
            player2score++;
            selectId("player2score").innerHTML = player2score;
        }
    }
}

/**
 * Switches turn to next player.
 */
function nextTurn() {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
};

/**
 * Selects a piece from the pieces list.
 * Returns true if successful, false otherwise.
 */
function selectPiece(index) {
    return function() {
        var selected = board.selectPiece(index);
        if (selected && !END) {
            var pieceDiv = selectOne(selectId("piecesBox"), selected);
            pieceDiv.parentElement.className += " selected";
            selectId("selectedpiece").innerHTML = "<div class='" +
                selected + "'></div>";
            nextTurn();
            selectId("notification").innerHTML = "<h2>" +  currentPlayer.name +
                ": Place the selected piece on the board.</h2>";
            return true;
        } else {
            alert("Either there is already a selected piece, or this piece" +
                  " has alredy been used.");
            console.log("Either there is already a selected piece, or this" +
                  " piece has alredy been used.");
            return false;
        }
    }
};

/**
 * Places selectedPiece on the clicked cell.
 * Returns true if successful, false otherwise.
 */
function placePiece(index) {
    return function() {
        var pos = indexToPos(index);
        var success = board.placePiece(pos);
        if (success && !END) {
            var cell = selectClass("cell")[index];
            var selectedDiv = selectId("selectedpiece");
            cell.innerHTML = selectedDiv.innerHTML;
            selectedDiv.innerHTML = "";
            selectId("notification").innerHTML = "<h2>" + currentPlayer.name +
                ": Select a piece for your opponent to place.</h2>";
            updateScore();
        } else {
            alert("Either there is no piece to place here, or there is " +
                  "already a piece placed here.");
            console.log("Either there is no piece to place here, or there is "
                + "already a piece placed here.");
            return false;
        }
    };
};

// Main game functionality is here
function init() {
    checkSetUp();

    board = Board.init();

    // Allow pieces to be clicked on.
    var pieces = selectId("piecesBox").children;
    for (var index = 0; index < 16; index++) {
        pieces[index].onclick = selectPiece(index);
    }

    // Allow pieces to be placed.
    var cells = selectClass("cell");
    for (var index = 0; index < 16; index++) {
        cells[index].onclick = placePiece(index);
    }
};

document.addEventListener("readystatechange", function() {
    if (document.readyState === "interactive") {
        init();
    }
});
