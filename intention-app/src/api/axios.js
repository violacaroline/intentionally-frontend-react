import axios from 'axios'

export default axios.create({
    baseURL: 'https://cscloud7-193.lnu.se/intentionally/auth-service/api/v1'
})