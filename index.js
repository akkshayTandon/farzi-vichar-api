/**
 - This is the index.js, main entry point of the app;
  
 */

/*  ------ DO NOT CHANGE ANYTHING IN THIS FILE. ------  */

import express from "express";
import 'dotenv/config';
import cors from "cors";
import pkg from 'sqlite3';

import router from "./routes/route.js";
import languages_array from "./languages.js";

const port = process.env.PORT || 3000;
const enviornment = process.env.NODE_ENV;
const app = express();

const { sqlite3, verbose } = pkg;
const sqlite = verbose();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST']
}))

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

app.get("/user-data", (req, res) => {

    function readDataFromDatabase(databaseFile, tableName) {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database(databaseFile, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // console.log('Connected to database');

                const query = `SELECT * FROM ${tableName}`; // get all rows query

                db.all(query, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows); // Array of objects representing the table data
                    }
                });

                db.close(); // Close the connection after the query finishes

                // console.log("Closed Database Connection");
            });
        });
    }

    readDataFromDatabase("quotify.db", "user_quotes")
        .then(data => {
            // console.log('Data from database:', data);

            res.json(data);  // Process the retrieved data here (e.g., display in a table, manipulate)
        })
        .catch(error => {
            console.error("Error reading data:", error.message);
        });
});

app.post("/add-data", express.json(), (req, res) => {

    const data = req.body;

    function writeToDatabase() {

        return new Promise((resolve, reject) => {
            const db = new sqlite.Database("./quotify.db", (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                const createTableQuery = `CREATE TABLE IF NOT EXISTS user_quotes (
                author TEXT UNIQUE,
                content TEXT UNIQUE,
                UNIQUE (author, content)
              );`;

                db.run(createTableQuery, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        const insertQuery = `INSERT INTO user_quotes(author, content) VALUES (?, ?)`;
                        const values = [data.author, data.content];
                        db.run(insertQuery, values, (err) => {
                            if (err) {
                                reject(err);
                                return;
                            } else {
                                resolve("Data added successfully!");
                            }
                        });
                    }
                });

                db.close((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // resolve("Connection closed");
                });
            });
        });
    }

    writeToDatabase().then(result => {
        res.status(201).send(result);
    }).catch(error => {
        // console.error("Error reading data:", error.message);
        res.status(409).send("Duplicate data, already exists!");
    });
});

app.use("/language", router);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;