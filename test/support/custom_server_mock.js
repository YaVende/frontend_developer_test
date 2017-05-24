'use strict';

const fs         = require('fs');
const path       = require('path');
const ServerMock = require('mock-http-server');
const _          = require('lodash');

module.exports = class CustomServerMock {
  constructor(opts = {}) {
    opts.host = opts.host || 'localhost';
    opts.port = opts.port || '1234';

    this._serverMock = new ServerMock(opts);
  }

  start() { return new Promise(f => this._serverMock.start(f)); }
  stop() { return new Promise(f => this._serverMock.stop(f)); }

  on({path, matcher, jsonFile}) {
    const headers = {
      "Access-Control-Allow-Origin":  "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
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
          if (matcher) jsonFile = matcher(req);
          if (!jsonFile) throw(`Api Mock: Error: No match for path ${path}`);

          if (process.env.DEBUG_MODE) {
            const queryDesc =
              _.keys(req.query)
                .map(k => [k, req.query[k]].join('='))
                .join(', ')

            console.log(`Api Mock: responding to path ${path} and query ${queryDesc} with json file ${jsonFile}`);
          }

          return this.readJsonAsString(jsonFile);
        }
      }
    });

    return this;
  }

  readJsonAsString(fileName) {
    const filePath = path.join(__dirname, 'mocked_data', `${fileName}`);
    return fs.readFileSync(filePath, 'utf-8');
  }

  readJson(fileName) { return JSON.parse(this.readJsonAsString(fileName)); }
};
