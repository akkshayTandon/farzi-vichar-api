/**
 - This is route.js, which defines all the api route endpoints one can access.
 -  MAIN ROUTES
    - a home sub-route inside language route, redirected to main website if langauge not specified
    - a route with language name, gets all quotes from the language if exists
    - a route with language name and random, gets a random quote from the language if exists
 */

import express from "express";
import languages_array from "../languages.js";

import { filteredQuotesData } from "../data_endpoints/filter.js";


/*           ------ DO NOT CHANGE ANYTHING BELOW UNTIL ELSEWHERE SPECIFIED ------                 */

const router = express.Router();
let filteredData;

router.get("/", (req, res) => {
    res.redirect("https://akkshaytandon.github.io/farzi-vichar-api/");
});

router.get("/:language_name", (req, res) => {

    const { min, max } = req.query;
    const { language_name } = req.params;

    const l = languages_array.filter((lang) => {
        return language_name.toLowerCase() === lang.toLowerCase();
    });

    if (!l.toString()) {
        res.redirect("https://akkshaytandon.github.io/farzi-vichar-api/");
    } else {

        filteredData = filteredQuotesData(l.toString(), min, max);

        res.json(filteredData);
    }
})

router.get("/:language_name/random", (req, res) => {

    const { min, max } = req.query;
    const { language_name } = req.params;

    const l = languages_array.filter((lang) => {
        return language_name.toLowerCase() === lang.toLowerCase();
    });

    if (!l.toString()) {
        res.redirect("https://akkshaytandon.github.io/farzi-vichar-api/");
    } else {

        filteredData = filteredQuotesData(l.toString(), min, max);

        res.json(filteredData[Math.floor(Math.random() * filteredData.length)]);
    }
});

export default router;