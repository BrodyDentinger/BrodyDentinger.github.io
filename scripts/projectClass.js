/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: projectClass.js
Description: CLass file for project cards. Allows for creation and handling of project objects for the portfolio page.
*/

"use strict";

class Project {
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    // Create a class accessible array to store project objects.
    static ProjectCardsArray = [];

    constructor(title, description, image) {
        this._title = title;
        this._description = description;
        this._image = image;
    }

    /**
     * This method will push the given instance object to the news article array.
     * @return none
     */
    pushObjectToArray(){

        Project.ProjectCardsArray.push(this);
    }

    /**
     * This method takes a current object (i), and a div container (rowDiv), and formats a project card (html) for
     * each object given. (i)
     * @param i represents the given object
     * @param rowDiv represents the parent container.
     * @return none
     */
    static renderProjectCard(i, rowDiv){

        // Create a column div for each project
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4 mb-4";

        // Create HTML Content and append to column
        colDiv.innerHTML = '';
        const cardDiv = document.createElement("div");
        cardDiv.className = "card on-hover";

        const image = document.createElement("img");
        image.src = Project.ProjectCardsArray[i].image;
        image.className = "card-img-top custom-image";
        image.alt = `${Project.ProjectCardsArray[i].title}Image`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = Project.ProjectCardsArray[i].title;

        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = Project.ProjectCardsArray[i].description;

        // Append elements to their respective parents
        cardBody.appendChild(title);
        cardBody.appendChild(description);

        cardDiv.appendChild(image);
        cardDiv.appendChild(cardBody);

        colDiv.appendChild(cardDiv);

        // Append the column to the row
        rowDiv.appendChild(colDiv);
    }
}