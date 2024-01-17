/**
 - This is the index.js, main entry point of the app;
  
 */

/*  ------ DO NOT CHANGE ANYTHING IN THIS FILE. ------  */

import express from "express";
import 'dotenv/config';
import cors from "cors";

import router from "./routes/route.js";
import languages_array from "./languages.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET']
}))

app.get('/', (req, res) => {
    res.redirect("https://akkshaytandon.github.io/farzi-vichar-api/");
});

app.get("/language-list", (req, res) => {
    res.send(languages_array);
});

app.use("/language", router);

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});

export default app;