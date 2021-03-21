import axios from 'axios';

const Comment = {
    list: (page = 1) => {
        return axios.get('/comments?page=' + page);
    },
    showOne: (id) => {
        return axios.get('/comments/' + id);
    },
    edit: (payload, id) => {
        return axios.put('/comments/' + id, payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token")}});
    },
    remove: (id) => {
        return axios.delete('/comments/' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem("user.api_token")}});
    }
};

export default Comment;