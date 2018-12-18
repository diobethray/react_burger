import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-19e9c.firebaseio.com'
});

export default instance;