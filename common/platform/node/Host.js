// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import ws from 'ws';
import http from 'http';
import https from 'https';

import Debug from '../common/Debug.js';
import Buf from '../common/struct/Buf.js';
import System from '../common/System.js';

import Persist from './Persist.js';
import Transport from './Transport.js';

class Server extends System {

  constructor(config) {
    this.initialize(config);
  }

  initialize(conf) {
    this.config && Debug.throw(
      'Host.initialize',
      'Host already configrued, please use new instance.',
      this.config
    )
    conf = conf || {};
    conf.host = conf.host || 'localhost';
    conf.port = conf.port || 80;
    this.config = conf;
    this.listen();
  }

  listen() {
    let webserver = undefined,
        config = this.config;
    if(config.cert && config.key) {
      webserver = new https.createServer(config);
    } else {
      webserver = new http.createServer(config);
    }
    this.server = new ws.Server({ webserver });
    this.server.on('connection', (conn) => {
      let transport = new Transport(conn);
      transport.on('close', () => {
        this.removePort(transport);
      });
      this.addPort(transport);
    });
  }

};
