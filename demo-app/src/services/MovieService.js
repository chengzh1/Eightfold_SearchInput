import axios from 'axios';

const API_PREFIX = 'http://www.omdbapi.com/?apikey=f6bfa0de';

class MovieService {
    constructor() {
        this.idToDirectorMap = new Map();
    }

    async search(keyword, page) {
        keyword = keyword.trim();
        if (!keyword) {
            // empty search
            return [[], 0];
        }
        const rest_url = `${API_PREFIX}&type=movie&page=${page}&s=${encodeURIComponent(
            keyword,
        )}`;
        const { data } = await axios.post(rest_url);
        if (data.Error) {
            throw new Error(data.Error);
        } else {
            const { Search, totalResults } = data;
            const results = [];
            const promises = Search.map((data, index) => {
                return this._setSearchResult(results, data, index);
            });
            await Promise.all(promises);
            return [results, Number(totalResults)];
        }
    }

    async _setSearchResult(results, data, index) {
        const { Title, imdbID } = data;
        const director = await this.getDirectorById(imdbID);
        results[index] = {
            title: Title,
            director,
        };
    }

    async getDirectorById(imdbID) {
        if (this.idToDirectorMap.has(imdbID)) {
            return this.idToDirectorMap.get(imdbID);
        } else {
            const rest_url = `${API_PREFIX}&i=${imdbID}`;
            const { data } = await axios.post(rest_url);
            if (data.Error) {
                return null; // ignore the error case
            } else {
                const { Director } = data;
                this.idToDirectorMap.set(imdbID, Director);
                return Director;
            }
        }
    }
}

// expose as a singleton
export default new MovieService();
