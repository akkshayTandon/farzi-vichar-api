/**
 - This is the index.js, main entry point of the app;
  
 */

/*  ------ DO NOT CHANGE ANYTHING IN THIS FILE. ------  */

import express from "express";
import 'dotenv/config';
import cors from "cors";
// import { sqlite3, verbose } from "sqlite3";
import pkg from 'sqlite3';

import router from "./routes/route.js";
import languages_array from "./languages.js";

const port = process.env.PORT || 3000;
const enviornment = process.env.NODE_ENV
const app = express();
const { sqlite3, verbose } = pkg;
const sqlite = verbose();

app.use(cors({
    origin: ["http://127.0.0.1:5500/", "*"],
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

app.get("/user-data", (req, res) => {

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

                db.close(); // Close the connection after the query finishes
            });
        });
    }
    readDataFromDatabase('quotify.db', 'test_table')
        .then(data => {
            console.log('Data from database:', data);
            // Process the retrieved data here (e.g., display in a table, manipulate)
            res.json(data);
        })
        .catch(error => {
            console.error('Error reading data:', error.message);
        });
    // res.json(user_data_array);
});

app.options("/add-data", cors()); // Handle preflight OPTIONS request

app.post("/add-data", express.json(), (req, res) => {
    const data = req.body;

    function writeToDatabase() {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database("./quotify.db", (err) => {
                if (err) {
                    console.error("Error opening database:", err.message);
                    reject(err);
                    return;
                }

                console.log("Connected to database");

                const createTableQuery = `CREATE TABLE IF NOT EXISTS test_table (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    author TEXT,
                    content TEXT UNIQUE,
                    UNIQUE (author, content)
                );`;
                const insertQuery = `INSERT INTO test_table(author, content) VALUES (?, ?)`;

                db.serialize(() => {
                    db.run(createTableQuery, (err) => {
                        if (err) {
                            console.error("Error creating table: ", err.message);
                            reject(err);
                            return;
                        }
                        console.log("created table");

                        db.run(insertQuery, [data.author, data.content], (err) => {
                            if (err) {
                                console.error("Error inserting data", err.message);
                                reject(err);
                                return;
                            }
                            console.log("Data inserted successfully");
                            resolve({ status: 201, message: "done success" });
                        });
                    });
                });

                // Close the database connection after executing all queries
                db.close((err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log("Close the database connection.");
                });
            });
        });
    }

    writeToDatabase()
        .then((data) => {
            console.log(data);
            res.status(data.status).json(data.message);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});


app.use("/language", router);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;