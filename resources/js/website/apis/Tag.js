import axios from "axios";

const Tag = {
    getAll: () => {
        return axios.get('/tags?all=1');
    },
    getById: (id) => {
        return axios.get('/tags/' + id);
    }
};

export default Tag;