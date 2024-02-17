/*
Name: Brody Dentinger
Date: January 19 , 2024
Description: This is our javascript for our website.
File: app.js
*/

"use strict";

// IIFE - Immediately invoked functional expression . Doesn't have a name, calls itself
// the () at the end makes it a IIFE
(function(){

    /**
     * Check login attempts to fetch a user from session storage. Dynamically changes login/logout based on if found.
     * On Logout, clears session Storage and redirects to index.
     */
    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id = "logout" class="nav-link" href="#"><i class="fas fa-undo"></i>Logout</a>`);
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "index.html";
        });
    }

    /**
     * LoadHeader takes html data from an HTTP request, and then loads it into the header element.
     * Also checks all anchor elements that are children of li elements for the containing of the current page title
     * If the anchor elements matches, loads active classes/stylings onto it.
     *
     * Checks Login on every page by implementing it into header.
     *
     * @param html_data data to load into header.
     *
     */
    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    /**
     * AjaxRequest takes a method, url, and callback function to submit an HTTP request, monitor it's status,
     * and perform a callback function when ready state status is 200 and 4.
     *
     * @param method Get or Post
     * @param url URL to request
     * @param callback function to call on successful retrieval of request payload
     *
     */
    function AjaxRequest(method, url, callback){

        // Step 1: Initialize HTTP Request object
        let xhr = new XMLHttpRequest();

        // Step 2: Open a connection to the server (URL will be from the API documentation)
        xhr.open(method, url);

        // Step 4: Add the event listener to monitor the readystatechange
        // listening for a "ready State change" from the request
        xhr.addEventListener("readystatechange", () => {

            // Code to happen when the state change occurs
            if(xhr.readyState === 4 && xhr.status === 200){

                // verify the 3rd argument is a function
                if(typeof callback == "function"){
                    callback(xhr.responseText);
                }
                else{
                    console.error("ERROR: callback not a function.");
                }
            }
        });

        // Step 3: Send the request
        xhr.send();
    }

    /**
     * Calls validateField() on each form element of the contact form.
     *
     */
    function ContactFormValidation(){

        ValidateField ("#fullName",
                  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
                     "Please enter a valid first and last name. Ex: First Name [Middle Name] Last Name");

        ValidateField("#contactNumber",
                  /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
                     "Please provide a valid contact number. Ex. 123-456-7891.");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please provide a valid email address. Ex. email@email.com");

    }

    /**
     * This function validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     *
     */
    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val()

            if(!regular_expression.test(inputFieldText)){
                // fail
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();

            }else{
                // pass
                messageArea.removeClass("class").hide();
            }
        });
    }

    /**
     * AddContact takes a name, number, and email, and creates a new contact object with that data.
     * Will also create a unique key as first character of name + current date and write this to local storage.
     * @param fullName Contacts full name.
     * @param contactNumber Contacts Phone Number.
     * @param emailAddress Contacts Email.
     *
     */
    function AddContact(fullName, contactNumber, emailAddress){

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){

            // Creating our own key (like an assoc. array) to identify the CSV.
            // substring takes the (start index, last index... so first character), concat. the current date
            let key = contact.fullName.substring(0,1) + Date.now();

            // write the key value pair to local storage
            localStorage.setItem(key, contact.serialize());
        }
    }

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage(){
        console.log("Called Display Homepage...");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html";
        })

        // select main tag, append the information to it
        $("main").append(`<p id = "MainParagraph" class = "mt-3">This is my first paragraph.</p>`)

        $("body").append(`<article class="container">
                            <p id = "ArticleParagraph" class = "mt-3">This is my article paragraph.</p>
                        </article>`)

    }

    function DisplayAboutUs(){
        console.log("Called About Us...");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage...");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function () {
            // boolean value returned for .checked
            if(subscribeCheckbox.checked){

                // fetching the value by targeting the NAME from the form element.
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
                }
        });
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage...");
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage...");
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage...");

        if(localStorage.length > 0){

            let contactList = document.getElementById("contactList");
            let data = "";

            let index = 1;
            let keys = Object.keys(localStorage);

            // for each of our list of keys
            for(const key of keys){

                // get the current key from the local storage
                let contact = new core.Contact();

                // get the full csv (value) for the given key
                let contactData = localStorage.getItem(key);
                // then we deserialize it
                contact.deserialize(contactData);

                data += `<tr>
                            <th scope = "row" class = "text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.contactNumber}</td>
                            <td>${contact.emailAddress}</td>
                            <td>
                                <button value = "${key}" class ="btn btn-primary btn-sm edit">
                                    <i class = "fas fa-edit fa-sm">Edit</i>
                                </button>
                            </td>
                            <td>
                                <button value = "${key}" class ="btn btn-danger btn-sm delete">
                                    <i class = "fas fa-trash fa-sm">Delete</i>
                                </button>
                            </td>
                        </tr>`

                index ++;
            }
            contactList.innerHTML = data;
        }

        // Handle add/ edit /delete buttons
        $("#addButton").on("click", () => {
           location.href = "edit.html#add";
        });

        // passing in the VALUE from the edit button (WHICH is the key from our serialized object)
        // This refers to the current button object
        $("button.edit").on("click", function(){
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function(){

            if(confirm("Confirm contact delete?")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        });

    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...");

        ContactFormValidation();

        // grab the first element after the hash (hash is position 0)
        let page = location.hash.substring(1);

        switch(page){
            case "add":

                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class = "fa fa-plus fa-sm">Add`);

                $("#editButton").on("click", (event) => {

                    // prevent form submission.
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);

                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });

                break;
            default:
                // edit operation
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                // display the current user's info in the form
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    // Set the contact's values in local storage to the form values.
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href = "contact-list.html";

                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
        }

    }
    function DisplayLoginPage(){
        console.log("Calling DisplayLoginPage()...");

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function() {

            let success = false;
            let newUser = new core.User();

            // JQuery version of an HTTP request
            // function(data) = data already represents the returnText
            // JQuery also already checks for 4 readystatechange, and 200 ok
            $.get("./data/users.json", function(data){

                // loop through each user of the response json file
                for(const user of data.users){

                    console.log(user);

                    // check if the username and password text fields from the form match the user and password from
                    // the JSON user.
                    if(username.value === user.Username && password.value === user.Password){

                        newUser.fromJSON(user);
                        success = true;
                        break;

                    }
                }
                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                }
                else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function(){
           document.forms[0].reset();
           location.href = "index.html";
        });

    }

    function DisplayRegisterPage(){
        console.log("Calling DisplayRegisterPage()...");
    }

    function Start(){
        console.log("App Started...");

        AjaxRequest("GET", "header.html", LoadHeader);

        // Creating a switch that checks the title for the current page.
        switch(document.title){
            case "Home":
                DisplayHomepage();
                break;

            case "About Us":
                DisplayAboutUs();
                break;

            case "Contact":
                DisplayContactUsPage();
                break;

            case "Products":
                DisplayProductPage();
                break;

            case "Services":
                DisplayServicesPage();
                break;

            case "Contact List":
                DisplayContactListPage();
                break;

            case "Edit Contact":
                DisplayEditPage();
                break;

            case "Login":
                DisplayLoginPage();
                break;

            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start);

}) ()