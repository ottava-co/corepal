// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import ws from 'ws';

import Debug from '../../Debug.js';
import BasePort from '../../base/BasePort.js';

export default class WSPort extends BasePort {

  constructor(socket) {
    super(socket);
  }

  bind(interface) {
    Debug.valid(interface, ws);
    interface.on('message', (msg) => {
      let buf = new Buf(msg);
      this.recv(buf);
    });
  }

  send(buf) {
    Debug.valid(buf, Buf);
    this.interface.send(buf.buffer);
  }

};
