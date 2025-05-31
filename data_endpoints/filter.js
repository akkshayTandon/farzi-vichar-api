/*           ------ DO NOT CHANGE ANYTHING BELOW UNTIL ELSEWHERE SPECIFIED ------                 */
/*           --------------------------------------------------------------------                 */

/**
 - This is file for the common filter function. 
 - The filtered quotes function returns the filtered data from the quotes for the specified language.
 - Kindly follow the instructions in comments.
 */


/* ADD YOUR LANGUAGE AS SHOWN BELOW */
import english_data_array from "../data/English/data.js";
import hindi_data_array from "../data/Hindi/data.js";
import japanese_data_array from "../data/Japanese/data.js";

// import language_data_array from "../data/Language/data.js";

const getQuotes = (language) => {
    // const randomIndex = Math.floor(Math.random() * english_data_array.length);
    let quotes;

    switch (language) {
        case 'english': quotes = english_data_array;
            break;
        case 'hindi': quotes = hindi_data_array;
            break;
        case 'japanese': quotes = japanese_data_array;
            break;

        /* ADD
        case "your_languge_name_lowercase": quotes = language_data_array;
            break;
        */

       // TO-DO: Repeat the above template for adding case statements for each language; TRY NOT TO DELETE THE TEMPLATE.
    }
    return quotes;
}

/*           ------ Common filter quotes function, returns quotes on langauge specified ------     */
/*           --------------------------------DO NOT CHANGE-------------------------------------   */

export const filteredQuotesData = (language, min, max) => {
    try {
        const quotes = getQuotes(language);

        /* Function to filter on the basis of min and max value, in case provided */
        const filteredQuotes = quotes.filter((item) => {
            if (Number(min) < quotes[0].id || Number(max) < quotes[0].id || Number(max) > quotes[quotes.length - 1].id || Number(min) > quotes[quotes.length - 1].id) {
                throw new Error("NOT FOUND");
            } else if (min && max) {
                return item.id >= Number(min) && item.id <= Number(max);
            } else if (min) {
                return item.id >= Number(min);
            } else if (max) {
                return item.id <= Number(max);
            } else {
                return true;
            }
        });
        return filteredQuotes;
    } catch (error) {
        return error;
    }
}

