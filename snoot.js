/*
    Exercise_01_06_01 - Form Validation

    Author: Gabriel Ortega
    Date: 8.6.18

    Filename: snoot.js
    Form Validation functions for snoot.html
*/

"use strict";

// Variables that have Global/Module scope

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

// Function to turn off select list defaults

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// Function to set up document fragment for days of month

function setUpDays() {
    // Get the days select list in the delivery date portion of form
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

// Function to update days selection list

function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;

    
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    
    if (deliveryMonth.selectedIndex === -1) {
        deliveryMonth.selectedIndex = 0;
    }
    
    // If Feb and 2018 - leap year - twentyNine
    
    // Else 30 day month - thirty
    
    // Else 31 month - thirtyOne
}

// Function to run on page load

function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    updateDays();
}

// Enable load event handlers

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
