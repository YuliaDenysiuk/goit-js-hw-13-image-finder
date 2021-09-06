const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23195286-789ed49c86d3fd3c443dc5a81';

export default {
    searchQuery: '',
    page: 1,

    fetchImage() {
        return fetch(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`)
            .then(response => response.json())
            .then(images => {
                this.incrementPage();
                return images;
            });
    },

    incrementPage() {
        this.page += 1;
    },

    resetPage() {
        this.page = 1;
    }
};