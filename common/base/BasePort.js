// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '.../Debug.js';

export default class BasePort {

  constructor(interface) {
    this.pipe = new Pipe();
    this.bind(interface);
  }

  onrecv(buffer) {
    Debug.valid(buffer, ArrayBuffer);
    this.pipe.publish('recv', [this, buffer]);
  }

  onopen() {
    this.pipe.publish('open', [this]);
  }

  onclose() {
    this.pipe.publish('close', [this]);
  }

  onerror(err) {
    this.pipe.publish('error', [this, err]);
  }

  bind(interface) {
    Debug.abstract(
      'Port.bind',
      '<var> interface'
      '<undefined>'
    );
  }

  send(buffer) {
    Debug.abstract(
      'Port.send',
      '<ArrayBuffer> buffer',
      '<undefined>'
    );
  }

};
