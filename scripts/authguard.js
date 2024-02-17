/*
Name: Brody Dentinger
Date: January 19 , 2024
Description: This is our authorization guard class, that will be called to redirect users if not logged in.
File: authguard.js
*/

"use strict";

(function () {

    if(!sessionStorage.getItem("user")){
        location.href = "login.html";
    }

})();