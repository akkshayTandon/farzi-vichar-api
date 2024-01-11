/**
 - This is the index.js, main entry point of the app;
 - NOTE: DO NOT CHANGE ANY THING IN THIS FILE.
 
 */

import express from "express";
import 'dotenv/config';
import cors from "cors";

import all from "./routes/route.js";
import languages_array from "./languages.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET']
}))

app.get('/', (req, res) => {
    res.send("Home , this is index, try giving a language to the route");
});

app.get("/language-list", (req, res) => {
    res.send(languages_array);
});

app.use("/language", all);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;