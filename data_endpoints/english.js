import english_data_array from "../data/English/data.js";

const english = (min, max) => {

    const Data = english_data_array.filter((item) => {
        if (Number(min) < english_data_array[0].id || Number(max) < english_data_array[0].id || Number(max) > english_data_array[english_data_array.length - 1].id || Number(min) > english_data_array[english_data_array.length - 1].id) {
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

    return Data;
}

export default english;