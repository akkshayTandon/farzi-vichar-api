/**
 - This is route.js, which defines all the api route endpoints one can access.
 -  
    case "your_languge_name":
        filteredData = your_language_name(min, max);
        break;
          
        // Repeat the above template for adding case statements for each language;
 */

import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import languages_array from "../languages.js";

/* ADD YOUR LANGUAGE AS SHOWN BELOW */
import hindi from "../data_endpoints/hindi.js";
import english from "../data_endpoints/english.js";
import { error } from "console";

// import your_langauge_name_in_lower_case from "../data_endpoints/your_langauge_name_in_lower_case.js";

/*           ------ DO NOT CHANGE ANYTHING BELOW UNTIL ELSEWHERE SPECIFIED ------                 */

const router = express.Router();
let filteredData;

// function to return the error page
export function errorPage(response) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // const filePath = path.join(__dirname, "../public", "ErrorPage.html");
    express().use(express.static(path.join(__dirname, "public")));
    const htmlPath = path.join(__dirname, "../public", "index.html");
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    response.set('Content-Type', "text/html");
    response.send(htmlContent);
}

router.get("/", (req, res) => {
    // res.send("please enter a language name");
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const filePath = path.join(__dirname, "../public", "index.html");
    // res.sendFile(filePath);
    errorPage(res);
});

router.get("/:language_name", (req, res) => {

    const { min, max } = req.query;
    const { language_name } = req.params;

    const l = languages_array.filter((lang) => {
        return language_name.toLowerCase() === lang.toLowerCase();
    });

    if (!l.toString()) {
        // res.send("language does not exists".toUpperCase());
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = path.dirname(__filename);
        // const filePath = path.join(__dirname, "../public", "index.html");
        // res.sendFile(filePath);
        errorPage(res);
    } else {
        switch (l.toString()) {
            case "hindi":
                filteredData = hindi(min, max);
                break;
            case "english":
                filteredData = english(min, max);
                break;
            /* 
            case "your_languge_name":
                filteredData = your_language_name(min, max);
                break;
            */
            // TO-DO: Repeat the above template for adding case statements for each language; TRY NOT TO DELETE THE TEMPLATE.
            default:
                break;
        }
    }

    res.json(filteredData);
})

router.get("/:language_name/random", (req, res) => {

    const { min, max } = req.query;
    const { language_name } = req.params;

    const l = languages_array.filter((lang) => {
        return language_name.toLowerCase() === lang.toLowerCase();
    });

    if (!l.toString()) {
        // res.send("language does not exists".toUpperCase());
        errorPage(res);
    } else {
        switch (l.toString()) {
            case "hindi":
                filteredData = hindi(min, max);
                break;
            case "english":
                filteredData = english(min, max);
                break;
            /* 
            case "your_languge_name":
                filteredData = your_language_name(min, max);
                break;
            */
            // TO-DO: Repeat the above template for adding case statements for each language; TRY NOT TO DELETE THE TEMPLATE.
            default:
                break;
        }
    }

    res.json(filteredData[Math.floor(Math.random() * filteredData.length)]);
});

export default router;