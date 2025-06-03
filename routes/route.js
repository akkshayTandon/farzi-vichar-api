/**
 - This is route.js, which defines all the api route endpoints one can access.
 -  MAIN ROUTES
    - a home sub-route inside language route, redirected to main website if langauge not specified
    - a route with language name, gets all quotes from the language if exists
    - a route with language name and random, gets a random quote from the language if exists
 */

import express from "express";
import languages_array from "../languages.js";

// import { filteredQuotesData } from "../data_endpoints/filter.js";


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
        filteredData.then((data)=>{
            console.log("language", data)
            res.json(data);
        })
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
        filteredData.then((data)=>{
            // console.log(data);
            res.json(data[Math.floor(Math.random() * data.length)]);
        })
    }
});

export default router;

import pkg from 'sqlite3';
const { sqlite3, verbose } = pkg;
const sqlite = verbose();

function readDataFromDatabase(databaseFile, tableName) {
    return new Promise((resolve, reject) => {
        const db = new sqlite.Database(databaseFile, (err) => {
            if (err) {
                reject(err);
                return;
            }

            console.log('Connected to database');

            const query = `SELECT * FROM ${tableName}`; // Modify to select specific columns if needed

            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows); // Array of objects representing the table data
                }
            });

            db.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                // resolve("Connection closed");
             console.log("closed connection");
            }); // Close the connection after the query finishes
        });
    });
}

const getQuotes = async (language) => {
    // const randomIndex = Math.floor(Math.random() * english_data_array.length);
    // let quotes;

    try {
        const data = await readDataFromDatabase('quotes.db', `${language}_quotes`);
     console.log("getquotes", data);
        return data;
    } catch (error) {
        console.error('Error reading data:', error.message);
    }
}

const filteredQuotesData = async (language, min, max) => {
    try {
        const quotes = await getQuotes(language);
        // console.log(quotes)
        /* Function to filter on the basis of min and max value, in case provided */
        const filteredQuotes = quotes.filter((item) => {
            if (Number(min) < quotes[0].id || Number(max) < quotes[0].id || Number(max) > quotes[quotes.length - 1].id || Number(min) > quotes[quotes.length - 1].id) {
                throw new Error("NOT FOUND");
            } else if (min && max) {
                return item.id >= Number(min) && item.id <= Number(max);
            } else if (min) {
                return item.id >= Number(min);
            } else if (max) {
                return item.id <= Number(max);
            } else {
                return true;
            }
        });
        // console.log(filteredQuotes);
        return filteredQuotes;
    } catch (error) {
        return error;
    }
}
