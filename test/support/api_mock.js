'use strict';

const fs         = require('fs');
const path       = require('path');
const ServerMock = require('mock-http-server');
const _          = require('lodash');

class CustomServerMock {
  constructor(opts = {}) {
    opts.host = opts.host || 'localhost';
    opts.port = opts.port || '1234';

    this._serverMock = new ServerMock(opts);
  }

  start() { return new Promise(f => this._serverMock.start(f)); }
  stop() { return new Promise(f => this._serverMock.stop(f)); }

  on({path, matchParams, jsonFile}) {
    const headers = {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type":                 "application/json",
    }

    this._serverMock.on({
      path,
      method: "OPTIONS",
      reply: {headers, status: 200}
    });

    this._serverMock.on({
      path,
      method: "GET",
      reply: {
        headers,
        status: 200,
        body: req => {
          if (matchParams) {

            const match = matchParams.find(({params: p}) => _.isMatch(req.query, p));
            if (!match) throw "NO MATCH";
            return this.getJsonFile(match.jsonFile);

          } else
            return this.getJsonFile(jsonFile);
        }
      }
    });

    return this;
  }

  getJsonFile(fileName) {
    const filePath = path.join(__dirname, 'mocked_data', `${fileName}`);
    return fs.readFileSync(filePath, 'utf-8');
  }

  getJson(fileName) { return JSON.parse(this.getJsonFile(fileName)); }
};

const apiMock =
  new CustomServerMock()
    .on({
      path: '/car_brands',
      jsonFile: 'car_brands_index.json'
    })

    .on({
      path: '/car_models',
      matchParams: [{
        params: {car_brand_id: 45},
        jsonFile: 'car_models_index_car_brand_id_45.json'
      }]
    })

    .on({
      path: '/car_models',
      matchParams: [{
        params: {car_brand_id: 45},
        jsonFile: 'car_models_index_car_brand_id_45.json'
      }]
    })

    .on({
      path: '/v1/car_listings',
      matchParams: [{
        params: {page: 1},
        jsonFile: 'car_listings_index_page_1.json',
      }, {
        params: {page: 2},
        jsonFile: 'car_listings_index_page_2.json',
      }, {
        params: {car_brand_id: "45"},
        jsonFile: 'car_listings_index_car_brand_id_45.json'
      }]
    });

module.exports = apiMock;
