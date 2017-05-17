import axios from 'axios';

class ApiModel {
  static config = {};
  static globalConfig = {};

  static configurate(opts) { Object.assign(this.globalConfig, opts); }

  static url() {
    const apiUrl = this.config.apiUrl || this.globalConfig.apiUrl;
    return apiUrl ? apiUrl + this.config.endpoint : this.config.endpoint;
  }

  static query({params} = {}) {
    return axios({
      url:    this.url(),
      method: 'GET',
      params: params
    });
  }

  static get(id) {
    return axios({
      url:    `${this.url()}/${id}`,
      method: 'GET'
    });
  }
}

ApiModel.configurate({apiUrl: "https://api.yavende.com"});

export default class CarListing extends ApiModel {
  static config = {endpoint: "/v1/car_listings"};
}
