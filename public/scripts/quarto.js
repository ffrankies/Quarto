/******************************************************************************
 * The Quarto Game Board logic.
 * Author: Frank Wanye
 * Date: 12/29/2016
 *****************************************************************************/"
 use strict";

// Holds the Game Board and Pieces arrays
var board = null;

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
 * Checks to see if there is a winner.
 */
function isWinner() {
    // TO-DO;
    if (board.isWinner() === true) {
        selectId("notification").innerHTML =
            "<h2>Current Player has won!</h2>";
    }
};

/**
 * Switches turn to next player.
 */
function nextTurn() {
    // TO-DO;
};

/**
 * Selects a piece from the pieces list.
 * Returns true if successful, false otherwise.
 */
function selectPiece(index) {
    return function() {
        var selected = board.selectPiece(index);
        if (selected) {
            var pieceDiv = selectOne(selectId("piecesBox"), selected);
            pieceDiv.parentElement.className += " selected";
            selectId("selectedpiece").innerHTML = "<div class='" +
                selected + "'></div>";
            nextTurn();
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
        if (success) {
            var cell = selectClass("cell")[index];
            var selectedDiv = selectId("selectedpiece");
            cell.innerHTML = selectedDiv.innerHTML;
            selectedDiv.innerHTML = "";
            isWinner();
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
