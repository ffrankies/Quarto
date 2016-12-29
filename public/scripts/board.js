/******************************************************************************
 * The 4 x 4 Quarto Game Board Class.
 * Author: Frank Wanye
 * Date: 12/29/2016
 *****************************************************************************/
"use strict";

var Board = (function() {

    // The size of the board
    const BDSIZE = 4;

    // The status of the board cells
    const EMPTY = "empty";

    /*
     * Quarto Piece descriptors. Each letter stands for one property, in the
     * following order: color, size, shape, outline
     * W = White, G = Green
     * B = Big, S = Small
     * R = Round, Q = Square
     * O = Outline, N = No Outline
     * The order in which the pieces appear here = the order in which they
     * appear on the webpage.
     */
    const WBRO = "WBRO";
    const WBRN = "WBRN";
    const WBQO = "WBQO";
    const WBQN = "WBQN";
    const WSRO = "WSRO";
    const WSRN = "WSRN";
    const WSQO = "WSQO";
    const WSQN = "WSQN";
    const GBRO = "GBRO";
    const GBRN = "GBRN";
    const GBQO = "GBQO";
    const GBQN = "GBQN";
    const GSRO = "GSRO";
    const GSRN = "GSRN";
    const GSQO = "GSQO";
    const GSQN = "GSQN";

    // Represents a piece that has been used
    const USED = "USED";

    var test = function() {
        alert("test");
    };

    // Board constructor
    var init = function() {

        // The 2D array of Board Cells
        var board = new Array();

        // The array of game pieces
        var pieces = new Array(
            WBRO, WBRN, WBQO, WBQN, WSRO, WSRN, WSQO, WSQN,
            GBRO, GBRN, GBQO, GBQN, GSRO, GSRN, GSQO, GSQN
        );

        // The currently selected piece
        var selected = null;

        /*
         * The counters for each row/column/diagonal and property of
         * QUARTO pieces. When any property gets to 4 or -4, then
         * a player has won.
         * Structure: Row/Column/Dag | Color | Size | Shape | outline
         *                   1       |  val | val  |  val  |   val
         *                 ...      | ...  |  ... |  ...  |   ...
         */
        var counterRows = [
            [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
        ]

        var counterCols = [
            [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
        ]

        var counterDiags = [
            [0, 0, 0, 0], [0, 0, 0, 0]
        ]

        // Holds the largest value counter
        var maxCounter = 0;

        /**
         * Updates the row counters given a position.
         */
        var updateRowCounters = function(row) {
            if (selected[0] == 'W') {
                counterRows[row][0]++;
            } else {
                counterRows[row][0]--;
            }
            if (Math.abs(counterRows[row][0]) > maxCounter) {
                maxCounter = Math.abs(counterRows[row][0]);
            }
            if (selected[1] == 'B') {
                counterRows[row][1]++;
            } else {
                counterRows[row][1]--;
            }
            if (Math.abs(counterRows[row][1]) > maxCounter) {
                maxCounter = Math.abs(counterRows[row][1]);
            }
            if (selected[2] == 'R') {
                counterRows[row][2]++;
            } else {
                counterRows[row][2]--;
            }
            if (Math.abs(counterRows[row][2]) > maxCounter) {
                maxCounter = Math.abs(counterRows[row][2]);
            }
            if (selected[3] == 'O') {
                counterRows[row][3]++;
            } else {
                counterRows[row][3]--;
            }
            if (Math.abs(counterRows[row][3]) > maxCounter) {
                maxCounter = Math.abs(counterRows[row][3]);
            }
        };

        /**
         * Updates the column counters given a position.
         */
        var updateColCounters = function(col) {
            if (selected[0] == 'W') {
                counterCols[col][0]++;
            } else {
                counterCols[col][0]--;
            }
            if (Math.abs(counterCols[col][0]) > maxCounter) {
                maxCounter = Math.abs(counterCols[col][0]);
            }
            if (selected[1] == 'B') {
                counterCols[col][1]++;
            } else {
                counterCols[col][1]--;
            }
            if (Math.abs(counterCols[col][1]) > maxCounter) {
                maxCounter = Math.abs(counterCols[col][1]);
            }
            if (selected[2] == 'R') {
                counterCols[col][2]++;
            } else {
                counterCols[col][2]--;
            }
            if (Math.abs(counterCols[col][2]) > maxCounter) {
                maxCounter = Math.abs(counterCols[col][2]);
            }
            if (selected[3] == 'O') {
                counterCols[col][3]++;
            } else {
                counterCols[col][3]--;
            }
            if (Math.abs(counterCols[col][3]) > maxCounter) {
                maxCounter = Math.abs(counterCols[col][3]);
            }
        };

        /**
         * Updates the row counters given a position.
         */
        var updateDiagCounters = function(diag) {
            if (selected[0] == 'W') {
                counterDiags[diag][0]++;
            } else {
                counterDiags[diag][0]--;
            }
            if (Math.abs(counterDiags[diag][0]) > maxCounter) {
                maxCounter = Math.abs(counterDiags[diag][0]);
            }
            if (selected[1] == 'B') {
                counterDiags[diag][1]++;
            } else {
                counterDiags[diag][1]--;
            }
            if (Math.abs(counterDiags[diag][1]) > maxCounter) {
                maxCounter = Math.abs(counterDiags[diag][1]);
            }
            if (selected[2] == 'R') {
                counterDiags[diag][2]++;
            } else {
                counterDiags[diag][2]--;
            }
            if (Math.abs(counterDiags[diag][2]) > maxCounter) {
                maxCounter = Math.abs(counterDiags[diag][2]);
            }
            if (selected[3] == 'O') {
                counterDiags[diag][3]++;
            } else {
                counterDiags[diag][3]--;
            }
            if (Math.abs(counterDiags[diag][3]) > maxCounter) {
                maxCounter = Math.abs(counterDiags[diag][3]);
            }
        };

        /**
         * Updates all the counters.
         */
        var updateCounters = function(row, col) {
            updateRowCounters(row);
            updateColCounters(col);
            if (row == col) {
                updateDiagCounters(0);
            } else if (row + col == 3) {
                updateDiagCounters(1);
            }
        };

        /**
         * Sets up a new, empty board
         */
        var setup = function() {
            for(var row = 0; row < BDSIZE; row++) {
                var rowarray = new Array();
                for(var col = 0; col < BDSIZE; col++) {
                    rowarray.push(EMPTY);
                }
                board.push(rowarray);
            }
        };
        setup();

        /**
         * Returns the number of empty cells.
         */
        var numEmpty = function() {
            var count = 0;
            for (var row = 0; row < BDSIZE; row++) {
                for (var col = 0; col < BDSIZE; col++) {
                    if (board[row][col] == EMPTY) {
                        count++;
                    }
                }
            }
            return count;
        };

        /**
         * Selects a piece given the Piece's index.
         * Returns the Piece's shorthand if successful, false otherwise.
         */
        var selectPiece = function(index) {
            if (selected != null) {
                console.log("A piece has already been selected.");
                return false;
            }
            var piece = pieces[index];
            if (piece == USED) {
                console.log("This piece has already been used.");
                return false;
            }
            selected = piece;
            pieces[index] = USED;
            return selected;
        };

        /**
         * Returns maxCounter if there is no winner, returns true if
         * there is a Winner.
         */
        var isWinner = function() {
            if (maxCounter == 4) {
                return true;
            } else {
                return maxCounter;
            }
        };

        /**
         * Places the currently selected Piece in the given cell.
         * Returns true if successful, false otherwise.
         */
        var placePiece = function(pos) {
            var row = pos[0];
            var col = pos[1];
            if (board[row][col] != EMPTY) {
                console.log("There is already a Piece in that cell.");
                return false;
            }
            if (selected == null) {
                console.log("There is no selected Piece to place.");
                return false;
            }
            updateCounters(row, col);
            board[row][col] = selected;
            selected = null;
            return true;
        };

        return {
            board: board,
            setup: setup,
            numEmpty: numEmpty,
            pieces: pieces,
            selectPiece: selectPiece,
            placePiece: placePiece,
            isWinner: isWinner
        };

    };

    return {
        BDSIZE: BDSIZE,
        EMPTY: EMPTY,
        WBRO: WBRO,
        WBRN: WBRN,
        WBQO: WBQO,
        WBQN: WBQN,
        WSRO: WSRO,
        WSRN: WSRN,
        WSQO: WSQO,
        WSQN: WSQN,
        GBRO: GBRO,
        GBRN: GBRN,
        GBQO: GBQO,
        GBQN: GBQN,
        GSRO: GSRO,
        GSRN: GSRN,
        GSQO: GSQO,
        GSQN: GSQN,
        init: init
    };

})();
