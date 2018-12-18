import axios from 'axios';
import { firebase } from './store/firebase/firebase';

const instance = axios.create({
    baseURL: firebase.FIREBASE_URL
});

export default instance;