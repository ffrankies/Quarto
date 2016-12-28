"use strict";
alert("hello");
function init() {
    window.addEventListener("scroll", function(event) {
        var distanceY = window.pageYOffset ||
            document.documentElement.scrollTop;
        alert(distanceY);
        var shrinkOn = 100;
        var header = document.querySelector("#header");
        var h1 = document.querySelector("h1");

        if (distanceY > shrinkOn) {
            header.className = "shrinkHeader";
            h1.className = "button shrinkH1";
        } else {
            header.className = "";
            h1.className = "button";
        }
    });
};
alert("after init function");
document.onload = init();
alert("after onload");
