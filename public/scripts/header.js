"use strict";

/**
 * Sets up a hotSeat game.
 */
function processHotSeat() {
    var player1Name = document.querySelector('input[name="p1name"]').value;
    if (player1Name == null || player1Name == "") {
        player1Name = "Player 1";
    }
    var player2Name = document.querySelector('input[name="p2name"]').value;
    if (player2Name == null || player2Name == "") {
        player2Name = "Player 2";
    }
    var player1rank = document.querySelector(
        'input[name="p1rank"]:checked').value;
    var player2rank = document.querySelector(
        'input[name="p2rank"]:checked').value;
    window.localStorage.setItem("player1Name", player1Name);
    window.localStorage.setItem("player2Name", player2Name);
    window.localStorage.setItem("player1Rank", player1rank);
    window.localStorage.setItem("player2Rank", player2rank);
    window.location.href = "game.html";
};

/**
 * Allows a New Game to be set up and started.
 */
function newGame() {
    var startGame = document.getElementById("startgame");
    startGame.onclick = function() {
        var newGameDiv = document.getElementById("newGameDiv");
        newGameDiv.className = "visible";
    };
    var hotSeat = document.getElementById("hotseatStart");
    hotSeat.onclick = function() {
        processHotSeat();
    };
};

function init() {
    newGame();

    window.addEventListener("scroll", function(event) {
        var distanceY = window.pageYOffset ||
            document.documentElement.scrollTop;
        var shrinkOn = 100;
        var header = document.getElementById("header");
        var h1 = document.querySelector("h1");
        var container = document.getElementById("container");
        var logo = document.getElementById("logo");

        if (distanceY > shrinkOn) {
            header.className = "shrinkHeader";
            h1.className = "shrinkH1";
            container.className = "shrinkContainer";
            logo.className = "logoSmall";
        } else {
            header.className = "largeHeader";
            h1.className = "";
            container.className = "largeContainer";
            logo.className = "logoLarge";
        }
    });
};

document.addEventListener("readystatechange", function() {
    if (document.readyState === "interactive") {
        init();
    }
});
