/*
Name: Brody Dentinger
Date: February 17 , 2024
Description: This is the contact class.
File: contact.js
*/

"use strict";

(function (core) {

    class Contact {

        constructor(fullName = "", contactNumber = "", emailAddress = "") {

            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        get fullName() {
            return this._fullName;
        }

        set fullName(value) {
            this._fullName = value;
        }

        get contactNumber() {
            return this._contactNumber;
        }

        set contactNumber(value) {
            this._contactNumber = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        toString() {
            return `FullName: ${this._fullName}\n
                ContactNumber: ${this._contactNumber}\n
                emailAddress: ${this._emailAddress}\n`;
        }

        /**
         * Serialize for writing to localStorage.
         * @returns {null|string}
         */
        serialize() {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
            }

            console.error("One or more properties of the Contact are empty or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from the localStorage.
         * @param data
         */
        deserialize(data) {
            let propertyArray = data.split(",");

            this._fullName = propertyArray[0];
            this._contactNumber = propertyArray[1];
            this._emailAddress = propertyArray[2];
        }
    }

    core.Contact = Contact;
})( core || (core = {}) );