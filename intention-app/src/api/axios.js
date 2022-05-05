import axios from 'axios'

/* THIS BASE URL WILL NEED CHANGING */
export default axios.create({
    // baseURL: 'https://cscloud7-193.lnu.se/intentionally/auth-service/api/v1'
    baseURL: 'http://localhost:8086/api/v1'
})