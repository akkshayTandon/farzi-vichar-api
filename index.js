/**
 - This is the index.js, main entry point of the app;
  
 */

/*  ------ DO NOT CHANGE ANYTHING IN THIS FILE. ------  */

import express from "express";
import 'dotenv/config';
import cors from "cors";
// import { sqlite3, verbose } from "sqlite3";
import pkg from 'sqlite3';
import { sql } from "@vercel/postgres";

import router from "./routes/route.js";
import languages_array from "./languages.js";

const port = process.env.PORT || 3000;
const enviornment = process.env.NODE_ENV
const app = express();
const { sqlite3, verbose } = pkg;
const sqlite = verbose();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST']
}))
// app.use(cors())

app.get('/', (req, res) => {

    if (enviornment === "development") {
        res.send("Hello on LOCAL HOST");
    }

    if (enviornment === "production") {
        res.redirect("https://akkshaytandon.github.io/farzi-vichar-api/")
    }

});

app.get("/language-list", (req, res) => {
    res.send(languages_array);
});

app.get("/get-user-quotes", (req, res) => {
    async function readQuote() {
        try {
            const { rows } = await sql`SELECT * from user_quotes_table`;
            // console.log(rows);
            return res.status(200).json({ "message": "read successfully", "data": rows });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ "message": "attempt to read database failed" });
        }
    }
    readQuote();
});

app.post("/add-user-quote", express.json(), (req, res) => {
    const data = req.body;
    // console.log(data)

    async function addQuote() {
        try {
            await sql`CREATE TABLE IF NOT EXISTS user_quotes_table(
                id SERIAL PRIMARY KEY,
                author TEXT,
                content TEXT UNIQUE,
                UNIQUE (author, content)
                );`;
            await sql`INSERT INTO user_quotes_table(author, content) VALUES (${data.author}, ${data.content});`;
            return res.status(200).json({ "message": "values inserted successfully" });
        } catch (error) {
            // console.log(error);
            return res.status(500).json({ "message": "Error inserting values into the database", "error": error });
        }
    }

    addQuote();
});

app.use("/language", router);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;