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
var formValidity = false;

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
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;



    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }

    if (deliveryYear.selectedIndex === -1) {
        deliveryYear.selectedIndex = 0;
    }

    // If Feb and 2020 - leap year - twentyNine

    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }

    // Else 30 day month - thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }

    // Else 31 month - thirtyOne
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" ||
        selectedMonth === "7" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

// Function to see if custom message is checked 

function autoCheckCustom() {
    var messageBox = document.getElementById("customText");

    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
        // Text area actually has something in it
        document.getElementById("custom").checked = "checked";

    } else {
        // Text area has nothing in it
        document.getElementById("custom").checked = "";

    }
}

// Function to copy delivery to billing address

function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");

    // If checkbox is checked, copy all fields

    if (document.getElementById("sameAddr").checked) {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }

    // Else, erase all fields
    else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = ""
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}

// Function to validate entire form

function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    validateAddress("billingAddress");

    validateAddress("deliveryAddress");

    validateDeliveryDate();

    validatePayment();

    validateMessage();

    validateCreateAccount();

    if (formValidity === true) {
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order";
        document.getElementById("errorText").style.display = "block";
        scroll(0, 0);
    }
}

// Function to validate address (Function is called inside of validateForm)

function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement = null;

    try {
        // Loop required input elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];

            // Test for blank
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldsetValidity = false;
            } else {
                currentElement.style.background = "white";
            }

        }

        // Validate select listeners

        currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];

        // Blank

        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        // Valid
        else {
            currentElement.style.border = "white";
        }

        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "Please complete all Billing Address information";
            } else {
                throw "Please complete all Delivery Address information";
            }
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }

}

// Function to validate delivery date (Function is called inside of validateForm)

function validateDeliveryDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement = null;

    try {
        // Loop required select elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];

            // Test for blank

            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else {
                currentElement.style.border = "";
            }

        }

        // Validate select listeners

        currentElement = document.querySelectorAll("#deliveryDate" + " select")[0];

        // Blank

        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        // Valid
        else {
            currentElement.style.border = "";
        }

        if (fieldsetValidity === false) {
            throw "Please specify a delivery date";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// Function to validate payment (Function is called inside of validateForm)

function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;

    // Get radio buttons

    var cards = document.getElementsByName("PaymentType");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select")
    var ccNumElement = document.getElementById("ccNum")
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv")
    var currentElement = null;

    try {

        // Check radio buttons for at least 1 required checked

        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        } else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }

        // Check for card number format

        if (ccNumElement.value === "") {
            ccNumElement.style.backgroundColor = "rgb(255, 233, 233)";
            fieldsetValidity = false;
        } else {
            ccNumElement.style.backgroundColor = "white";
        }

        // Validate expiration date fields 

        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i]
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else {
                currentElement.style.border = "";
            }
        }

        // check cvv number

        if (cvvElement.value === "") {
            cvvElement.style.backgroundColor = "rgb(255, 233, 233)";
            fieldsetValidity = false;
        } else {
            cvvElement.style.backgroundColor = "white";
        }

        if (fieldsetValidity === false) {
            throw "Please complete all Payment info.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// Function to validate custom message (Function is called inside of validateForm)

function validateMessage() {
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;

    try {

        if (document.getElementById("custom").checked && ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))) {
            throw "Please enter your Custom Message text."
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            msgBox.style.background = "white";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255, 233, 233)"
        formValidity = false;
    }
} // Function to validate create account (Function is called inside of validateForm)

function validateCreateAccount() {
    var errorDiv = document.querySelectorAll("#createAccount" + " .errorMessage")[0];
    var usernameElement = document.getElementById("username");
    var pass1Element = document.getElementById("pass1");
    var pass2Element = document.getElementById("pass2");
    usernameElement.style.background = "white";
    pass1Element.style.background = "white";
    pass2Element.style.background = "white";
    var passwordMismatch = false;
    var invColor = "rgb(255, 233, 233)"
    var fieldsetValidity = true;



    try {
        // If there is data in the fields but the passwords are not matching
        if (usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "") {
            if (pass1Element.value !== pass2Element.value) {
                passwordMismatch = true;
                throw "Passwords entered do not match, please re-enter.";
            }
        } else if (usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === "") {
            fieldsetValidity = true;
        } else {
            fieldsetValidity = false;
            throw "Please enter all fields to Create Account.";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        pass1Element.style.background = invColor;
        pass2Element.style.background = invColor;
        formValidity = false;
        if (passwordMismatch) {
            usernameElement.style.background = "white";
        } else {
            usernameElement.style.background = invColor;
        }
    }
}

// Function to run on page load

function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

// Function to create our event listeners

function createEventListeners() {

    // Event listeners for month select list

    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }

    // Event listener for years select list

    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }

    // Event listener for change in custom text field

    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }

    // Event listener for checkbox to copy data 

    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }

    // Event listener for validation on form submission

    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}





// Enable load event handlers

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
