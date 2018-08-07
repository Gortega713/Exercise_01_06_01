/*
    Exercise_01_06_01 - Form Validation

    Author: Gabriel Ortega
    Date: 8.6.18

    Filename: snoot.js
    Form Validation functions for snoot.html
*/

"use strict";

// Function to turn off select list defaults

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    alert("Select Lists: " + emptyBoxes.length);
}

// Enable load event handlers

if (window.addEventListener){
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", removeSelectDefaults);
}