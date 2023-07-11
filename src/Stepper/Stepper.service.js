// const stepsData = require('./steps.mock.json');
const apiUrl =  process.env.API_URL || 'https://lineblocs.com/api/v1';


class ApiService {

    getSettings() {
        // return Promise.resolve(stepsData.api_creds);
        return fetch(`${apiUrl}/setup/getSettings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json()).then((response) => response.api_creds);
    }

    saveSettings(body) {
        return fetch(`${apiUrl}/setup/saveSettings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({api_creds: body})
        })
    }
}

const apiService = new ApiService();
module.exports = {
    apiService
};