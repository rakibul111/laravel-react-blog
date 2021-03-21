import axios from "axios";

// Category object contains two methods
const Category = {
    getAll: () => {
        return axios.get('/categories?all=1');
    },
    getById: (id) => {
        return axios.get('/categories/' + id);
    }
};

export default Category;