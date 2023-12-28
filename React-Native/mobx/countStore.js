import { makeAutoObservable } from "mobx";

class CountStore {
    constructor() {
        makeAutoObservable(this);
    }

    // observable to save search query
    text = '';

    // observable to save image response from api
    data = null;

    // observable for loading state
    isLoading = false;

    // observable for error state
    error = null;

    // action to update text
    updateText = (text) => {
        this.text = text;
    }

    // action to call API and search images
    searchImages = async () => {
        try {
            this.isLoading = true;
            const response = await fetch(`https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=1&query=${this.text}&orientation=landscape`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            this.setData(data);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.isLoading = false;
        }
    };

    // action to set data
    setData = (data) => {
        this.data = data;
        this.error = null; // Reset error on successful data fetch
    };

    // action to set error
    setError = (error) => {
        this.error = error;
        this.data = null; // Reset data on error
    };
}

// export class
export default new CountStore();
