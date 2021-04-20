import config from './config.json';
const key = config.api_key;
const req_key = '?key=' + key;
const base = 'https://api.rawg.io/api';

export default {
    get(link, keyValues) {
        let kvs = '';
        if (keyValues != undefined) {
            kvs = Object.keys(keyValues)
                .map(key => `&${key}=${keyValues[key]}`)
                .join('');
        }
        
        return fetch(base + link + req_key + kvs).then(r => r.json());
    },
    
    next(link) {
        return fetch(link).then(r => r.json());
    },

    async getPlatforms() {
        let res = await this.get('/platforms');
        let platforms = res.results;

        while (res.next !== null) {
            res = await this.next(res.next);
            platforms = platforms.concat(res.results);
        }
        
        return platforms;
    },

    async getScreenshots(game) {
        let res = await this.get(`/games/${game}/screenshots`);
        let screens = res.results;

        while (res.next !== null) {
            res = await this.next(res.next);
            screens = screens.concat(res.results);
        }
        
        return screens.filter(screen => !screen.is_deleted);
    }
};
