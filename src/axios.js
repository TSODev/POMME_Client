import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://raspberrypi:5002/api/v1',
});

instance.defaults.headers = { 'Content-Type': 'application/json', }
instance.defaults.withCredentials = true;
instance.defaults.timeout = 1000;

export default instance;