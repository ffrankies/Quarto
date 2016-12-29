/******************************************************************************
 * The 4 x 4 Quarto Game Board Class.
 * Author: Frank Wanye
 * Date: 12/28/2016
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
            placePiece: placePiece
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
