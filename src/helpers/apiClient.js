import Axios from 'axios/index';

class ApiClientSingleton {
  constructor() {
    this.createOrUpdateHttpClient('');
  }

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  createOrUpdateHttpClient(token) {
    const httpConfig = {
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    this.httpClient = Axios.create(httpConfig);
  }
}

const apiClient = ApiClientSingleton.instance;
export default apiClient;
