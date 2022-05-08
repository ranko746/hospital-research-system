import Axios from "./axios.js";

export const login = (user) => {
    return new Promise((resolve, reject) => {
        Axios.post("login", user, true)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                resolve({ res: true });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}

export const signup = (user) => {
    return new Promise((resolve, reject) => {
        Axios.post("users", user)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                resolve({ res: true, payload: response.data });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}

export const signout = () => {
    return localStorage.removeItem("token");
}

export const sendMessage = (msg) => {
    return new Promise((resolve, reject) => {
        Axios.get("helpMessages", msg)
            .then(response => {
                resolve({ res: true, payload: response.data });
            }).catch(err => {
                resolve({ res: false, err: err });
            });
    });
}