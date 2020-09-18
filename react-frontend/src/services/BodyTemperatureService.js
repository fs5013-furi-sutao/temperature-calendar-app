import axios from 'axios';

const BODY_TEMPERATURE_API_BASE_URL = "http://localhost:8080/api/v1/temperatures";

class BodyTemperatureService {

    async getTemperatures() {
        return axios.get(BODY_TEMPERATURE_API_BASE_URL);
    }

    createBodyTemperature(temperature) {
        const targetDate = new Date(temperature.start);
        const year = targetDate.getFullYear();
        const month = ("0" + (targetDate.getMonth() + 1)).slice(-2);
        const date = ("0" + targetDate.getDate()).slice(-2);
        let formattedDate = `${year}-${month}-${date}`;
        return axios.post(BODY_TEMPERATURE_API_BASE_URL, {
            temperature: temperature.title,
            date: formattedDate,
            id: temperature.id
        });
    }

    getTemperatureById(temperatureId) {
        return axios.get(BODY_TEMPERATURE_API_BASE_URL + '/' + temperatureId);
    }

    async getMaxId() {
        const res = axios.get(BODY_TEMPERATURE_API_BASE_URL + '/maxid');
        return res;
    }

    updateBodyTemperature(temperature, temperatureId) {
        return axios.put(BODY_TEMPERATURE_API_BASE_URL + '/' + temperatureId, {
            temperature: temperature.title,
            id: temperature.id
        });
    }

    deleteBodyTemperature(temperatureId) {
        return axios.delete(BODY_TEMPERATURE_API_BASE_URL + '/' + temperatureId);
    }

    getTemperatureByDateBetween(from, to) {
        return axios.get(`${BODY_TEMPERATURE_API_BASE_URL}/date/from/${from}/to/${to}`);
    }

}

export default new BodyTemperatureService()