import axios from "axios";
import { SERVER_URL } from "../config.js";

const Axios = {};

const setAuthToken = (auth) => {
    axios.defaults.headers.common["Authorization"] =
        auth ?
            `JWT ${localStorage.getItem("token") || ""}`
            :
            "";
}

Axios.get = (url, params, auth = false) => {
    setAuthToken(auth);

    return axios.get(`${SERVER_URL}/${url}`, { params });
}

Axios.post = (url, params, auth = false) => {
    setAuthToken(auth);

    return axios.post(`${SERVER_URL}/${url}/`, params);
}

export default Axios;