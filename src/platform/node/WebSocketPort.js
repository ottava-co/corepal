// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import ws from 'ws';
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

/** Abstraction **/
import BasePort from '../../core/BasePort.js';

/** Implmentation **/
export default class WebSocketPort extends BasePort {

  constructor(socket) {
    super(socket);
  }

  bind(interface) {
    Debug.valid(interface, ws);
    interface.on('open', () => this.onopen()); // check lifecycle, may not be invoked.
    interface.on('message', (msg) => this.onbuffer(msg));
    interface.on('close', () => this.onclose());
    interface.on('error', (err) => this.onerror(err));
    this.interface = interface;
  }

  send(buffer) {
    Debug.valid(buffer, ArrayBuffer);
    this.interface.send(buffer);
  }

};
