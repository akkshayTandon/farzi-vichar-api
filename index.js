/**
 - This is the index.js, main entry point of the app;
  
 */

/*  ------ DO NOT CHANGE ANYTHING IN THIS FILE. ------  */

import express from "express";
import 'dotenv/config';
import cors from "cors";
import { user_data_array } from "./data/User/data.js";
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

app.post("/add-data", express.json(), (req, res) => {

    const data = req.body;

    let defaultResponseData = "Data added successfully!";
    let duplicateFlag = false;

    if (user_data_array.length === 0) {
        user_data_array.push(data);
    } else if (user_data_array.length > 0) {

        for (let i = 0; i < user_data_array.length; i++) {
            if ((user_data_array[i].author === data.author) || (user_data_array[i].content === data.content)) {
                duplicateFlag = true;
                break;
            }
        }

        duplicateFlag ? defaultResponseData = "Duplicate data, already exists!" : user_data_array.push(data)
    }

    console.log(user_data_array)
    const { sqlite3, verbose } = pkg;
    const sqlite = verbose();
    function writeToDatabase() {
        const db = new sqlite.Database("./quotify.db", (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
                return;
            }
            console.log("Connected to database");

            const createTableQuery = `CREATE TABLE IF NOT EXISTS test_table (
                author TEXT,
                content TEXT,
                UNIQUE (author, content)
              );`;
            db.run(createTableQuery, (err) => {
                if (err) {
                    console.error("Error creating table: ", err.message);
                    return;
                }
                const insertQuery = `INSERT INTO test_table(author, content) VALUES (?, ?)`;
                user_data_array.forEach((object) => {
                    const values = [object.author, object.content];
                    db.run(insertQuery, ...values, (err) => {
                        if (err) {
                            console.error("Error inserting data", err.message);
                        } else {
                            console.log("Data inserted successfully");
                        }
                    });
                });
            });

            // Close the database connection
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close the database connection.");
            });
        });
    }
    writeToDatabase();
    duplicateFlag ? res.status(409).send(defaultResponseData) : res.status(201).send(defaultResponseData);
});

app.use("/language", router);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;