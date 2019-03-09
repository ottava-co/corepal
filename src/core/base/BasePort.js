// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '../Debug.js';

export default class BaseConnection {

  constructor(interface, onevent) {
    Debug.valid(onevent, function);
    this.onevent = onevent;
    this.bind(interface);
  }

  onopen() {
    this.onevent(this, 'open');
  }

  onreceive(buffer) {
    this.onevent(this, 'receive', buffer);
  }

  onclose() {
    this.onevent(this, 'close');
  }

  onerror(error) {
    Debug.error(
      'BaseConnection.onerror',
      'Stream error occurred.',
      error
    );
    this.onevent(this, 'error', error);
  }

  bind(interface) {
    Debug.abstract(
      'BaseConnection.bind',
      '<var> interface',
      '<undefined>'
    );
  }

  send(buffer) {
    Debug.abstract(
      'BaseConnection.send',
      '<ArrayBuffer> buffer',
      '<undefined>'
    );
  }

};
