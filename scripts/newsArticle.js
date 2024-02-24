/*
Names: Brody Dentinger and Muhammad Yasir Patel
Student IDs: 100561604 and 100854895
Date: January 26, 2024
File: newsArticle.js
Description: CLass file for news article. Allows for creation and handling of article objects for the news page.
*/

"use strict";

class NewsArticle {
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get summary() {
        return this._summary;
    }

    set summary(value) {
        this._summary = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    // Create an array to hold our news articles.
    static NewsArticlesArray = []

    constructor(title, image, author, date, summary, description) {
        this._title = title;
        this._image = image;
        this._author = author;
        this._date = date;
        this._summary = summary;
        this._description = description;
    }

    /**
     * This method will push the given instance object to the news article array.
     * @return none
     */
    pushObjectToArray(){

        NewsArticle.NewsArticlesArray.push(this);
    }


    /**
     * This function will render a news article card (HTML) for a given object.
     *
     * @param i represents a given object of this class.
     * @return none
     */
    static renderNewsArticle(i) {

        // Create the HTML structure (divs, classes, id's, etc) and store the current news article object data in
        // variables. Fill the structure with the object data. Append it to HTML parent.

        // Parent Div creation
        let singleArticleDiv = document.createElement("div");
        singleArticleDiv.setAttribute("class", "post row g-0 p-4 border rounded overflow-hidden " +
            "flex-md-row mb-4 shadow-sm h-md-250 position-relative");
        // News Container Div
        let newsContainer = document.getElementById("news-container");
        newsContainer.appendChild(singleArticleDiv);

        // News Title Section
        let newsPostTitle = document.createElement("h1");
        newsPostTitle.setAttribute("class", "fw-semibold");
        newsPostTitle.textContent = NewsArticle.NewsArticlesArray[i].title;

        // Creating the div to hold image, author, and date
        let imageAuthorAndDateDiv = document.createElement("div");
        imageAuthorAndDateDiv.setAttribute("class", "d-flex align-items-center mb-4 text-muted");

        singleArticleDiv.appendChild(newsPostTitle);
        singleArticleDiv.appendChild(imageAuthorAndDateDiv);


        // News Image
        let newsImageTag = document.createElement("img");
        newsImageTag.setAttribute("class", "mb-0 me-2 rounded-2 news-image-dimensions");
        newsImageTag.setAttribute("src", NewsArticle.NewsArticlesArray[i].image);
        newsImageTag.setAttribute("alt", `${NewsArticle.NewsArticlesArray[i].title} Image`);

        imageAuthorAndDateDiv.appendChild(newsImageTag);

        // News Author
        let newsAuthorSpanTag = document.createElement("span");
        newsAuthorSpanTag.textContent = NewsArticle.NewsArticlesArray[i].author;

        imageAuthorAndDateDiv.appendChild(newsAuthorSpanTag);

        // News Date
        let newsDateSpanTag = document.createElement("span");
        newsDateSpanTag.setAttribute("class", "d-flex align-items-center ms-3");
        newsDateSpanTag.textContent = NewsArticle.NewsArticlesArray[i].date;

        imageAuthorAndDateDiv.appendChild(newsDateSpanTag);

        // Calendar Icon
        let calendarIcon = document.createElement("i");
        calendarIcon.setAttribute("class", "fa-regular fa-calendar");
        newsDateSpanTag.appendChild(calendarIcon);


        // News Summary Section
        let newsSummaryP = document.createElement("p");
        newsSummaryP.textContent = NewsArticle.NewsArticlesArray[i].summary;

        // Read More Link Section
        let readMoreLink = document.createElement("a");
        readMoreLink.setAttribute("class", "text-body-emphasis fw-bold");
        readMoreLink.setAttribute("href", "#");
        readMoreLink.textContent = "Read More..."

        singleArticleDiv.appendChild(newsSummaryP);
        singleArticleDiv.appendChild(readMoreLink);

    }
}
