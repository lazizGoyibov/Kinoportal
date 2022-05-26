import axios from 'axios'

const request = axios.create({
    baseURL: "https://www.themoviedb.org/authenticate",
    headers: {}



})

export default request