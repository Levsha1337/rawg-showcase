import { api_key as key } from './config.json';
const base = 'https://api.rawg.io/api';

export default {
    _encodeQueryString(object) {
        return '?' + new URLSearchParams({
            ...object,
            key
        });
    },

    get(link, keyValues) {
        const kvs = this._encodeQueryString(keyValues);
        
        return fetch(base + link + kvs).then(r => r.json());
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
