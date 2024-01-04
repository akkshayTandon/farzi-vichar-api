/**
 - This is route.js, which defines all the api route endpoints one can access.
 -  
    case "your_languge_name":
        filteredData = your_language_name(min, max);
        break;
          
        // Repeat the above template for adding case statements for each language;
 */

import express from "express";
import languages_array from "../languages.js";

/* ADD YOUR LANGUAGE AS SHOWN BELOW */
import hindi from "../data_endpoints/hindi.js";
import english from "../data_endpoints/english.js";

// import your_langauge_name_in_lower_case from "../data_endpoints/your_langauge_name_in_lower_case.js";

const router = express.Router();
let filteredData;

router.get("/", (req, res) => {
    res.send("please enter a language name")
});

router.get("/:language_name", (req, res) => {

    const { min, max } = req.query;
    const { language_name } = req.params;

    const l = languages_array.filter((lang) => {
        return language_name === lang;
    });

    if (!l.toString()) {
        res.send("language does not exists".toUpperCase());
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
            // Repeat the above template for adding case statements for each language;
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
        return language_name === lang;
    });

    if (!l.toString()) {
        res.send("language does not exists".toUpperCase());
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
            // Repeat the above template for adding case statements for each language;
            default:
                break;
        }
    }

    res.json(filteredData[Math.floor(Math.random() * filteredData.length)]);
});

export default router;