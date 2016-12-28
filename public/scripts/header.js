"use strict";
//alert("hello");
function init() {
    window.addEventListener("scroll", function(event) {
        var distanceY = window.pageYOffset ||
            document.documentElement.scrollTop;
        var shrinkOn = 100;
        var header = document.getElementById("header");
        var h1 = document.querySelector("h1");
        var container = document.getElementById("container");

        if (distanceY > shrinkOn) {
            header.className = "shrinkHeader";
            h1.className = "shrinkH1";
            container.className = "shrinkContainer";
        } else {
            header.className = "largeHeader";
            h1.className = "";
            container.className = "largeContainer";
        }
    });
};
//alert("after init function");
document.onload = init();
//alert("after onload");
