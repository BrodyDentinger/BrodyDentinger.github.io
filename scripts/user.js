/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: February 23, 2024
File: user.js
Description: CLass file representing the user that will be logging into the system.
*/

"use strict";

class User {

    constructor(firstName = "", lastName = "",
                userName = "", emailAddress = "",
                phoneNumber = "", password = "") {

        this._firstName = firstName;
        this._lastName = lastName;
        this._userName = userName;
        this._emailAddress = emailAddress;
        this._phoneNumber = phoneNumber;
        this._password = password;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get emailAddress() {
        return this._emailAddress;
    }

    set emailAddress(value) {
        this._emailAddress = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(value) {
        this._phoneNumber = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    toString() {
        return `FirstName: ${this._firstName}\n
            LastName: ${this._lastName}\n
            userName: ${this._userName}\n
            emailAddress: ${this._emailAddress}\n
            PhoneNumber: ${this._phoneNumber}\n`;
    }

    /**
     * Serialize for writing to localStorage.
     * @returns {null|string}
     */
    serialize() {
        if (this._firstName !== "" && this._lastName !== "" && this._userName !== "" && this._emailAddress !== "" && this._phoneNumber !== "") {
            return `${this._firstName}, ${this._lastName}, ${this._userName}, ${this._emailAddress}, ${this._phoneNumber}`;
        }
        return null;
    }


    /**
     * Deserialize is used to read data from the localStorage.
     * @param data
     */
    deserialize(data) {
        let propertyArray = data.split(",");

        this._firstName = propertyArray[0];
        this._lastName = propertyArray[1];
        this._userName = propertyArray[2];
        this._emailAddress = propertyArray[3];
        this._phoneNumber = propertyArray[4];
    }

    toJSON(){
        return {
            FirstName : this._firstName,
            LastName : this._lastName,
            Username : this._userName,
            EmailAddress : this._emailAddress,
            PhoneNumber : this._phoneNumber,
            Password : this.Password
        }
    }

    fromJSON(data){
        this._firstName = data.FirstName;
        this._lastName = data.LastName;
        this._userName = data.Username;
        this._emailAddress = data.EmailAddress;
        this._phoneNumber = data.PhoneNumber;
        this._password = data.Password;
    }
}