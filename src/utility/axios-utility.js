import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.quoteme.link/",
});

export default instance;