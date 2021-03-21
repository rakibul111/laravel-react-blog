import axios from 'axios';

const Post = {
  getRecent: () => {
      return axios.get('/posts?recent=1');
  },
  getByCategory: (id, page = 1) => {
      return axios.get('/posts?category=' + id + '&page=' + page);
  },
    getByTag: (tag, page = 1) => {
        return axios.get('/posts?tag=' + tag + '&page=' + page);
    },
    getById: (id) => {
      return axios.get('/posts/' + id);
    }
};

export default Post;