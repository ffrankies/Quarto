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
 * Shorter form of document.querySelector.
 */
function query(cssQuery) {
    return document.querySelector(cssQuery);
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

    query("#notification h2").innerHTML = currentPlayer.name +
        ": Select a piece for your opponent to place.";

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

/*
 * Sets up the Board for a new Round.
 */
function nextRound() {
    board = Board.init();

    // Clear the game pieces.
    var pieces = selectId("piecesBox").children;
    for (var index = 0; index < 16; index++) {
        pieces[index].className = "piece";
    }

    // Clear the game board.
    var cells = selectClass("cell");
    for (var index = 0; index < 16; index++) {
        cells[index].innerHTML = "";
    }

    END = false;

    query("#notification h2").innerHTML = currentPlayer.name +
        ": Select a piece for your opponent to place.";

    selectId("yes").className = "notVisible";
    selectId("no").className = "notVisible";

};

/**
 * Checks to see if there is a winner. Ends round if there is a winner.
 */
function isWinner() {
    if (board.isWinner() === true) {
        query("#notification h2").innerHTML = currentPlayer.name +
            " has won! Another round?";
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

        selectId("yes").className = "visible";
        selectId("no").className = "visible";
    }
};

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
        if (END) {
            return;
        }
        var selected = board.selectPiece(index);
        if (selected) {
            var pieceDiv = selectOne(selectId("piecesBox"), selected);
            pieceDiv.parentElement.className += " selected";
            selectId("selectedpiece").innerHTML = "<div class='" +
                selected + "'></div>";
            nextTurn();
            query("#notification h2").innerHTML = currentPlayer.name +
                ": Place the selected piece on the board.";
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
        if (END) {
            return;
        }
        var pos = indexToPos(index);
        var success = board.placePiece(pos);
        if (success) {
            var cell = selectClass("cell")[index];
            var selectedDiv = selectId("selectedpiece");
            cell.innerHTML = selectedDiv.innerHTML;
            selectedDiv.innerHTML = "";
            query("#notification h2").innerHTML = currentPlayer.name +
                ": Select a piece for your opponent to place.";
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

    // Allow next round to be played.
    selectId("yes").onclick = function() {
        nextRound();
    };

    // Leave board as is.
    selectId("no").onclick = function() {
        selectId("yes").className = "notVisible";
        selectId("no").className = "notVisible";
        var text = "";
        if (player1score > player2score) {
            text = player1.name + " has won this set of matches!";
        } else if (player1score < player2score) {
            text = player2.name + " has won this set of matches!";
        } else {
            text = "This set of matches ended in a draw!";
        }
        query("#notification h2").innerHTML = text;
    };

};

document.addEventListener("readystatechange", function() {
    if (document.readyState === "interactive") {
        init();
    }
});
