// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from './Debug.js';
import Buf from './struct/Buf.js';
import Message from './struct/Message.js';
import Port from './adapter/Port.js';
import Store from './adapter/Store.js';
import Sha256 from './crypto/Sha256.js';

class System {

  constructor(store) {
    Debug.valid(store, Store);
    this.store = store;
    this.ports = [];
  }

  addPort(port) {
    Debug.valid(port, Port);
    let index = this.ports.indexOf(port);
    if(index < 0) {
      port.dock(
        (buf)=>this.onPortBuf(port, buf)
      );
      this.ports.push(port);
      return true;
    }
    return false;
  }

  removePort(port) {
    Debug.valid(port, Port);
    let index = this.ports.indexOf(port);
    if(index>=0) {
      this.ports.splice(index);
      return true;
    }
    return false;
  }

  onPortBuf(port, buf) {
    let message = new Message(buf);
    if(message.type == 'read') {
      this.onPortRead(port, message);
    } else if(message.type == 'write') {
      this.onPortWrite(port, message);
    }
  }

  onPortRead(port, message) {
    if(message.payload.length > Sha256.size) Debug.throw(
      'System.onPortRead',
      'Invalid message length.',
      message
    );
    let hash = message.payload.toHex(),
        buf = await this.store.get(hash);
    if(!buf) {
      Debug.warn(
        'System.onPortRead',
        'Unable to locate hash.',
        hash
      );
      return;
    }
    let message = Message.withPayload(
      'write',
      buf
    );
    port.send(message.buffer);
  }

  onPortWrite(port, message) {
    let payload = message.payload,
        hash = Sha256.hash(payload).toHex();
    this.store.set(hash, payload);
  }

};
