// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

/** Abstraction **/
import BasePort from '../../core/BasePort.js';

const ws = window.WebSocket;

/** Implmentation **/
export default class WebSocketPort extends BasePort {

  constructor(socket) {
    super(socket);
  }

  bind(interface) {
    Debug.valid(interface, ws);
    interface.onopen = () => this.onopen(); // check lifecycle, may not be invoked.
    interface.onmessage = (msg) => this.onbuffer(msg);
    interface.onclose = () => this.onclose();
    interface.onerror = (err) => this.onerror(err);
    interface.binaryType = 'arraybuffer';
    this.interface = interface;
  }

  send(buffer) {
    Debug.valid(buffer, ArrayBuffer);
    this.interface.send(buffer);
  }

};
