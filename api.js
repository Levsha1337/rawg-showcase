import config from './config.json';
const key = config.api_key;
const req_key = '?key=' + key;
const base = 'https://api.rawg.io/api';

export default {
    get(link) {
        return fetch(base + link + req_key).then(r => r.json());
    },
    
    next(link) {
        return fetch(link).then(r => r.json());
    }
};
