import axios from 'axios'
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});


Api.interceptors.response.use(
    (res) => responseInterceptor(res),
    (error) => errorInterceptor(error)
)

export { Api };