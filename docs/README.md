# About
 Welcome! I really appreciate that you checked out the contributing guide. This means you are thinking of contributing to this project. Well, you are at the right place.
 - If you are a beginner to git/github and open source, this project serves as a great start for you to learn.

## Project Structure
 Before you start contributing to any project it is important to understand the folder structure for that project.
 For this project, the details are as follows:

 1) `data` - This folder contains the data related to all the languages. This is where the actual shayari and quotes reside. 
 
       - for [adding a new language data](#adding-data) make a new folder inside the `data` folder as `data/${Your_Language_Name}`. 
       - add the data file inside the folder as `data/${Your_Language_Name}/data.js`. 
       - NOTE: name the data file as 'data.js' only.
       - then [update the database](#updating-the-database) `quotes.db`, an sqlite3 database. 
       
 2) `data_endpoints` - This folder contains the retriever or the filetered quotes function. It return the filtered data for the language specified. It's usecase can be viewed in the `routes/route.js` file.
      - there is a single file, `filter.js` , **DO NOT CHANGE ANYTHING IN THIS FILE**
     
 3) `routes` - This folder contains all the routes the API provides. It has a single file `route.js` (**DO NOT CHANGE ANYTHING IN THIS FILE**) which has all the routes, which are mainly: <br>
    
     - */:language_name* -> returns all of the data for the language if no range is provided.
    
     - */:language_name?min=value&max=value* -> returns the data in the specified range of min and max. 

     - */:language_name/random* -> returns a single random data from the language specified. 
       
 4) `languages.js` - contains an array of all the languages for which the data exists.
     <!-- - add your language name to the languages_array in lowercase. -->
       
 5) `index.js` - the entry point to this project, **DO NOT CHANGE ANYTHING IN THIS FILE**.

 6) `db.js` - the file is used to update the database, anytime a new language is added to the API.

## Installation and Making Changes
 For installation and local setup, follow these steps:

- Fork this repository.

- Clone the forked repository.

  ```bash
  git clone https://github.com/your_username/farzi-vichar-api
  ```

- Run the following command to start your local server

  ```bash
  npm install
  npm start
  ```

- Create a working branch and start making your changes.

  ```bash
   git checkout -b your-new-branch-name
  ```

- Make changes locally.
    - [Add your data](#adding-data)
    - [Update the database](#updating-the-database)
    <!-- - [Add the language case statement in retriever/filter function file](#modifying-retriever-or-filter-function-file) -->
    <!-- - [Add the Case Statements](#adding-case-statements-inside-route) -->

- Commit your changes. Make sure to add a descriptive commit message.

  ```bash
  git commit -m "your_message"
  ```

- When you're finished with the changes, create a pull request, also known as a PR.

- **After the review and required changes, if any asked for, your PR will be merged.
Congratulations 🎉🎉**

### Adding Data 
<hr>

 - For adding the langauage data, i.e. the quotes, go to the `data` directory.
 - Create a folder of your language inside the `data` directory, (follow the pattern of already made directories) as:
   - `data/Your_Language_Name`
 - create the data.js file inside your language folder:
   - `data/Your_Language_Name/data.js`
 - create an array: `const your_language_name_data_array = []`, which will be an array of objects. After adding the data export the array using `export default your_language_name_data_array`.

   - The object should contain key-value pairs. Here is sample:

   ```bash
    const example_data_array = [
        {
            id: 1,
        content:
            "",
        author: "",
        category: "",
        likes: 0,
        views: 0,
        ispublished: false,
        isedited: false,
        isfeatured: false,
        link: "",
        }
    ];

    export default example_data_array;
   ```
   - Breakdown of keys
     1. *id* : the id of the object starting from 1 to N.
     2. *content* : the content/data/quote to be added
     3. *author* : the name of the author of the quote, if not known write "anonymous"
     4. *category* : the category of the quote, for example, motivation/love/hope etc. 
     5. *likes* : if there is a likes metrics associated with the quote at the time of adding otherwise write 0.
     6. *views* : if there is a views metrics associated with the quote at the time of adding otherwise write 0.
     7. *ispublished* : is the quotes published anywhere, then "true" otherwise "false".
     8. *isedited* : if you added a modified version of the original quote, then "true" otherwise "false".
     9. *isfeatured* : if the quotes is original written by some famous person, then "true" otherwise "false".
     10. *link* : if a direct link to the quote is available, be it text/atricle/website/video provide the link.
  
  - add your language name to the languages_array in lowercase in the [language.js](../languages.js) file.
  - So, now we have the data but it needs to be added to the database to be available, follow the next section.

### Updating the database
<hr>

 - It is a good practice to use database for data handling operations, that is the standard way. We use a sqlite3 database. The choice is so because didn't wanted the hassle of setting a large scale database for just a little task and hence went lightweight mode.
 - For adding data to database, open the `db.js` [file](../db.js), follow in-file instructions:

    - You just need to modify three lines.
      - first you import your data
      - second, assign you data to the `user_data_array` variable
      - third, modify language name in the format `your_language_name_quotes`

    - Run the `db.js` file using `node`, receiving output as: `your_language_name data was added successfully.`

    ```bash
      node db.js
      or 
      node .\db.js
      or
      node ./db.js

      // OUTPUT on console: "your_language_name data was added successfully."
    ```
  - Congratulations 👏, the data is added to the database. You may further test it by making a request.

# Important
 - If you are a beginner, I would recommend you to use VS Code. Also, [see this](https://www.youtube.com/playlist?list=PLpPVLI0A0OkLBWbcctmGxxF6VHWSQw1hi).

 - Do **NOT** make changes directly to the `main` branch. Always create a new branch and then start making changes.
   - For directly publishing a local branch to a remote Git repository from terminal, use:
   ```bash
    git push -u origin <branch>
   ```
 - Open the Pull Request or PR from the published branch.
 - HAPPY CONTRIBUTING 😀.
