import hindi_data_array from "../data/Hindi/data.js";

const hindi = (min, max) => {

    const Data = hindi_data_array.filter((item) => {
        if (Number(min) < hindi_data_array[0].id || Number(max) < hindi_data_array[0].id || Number(max) > hindi_data_array[hindi_data_array.length - 1].id || Number(min) > hindi_data_array[hindi_data_array.length - 1].id) {
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

export default hindi;