# About
 Welcome! I really appreciate that you checked out the contributing guide. This means you are thinking of contributing to this project. Well, you are at the right place.
 - If you are a beginner to git/github and open source, this project serves as a great start for you to learn.

## Project Structure
 Before you start contributing to any project it is important to understand the folder structure for that project.
 For this project, the details are as follows:

 1) `data` - This folder contains the data related to all the languages. This is where the actual shayari and quotes reside. 
 
       - for adding a new language make a new folder inside the `data` folder as `data/${Your_Language_Name}`. 
       - add the data file inside the folder as `data/${Your_Language_Name}/data.js`. 
       - NOTE: name the data file as 'data.js' only. 
       
 2) `data_endpoints` - This folder contains the retriever or the filetered quotes function. It return the filtered data for the language specified. It's usecase can be viewed in the `routes/route.js` file. <br>
 
     - for adding a retrieval file inside the folder, create file as `data_endpoints/${your_language_name.js}`. 
     
 3) `routes` - This folder contains all the routes the API provides. It has a single file `route.js` (**DO NOT CHANGE ANYTHING IN THIS FILE**) which has all the routes, which are mainly: <br>
    
     - */:language_name* -> returns all of the data for the language if no range is provided.
    
     - */:language_name?min=value&max=value* -> returns the data in the specified range of min and max. 

     - */:language_name/random* -> returns a single random data from the language specified. 
     
  <!-- -  For contributing to this file, prefer reading the instructions in the file, but the brief is as follows:- <br>
  
     - import the required retrieval file from the data_endpoints folder in route.js as:
        
        - `import your_langauge_name from "../data_endpoints/your_langauge_name.js";` <br>
        
     - add the case statement in switch-case in each each route as instructed in the file. -->
       
 4) `languages.js` - contains an array of all the languages of which the data exists
     - add your language name to the languages_array in lowercase.
       
 5) `index.js` - the entry point to this project, **DO NOT CHANGE ANYTHING IN THIS FILE**.

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
    - [Add the language case statement in retriever/filter function file](#modifying-retriever-or-filter-function-file)
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

 - For adding the langauage data, ex: quotes, go to the `data` directory.
 - Create a folder of your language inside the `data` directory, (follow the pattern of already made directories) as:
   - `data/Your_language_name`
 - create the data.js file inside your language folder:
   - `data/Your_language_name/data.js`
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

### Modifying retriever or filter function file 
<hr>

 - Retriever or Filtered Quotes function is the function responsible for returning all or a range of the specfied data using min_value and max_value for a given language if exists.
 - For adding retriever function, go to the `data_endpoints` directory and open `filter.js` file.

    - It uses a simple switch-case for filtering the data for a given language and a filter function to return the filtered data from the selected language data.

    - Inside `data_endpoints/filter.js`, follow these steps and for more info [go to the file](../data_endpoints/filter.js) itslef:
      - import the language data and then add the case statement:

    ```bash
     import language_data_array from "../data/Language/data.js";

     // ...code
     
     /* inside getQuotes function */

        case "your_languge_name_lowercase": 
            quotes = language_data_array;
            break;
      
      // ...code
      ```

# Important
 - If you are a beginner, I would recommend you to use VS Code. Also, [see this](https://www.youtube.com/playlist?list=PLpPVLI0A0OkLBWbcctmGxxF6VHWSQw1hi).

 - Do **not** make changes directly to the `main` branch. Always create a new branch and then start making changes.
   - For directly publishing a local branch to a remote Git repository from terminal, use:
   ```bash
    git push -u origin <branch>
   ```
 - Open the Pull Request or PR from the published branch.
 - HAPPY CONTRIBUTING😀
