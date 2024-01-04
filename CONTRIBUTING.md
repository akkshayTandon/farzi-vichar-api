# About
 Welcome! I really appreciate that you checked out the contributing guide. This means you are thinking of contributing to this project. Well, you are at the right place.
 - If you are a beginner to git/github and open source, this project serves as a great start for you to learn.

## Project Structure
 Before you start contributing to any project it is important to understand the folder structure for that project.
 For this project, the details are as follows:

 1) `data` - This folder contains the data related to all the languages. This is where the actual shayari and quotes reside.
     - for adding a new language make a new folder inside the `data` folder as `data/${Your_language_name}/data.js`.
     - name the data file as 'data.js' only.
 2) `data_endpoints` - This folder contains the retriever functions, i.e., it is used to access the required language data from the data folder. This folder has seperate files for each language.
     - for adding a retrieval file inside the folder, create file as `data_endpoints/${your_language_name.js}`.
 3) `routes` - This folder contains all the routes the API provides. It has a single file `route.js` which is has all the routes, which are mainly:
     - /:language_name - returns all of the data for the language if no range is provided.
     - /:language_name?min=value&max=value - returns the data in the specified range of min and max.
     - /:language_name/random - returns a single random data from the language specified.
  - For contributing to this file, prefer reading the instructions in the file, but the brief is as follows:-
    - import the required retrieval file from data_endpoints folder: `import your_langauge_name from "../data_endpoints/your_langauge_name.js";`
    - add the case statement in switch-case in each each route as instructed in the file.
 4) `languages.js` - contains an array of all the languages of which the data exists
     - add your language name to the languages_array in lowercase. 
 5) `index.js` - the entry point to this project, **DO NOT CHANGE ANYTHING IN THIS FILE**.