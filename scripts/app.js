"use strict";

// IIFE - Immediately invoked functional expression . Doesn't have a name, calls itself
// the () at the end makes it a IIFE
(function(){

    // Functions that provide actions when a page is loaded. Will be implemented in our switch.
    function DisplayHomepage(){
        console.log("Called Display Homepage...");

        // Store the about us button by its id.
        let AboutUsButton = document.getElementById("AboutUsBtn");

        // add an event listener, to handle a click event, and add a function that happens on click.
        AboutUsButton.addEventListener("click", function(){
            location.href = "about.html";
        });

        // Fetching the element by its html tag name. Elements by tag is array based (How many elements are "main".
        let MainContent = document.getElementsByTagName("main")[0];

        // Creating a p element, and giving it an id, class, and setting its sting content
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");
        MainParagraph.textContent = "This is my first paragraph.";

        // Attaching the paragraph to the main content (Main tag)
        MainContent.appendChild(MainParagraph);

        let FirstString = "This is";
        let SecondString = `${FirstString} the main paragraph.`;
        MainParagraph.textContent = SecondString;

        // Re-appending because JS is sequential top down. So we need to re-render changes.
        MainContent.appendChild(MainParagraph);

        let DocumentBody = document.body;

        // Can author raw html but it's not recommended.
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id = "ArticleParagraph" class = "mt-3">This is my article paragraph.</p>`;
        Article.setAttribute("class", "container");

        // Inner HTML will append the value to the inside of the given tag. Then append it to the document body.
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
    }

    function DisplayAboutUs(){
        console.log("Called About Us...");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage...");
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage...");
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage...");
    }

    function Start(){
        console.log("App Started...");

        // Creating a switch that checks the title for the current page.
        switch(document.title){
            case "Home":
                DisplayHomepage();
                break;

            case "About Us":
                DisplayAboutUs();
                break;

            case "Contact Us":
                DisplayContactUsPage();
                break;

            case "Our Products":
                DisplayProductPage();
                break;

            case "Our Services":
                DisplayServicesPage();
                break;
        }
    }
    window.addEventListener("load", Start);

}) ()