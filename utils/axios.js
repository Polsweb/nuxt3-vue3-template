import HttpRequest from './request';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const axios = new HttpRequest(BASE_URL);
export default axios;
