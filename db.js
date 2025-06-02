/**
 - This is db.js, used to add the raw data to a sqlite3 database.
 - But why database?
    - usually you do not want to make your raw data public and easily available, therefore databasess are more efficient and secure
    - here our data are the quotes, for the project it isn't something to hide but from contribution point fo view it will teach you how organizations work on a surface level an I think that's the standard way of doing it.
    - It's simple. You would have added your data if you are here otherwise refer the documentation first. Rest follow the in-file instructions.
 */


/*           ------ DO NOT CHANGE ANYTHING BELOW UNTIL ELSEWHERE SPECIFIED ------                 */

// import english_data_array from "./data/English/data.js";
// import hindi_data_array from "./data/Hindi/data.js";
// import japanese_data_array from "./data/Japanese/data.js";

    /* --------------CHANGE HERE-------------*/

/** Import the data in the format as above */
// import language_name_data_array from "./data/Language_Name/data.js"


import pkg from 'sqlite3';
const { sqlite3, verbose } = pkg;
const sqlite = verbose();

function writeToDatabase() {

    /* --------------CHANGE HERE-------------*/

    /** Entet your data array name which you imported above as language_name_data_array */
    // eg: let user_data_array = hindi_data_array; 
    let user_data_array = _data_array;

    /** Enter your language name as language_name_quotes */
    // eg: let language_name = "hindi_quotes"
    let table_name = "_quotes";

    /* --------------END-------------*/

    return new Promise((resolve, reject) => {
        const db = new sqlite.Database("./quotes.db", (err) => {
            if (err) {
                reject(err);
                return;
            }

            const createTableQuery = `CREATE TABLE IF NOT EXISTS ${table_name}(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT UNIQUE,
                author TEXT,
                category TEXT,
                likes INTEGER,
                views INTEGER,
                ispublished BOOLEAN,
                isedited BOOLEAN,
                isfeatured BOOLEAN,
                link TEXT,
                UNIQUE(author, content)
            )`;

            // SQLite does not have a dedicated BOOLEAN data type. Instead, it stores boolean values as integers (0 for FALSE and 1 for TRUE).
            // But it does conversion automatically so no need of writing the query this way as of now:
            // INSERT INTO ${language_name} (ispublished, isedited, isfeatured) VALUES (1, 0, 1);

            db.serialize(() => {
                db.run(createTableQuery, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    const insertQuery = `INSERT INTO ${table_name}(content, author, category, likes, views, ispublished, isedited, isfeatured, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    // const values = [data.author, data.content];
                    user_data_array.forEach((object) => {
                        const values = [object.content, object.author, object.category, object.likes, object.views, object.ispublished, object.isedited, object.isfeatured, object.link];
                        // console.log(values);
                        db.run(insertQuery, ...values, (err) => {
                            if (err) {
                                reject(err);
                                return;
                            } else {
                                resolve(`${table_name} Data added successfully!`);
                            }
                        });
                    })

                });
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

// writeToDatabase().then(result => {
//     res.status(201).send(result);
// }).catch(error => {
//     // console.error("Error reading data:", error.message);
//     res.status(409).send("Duplicate data, already exists!");
// });
// });

writeToDatabase().then((message) => {
    console.log(message);
});