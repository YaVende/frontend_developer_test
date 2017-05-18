import axios from 'axios';

class ApiModel {
  static config = {};
  static globalConfig = {};

  static configurate(opts) { Object.assign(this.globalConfig, opts); }

  static url() {
    const apiUrl = this.config.apiUrl || this.globalConfig.apiUrl;
    return apiUrl ? apiUrl + this.config.endpoint : this.config.endpoint;
  }

  static query(opts = {}) {
    return axios({
      url:    this.url(),
      method: 'GET',
      ...opts
    });
  }

  static get(id, opts = {}) {
    return axios({
      url:    `${this.url()}/${id}`,
      method: 'GET',
      ...opts
    });
  }
}

ApiModel.configurate({apiUrl: "https://api.yavende.com"});

export default ApiModel;
