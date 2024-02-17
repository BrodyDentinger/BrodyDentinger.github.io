/*
Name: Brody Dentinger
Date: February 17 , 2024
Description: This is the user class.
File: user.js
*/

"use strict";

(function (core) {

    class User {


        constructor(displayName = "", emailAddress = "", userName = "", password = "") {

            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userName = userName;
            this._password = password;
        }

        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        get userName() {
            return this._userName;
        }

        set userName(value) {
            this._userName = value;
        }

        toString() {
            return `DisplayName: ${this._displayName}\n
                ContactNumber: ${this._emailAddress}\n
                emailAddress: ${this._userName}\n`;
        }

        /**
         * Serialize for writing to localStorage.
         * @returns {null|string}
         */
        serialize() {
            if (this._displayName !== "" && this._emailAddress !== "" && this._userName !== "") {
                return `${this._displayName}, ${this._emailAddress}, ${this._userName}`;
            }

            console.error("One or more properties of the User are empty or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from the localStorage.
         * @param data
         */
        deserialize(data) {
            let propertyArray = data.split(",");

            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userName = propertyArray[2];
        }

        toJSON(){
            return {
                DisplayName : this._displayName,
                EmailAddress : this._emailAddress,
                Username : this._userName,
                Password : this.Password
            }
        }

        fromJSON(data){
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._userName= data.Username;
            this._password = data.Password;
        }
    }

    core.User = User;
})( core || (core = {}) );