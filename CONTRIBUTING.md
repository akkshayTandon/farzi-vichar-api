# About
 Welcome! I really appreciate that you checked out the contributing guide. This means you are thinking of contributing to this project. Well, you are at the right place.
 - If you are a beginner to git/github and open source, this project serves as a great start for you to learn.

## Project Structure
 Before you start contributing to any project it is important to understand the folder structure for that project.
 For this project, the details are as follows:

 1) `data` - This folder contains the data related to all the languages. This is where the actual shayari and quotes reside.
     - for adding a new language make a new folder inside the `data` folder as `data/${Your_language_name}`.
     - add the data file inside the folder as `data/${Your_language_name}/data.js`.
     - NOTE: name the data file as 'data.js' only.
 2) `data_endpoints` - This folder contains the retriever functions, i.e., it is used to access the required language data from the data folder. This folder has seperate files for each language.
     - for adding a retrieval file inside the folder, create file as `data_endpoints/${your_language_name.js}`.
 3) `routes` - This folder contains all the routes the API provides. It has a single file `route.js` which has all the routes, which are mainly:
     - */:language_name* -> returns all of the data for the language if no range is provided.

       - */:language_name?min=value&max=value* -> returns the data in the specified range of min and max.

     - */:language_name/random* -> returns a single random data from the language specified.
  - For contributing to this file, prefer reading the instructions in the file, but the brief is as follows:-
    - import the required retrieval file from the data_endpoints folder in route.js as: 
      - `import your_langauge_name from "../data_endpoints/your_langauge_name.js";`
    - add the case statement in switch-case in each each route as instructed in the file.
 4) `languages.js` - contains an array of all the languages of which the data exists
     - add your language name to the languages_array in lowercase. 
 5) `index.js` - the entry point to this project, **DO NOT CHANGE ANYTHING IN THIS FILE**.

## Installation
 For installation and local setup, follow these steps:

 1. Fork this repository.

 2. Clone the forked repository.

 ```bash
  git clone https://github.com/your_username/farzi-vichar-api
 ```

 3. Create a working branch and start making your changes.

 ```bash
   git checkout -b your-new-branch-name
 ```

 4. Make changes locally.
    - [Add your data](#adding-data)
    - [Add the retriever function](#adding-retriever-function)
    - [Add the Case Statements](#adding-case-statements-inside-route)

5. Commit your changes. Make sure to add a descriptive commit message.

```bash
 git commit -m "your_message"
```

6. When you're finished with the changes, create a pull request, also known as a PR.

7. **After the review and required changes, if any asked for, your PR will be merged.
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

### Adding retriever function 
<hr>

 - Retriever functions are the functions responsible for returning a range of the specfied data using min_value and max_value.
 - For adding retriever function, go to the `data_endpoints` directory.
 - Create a file inside the directory as: 
   - `data_endpoints/your_language_name.js`
 - Inside the `your_language_name.js` file, add the following code:

 ```bash
  import your_language_name_data_array from "../data/Your_language_name/data.js";

const your_language_name = (min, max) => {

    const Data = your_language_name_data_array.filter((item) => {
        if(Number(min) < your_language_name_data_array[0].id || Number(max) < your_language_name_data_array[0].id || Number(max) > your_language_name_data_array[your_language_name_data_array.length-1].id || Number(min) > your_language_name_data_array[your_language_name_data_array.length-1].id  ){
            throw new Error("NOT FOUND");
        }else if(min && max){
            return item.id >= Number(min) && item.id <= Number(max);
        } else if(min){
            return item.id >= Number(min);
        } else if(max){
            return item.id <= Number(max);
        } else{
            return true;
        }
    });

    return Data;
}

 export default your_language_name;
 ```

### Adding case statements inside route
<hr>

 - As already mentioned above the `routes` folder contains all the routes the API provides. It has a single file route.js which provides access to all the language data based on the language name provided. 

 - It uses a simple switch-case for returning the correct language data.

 - Inside `routes/route.js`, follow these steps and for more info [go to the file](routes/route.js) itslef:
   - first import the retirever function:
   ```bash
    import your_langauge_name from "../data_endpoints/your_langauge_name.js";
   ```
   - inside `router.get("/:language_name", ...)` in switch-case, add the following: 
   ```bash
     case "your_languge_name":
                filteredData = your_language_name(min, max);
                break;
   ```
  - inside `router.get("/:language_name/random", ...)` in switch-case, add the following:
    ```bash
     case "your_languge_name":
                filteredData = your_language_name(min, max);
                break;
    ```

# Important
 - If you are a beginner, I would recommend you to use VS Code. Also, [see this](https://www.youtube.com/playlist?list=PLpPVLI0A0OkLBWbcctmGxxF6VHWSQw1hi).

 - Do **not** make changes directly to the `main` branch. Always create a new branch and then start making changes.
   - For directly publishing a local branch to a remote Git repository from terminal, use:
   ```bash
    git push -u origin <branch>
   ```
 - Open the Pull Request or PR from the published branch.