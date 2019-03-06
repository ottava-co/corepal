// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from './Debug.js';
import Buf from './struct/Buf.js';

class Message {

  constructor(buf) {
    this.object = { };
  }

  set buffer(buf) {
    Debug.valid(buf, Buf);
    this.buffer = buf;
    let typeBuf = buf.slice(0, 1);
    if(typeBuf)
  }

  get buffer() {

  }

  // parse(buf) {
  //   Debug.valid(buf, Buf);
  //   if(buf.length < 2) {
  //     Debug.throw(
  //       'Message.parse',
  //       'Invalid buffer length.',
  //       buf
  //     );
  //   }
  //   this.payload = buf.slice(1);
  //   let typeBuf = buf.slice(0,1),
  //       typeStr = typeBuf.toString();
  //   if(typeStr == 'r') {
  //     this.type = 'read';
  //   } else if(typeStr == 'w') {
  //     this.type = 'write';
  //   } else Debug.throw(
  //     'Message.parse',
  //     'Unknown message type.',
  //     typeStr
  //   );
  //   this.buffer = buf;
  // }

  static withPayload(type, payload) {
    Debug.valid(payload, Buf);
    Debug.valid(type, 'string');
    let buf = undefined;
    if(type == 'read') {
      buf = Buf.fromString('r');
    } else if(type == 'write') {
      buf = Buf.fromString('w');
    }
    buf = buf.concat(payload)
    return new Message(buf);
  }

};


