# Farzi Vichar API
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
 - The method(s) you can use is only `GET`.
 - The API is structured in a way that you will need to provide a language to the route, otherwise you will receive an error.
 - The route is such : `https://farzi-vichar-api.vercel.app/language/${language_name}`.
 - **Example**: [access hindi data](https://farzi-vichar-api.vercel.app/language/hindi). Similarily you can access data for  other languages also.
 - For getting the list of languages, use:
 
   ```bash
   https://farzi-vichar-api.vercel.app/language-list
   ```

# Structure
 - There are mainly three ways to access a language data:
    - either full data of the language provided
    - or a range of data from the language provided
    - or a random data from the language provided
 - For accessing full data, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}`
 - For accessing data in a range, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}?min=${min_value}&max=${max_value}`
 - For accessing a random data, use the route as : `https://farzi-vichar-api.vercel.app/language/${language_name}/random`

# Contributing to the project
 - Read [CONTRIBUTING.md](/docs/README.md) for guidelines.

# TO_DO 
 - [x] Handle errors with better response
 - [ ] Add data in existing language(s) 
 - [ ] Add data for more languages