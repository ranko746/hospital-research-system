import Axios from "./axios.js";

export const getPopularHospitals = () => {
    return new Promise((resolve, reject) => {
        Axios.get("popularHospitals")
            .then(res => {
                resolve({ res: true, payload: res.data });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}

export const getComparingHospitals = () => {
    return new Promise((resolve, reject) => {
        Axios.get("comparingHospitals")
            .then(res => {
                resolve({ res: true, payload: res.data });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}

export const getHospitals = (search) => {
    return new Promise((resolve, reject) => {
        Axios.get("hospitalSearches", search)
            .then(res => {
                resolve({ res: true, payload: res.data });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}