const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

class ApiService {

    getSettings() {
        return fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    saveSettings(body) {
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}

const apiService = new ApiService();
module.exports = {
    apiService
};