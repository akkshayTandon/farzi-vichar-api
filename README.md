# [Farzi Vichar API](https://github.com/akkshayTandon/farzi-vichar-api)
- Hi! My name is Akkshay Tandon. Apart from development, there is another side of mine.
I started writing some shayari out of interest in my second year of college and without even realizing I wrote many of them, although not all of them are added in the API still.
I even started a instagram page by the name [Farzi Vichar](https://www.instagram.com/farzivichar/).

- But there was something missing, and then a random thought came to my mind of combining both my technical and writing skills.There came the idea of this API. 

- I have decided to make this project open source, so if you are getting started with open source or you just want to add more data, consider this repository to contribute. You will find more details related to contributing [here](/docs/README.md).

# Implementations
 - This is the current list of implementations:

   - [Random Hindi Shayari Website](https://hindi-shayari.netlify.app/)
   - [Random Shayari Generator Extension](https://microsoftedge.microsoft.com/addons/detail/niaelonohcpmicnibpfegdkndgciphbe)

# Usage
 - The method(s) you can use are, only `GET` and `POST`.
 - The API is structured in a way that you will need to provide a language to the route, otherwise you will receive an error.
 - The route is such : `https://farzi-vichar-api.vercel.app/language/${language_name}`.
 - **Example**: [access hindi data](https://farzi-vichar-api.vercel.app/language/hindi). Similarily you can access data for other languages also.
 - For getting the list of languages, use:
 
   ```bash
   https://farzi-vichar-api.vercel.app/language-list
   ```
 - For adding user submitted quotes, use:

   ```bash
   const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "author": "Test Author",
        "content": "Test Author content"
      })
   };
   fetch('https://farzi-vichar-api.vercel.app/add-user-quote', options).then(response => response.json()).then(data => console.log(data)).catch((error) => {
      console.log(error);
    });
   ```

# Structure
 - There are mainly two types of data in the API you can access:
    - categorized by languages, the already added data in the API, read-only, modifiable by developers:
      - either full data of the language provided
        - For accessing full data, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}`
      - or a range of data from the language provided
        - For accessing data in a range, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}?min=${min_value}&max=${max_value}`
      - or a random data from the language provided
        - For accessing a random data, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}/random`
    - the user quotes, which are submitted by user:
      - this does not goes into any categorized language as it is seperately handled. The usecase of this route is if someone wants their user to submit quotes from the client, so it is not just limited to the already      existing data.
      - For adding user submitted quotes, use: `https://farzi-vichar-api.vercel.app/add-user-quote` with JSON body content.

      ```bash
      /* CLIENT SIDE CODE EXAMPLE */

      const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "author": "Test Author",
        "content": "Test Author content"
       })
      };
      fetch('https://farzi-vichar-api.vercel.app/add-user-quote', options).then(response => response.json()).then(data => console.log(data)).catch((error) => {
      console.log(error);
      });
      ```
      - For reading all the user submitted quotes, use: `https://farzi-vichar-api.vercel.app/get-user-quotes`
# Contributing to the project
 - Read [CONTRIBUTING.md](/docs/README.md) for guidelines.

# TO_DO 
 - [x] Add a database to the API to read and write user submitted quotes
 - [ ] May move to SQLite database for read-only, already available data
 - [x] Handle errors with better response
 - [x] Add data in existing language(s) 
 - [ ] Add data for more languages