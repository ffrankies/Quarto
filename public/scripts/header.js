/******************************************************************************
 * Shrinks the header upon scrolling.
 * Author: Frank Wanye
 * Date: 01/02/2016
 *****************************************************************************/

"use strict";

/**
 * Sets up a hotSeat game.
 */
function process_local_game() {
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
    var local_game = document.getElementById("local_game");
    local_game.onclick = function() {
        document.getElementById("newGameDiv").className = "visible";
        if (loggedIn == false) {
            var ajax = setUpAjax()
            if (ajax == null) {
                console.log("Incompatible browser.");
                return;
            }
            ajax.open("GET", "/resources/names.json");
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4) {
                    var response = ajax.responseText;
                    console.log(response);
                    response = JSON.parse(response);
                    var p1nameDiv = document.getElementById("local_game_p1name")
                    var p2nameDiv = document.getElementById("local_game_p2name")
                    var namesLen = response.human.length
                    var random1 = Math.floor(Math.random() * namesLen)
                    var random2 = Math.floor(Math.random() * namesLen)
                    p1nameDiv.value = response.human[random1]
                    p2nameDiv.value = response.human[random2]
                }
            };
            console.log("Sending ajax request for names.")
            ajax.send();
        }
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
    var hotSeat = document.getElementById("local_game_start");
    hotSeat.onclick = function() {
        process_local_game();
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
