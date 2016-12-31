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
    window.localStorage.setItem("player1Name", player1Name);
    window.localStorage.setItem("player2Name", player2Name);
    window.localStorage.setItem("player1Rank", 0);
    window.localStorage.setItem("player2Rank", 0);
    window.location.href = "game.html";
};

/**
 * Hides the given div's parent
 */
function hideParent(div) {
    return function() {
        div.parentNode.className = "notVisible";
    };
};

/**
 * Allows a New Game to be set up and started.
 */
function newGame() {
    var startGame = document.getElementById("startgame");
    startGame.onclick = function() {
        document.getElementById("newGameDiv").className = "visible";
    };
    var logIn = document.getElementById("log-in");
    logIn.onclick = function() {
        document.getElementById("logInDiv").className = "visible";
    };
    var signUp = document.getElementById("sign-up");
    signUp.onclick = function() {
        document.getElementById("signUpDiv").className = "visible";
    };
    var cancelButtons = document.getElementsByClassName("cancel");
    for (var i = 0; i < cancelButtons.length; i++) {
        var button = cancelButtons[i];
        button.onclick = hideParent(button);
    }
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
