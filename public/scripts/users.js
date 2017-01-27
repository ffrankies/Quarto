/******************************************************************************
 * Performs tasks related to user authentication.
 * Author: Frank Wanye
 * Date: 01/02/2016
 *****************************************************************************/
"use strict";

var loggedIn = false;

/**
 * Shorter form of getElementById
 */
function selectId(id) {
    var object = document.getElementById(id);
    return object;
};

/**
 * Shorter form of document.querySelector.
 */
function query(cssQuery) {
    return document.querySelector(cssQuery);
};

/**
 * Shorter form of getElementsByClassName
 */
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
 * Sets up an Ajax request, returns the ajax request object if successful,
 * null if not.
 */
function setUpAjax() {
    var ajax = null;
    try { // For modern browsers
        ajax = new XMLHttpRequest();
    } catch (error) { // Older browsers
        console.log(error);
        try {
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (error) {
            console.log(error);
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }
    return ajax;
};

/**
 * Gets user info if user is logged in.
 */
function checkLogIn() {
    var ajax = setUpAjax();
    if (ajax == null) {
        console.log("Incompatible browser.");
        return;
    }
    ajax.open("GET", "/users/verify");
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            var response = ajax.responseText;
            console.log(response);
            response = JSON.parse(response);
            if (response.success) {
                selectId("username").innerHTML =
                    window.localStorage.getItem("username");
                selectId("log-in").innerHTML = "Log Out";
            } else {
                if (window.localStorage.getItem("username")) {
                    window.localStorage.removeItem("username");
                }
                selectId("username").innerHTML = "";
                selectId("log-in").innerHTML = "Log In";
            }
        }
    };
    ajax.send();
};

/**
 * Logs user in/out.
 */
function logIn(uname, pwd) {
    var ajax = setUpAjax();
    if (ajax == null) {
        console.log("Incompatible browser.");
        return;
    }
    if (loggedIn) {
        ajax.open("POST", "/users/logout");
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                var response = ajax.responseText;
                console.log(response);
                response = JSON.parse(response);
                if (response.success) {
                    loggedIn = false;
                    selectId("username").innerHTML = "";
                    selectId("log-in").innerHTML = "Log In";
                    if (window.localStorage.getItem("username")) {
                        window.localStorage.removeItem("username");
                    }
                } else {
                    alert("An error occured when trying to log you out: " +
                          response.message);
                }
            }
        };
        ajax.send();
    } else {
        ajax.open("POST", "/users/login");
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var response = ajax.responseText;
                console.log(response);
                response = JSON.parse(response);
                if (response.success) {
                    loggedIn = true;
                    selectId("logInDiv").className = "notVisible";
                    selectId("username").innerHTML = uname;
                    selectId("log-in").innerHTML = "Log Out";
                    window.localStorage.setItem("username", uname);
                } else {
                    selectId("logInError").innerHTML = response.message;
                }
            }
        };
        ajax.send(JSON.stringify(
            {
                username: uname,
                password: pwd
            }
        ));
    }
};

/**
 * Signs up a user, and logs the user in.
 */
function signUp(uname, pwd) {
    var ajax = setUpAjax();
    if (ajax == null) {
        console.log("Incompatible browser.");
        return;
    }
    ajax.open("POST", "/users/signup");
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            var response = ajax.responseText;
            console.log(response);
            response = JSON.parse(response);
            if (response.success) {
                selectId("signUpDiv").className = "notVisible";
                logIn(uname, pwd);
            } else {
                selectId("signUpError").innerHTML = response.message;
            }
        }
    };
    ajax.send(JSON.stringify(
        {
            username: uname,
            password: pwd
        }
    ));
};

/**
 * Validates sing up and log in input.
 * For sign up, use "signUp" option, for log in, use "logIn" option
 */
function validate(option) {

    var uname = query("input[name='" + option + "Uname']").value;
    var pwd = query("input[name='" + option + "Pwd']").value;
    var error = selectId(option + "Error");

    if (uname.length < 3 || uname.length > 16) {
        error.innerHTML = "Username must be between 3 and 16 characters long";
        return;
    }
    if (pwd.length < 6 || pwd.length > 16) {
        error.innerHTML = "Password must be between 6 and 16 characters long";
        return;
    }

    var notValid = "<>();[]{}";
    for (var i = 0; i < notValid.length; ++i) {
        if (uname.includes(notValid[i]) || pwd.includes(notValid[i])) {
            error.innerHTML = "Username and Password cannot contain these " +
                              "characters: " + notValid;
            return;
        }
    }

    if (uname[0] == ' ' || uname[uname.length - 1] == ' ') {
        error.innerHTML = "Username cannot start or end with a space.";
        return;
    }

    // Sends ajax request to sign up
    if (option == "signUp") {
        signUp(uname, pwd);
    } else if (option == "logIn") {
        logIn(uname, pwd);
    }

};

function initUsers() {
    checkLogIn();
    selectId("signUpDone").onclick = function() {
        validate("signUp");
    };
    selectId("logInDone").onclick = function() {
        validate("logIn");
    };
};

document.addEventListener("readystatechange", function() {
    if (document.readyState === "interactive") {
        initUsers();
    }
});
