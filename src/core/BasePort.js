// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

/** Definition **/
export default class BasePort {

  constructor(interface, onevent) {
    Debug.valid(onevent, function);
    this.onevent = onevent;
    this.bind(interface);
  }

  onopen() {
    this.onevent(this, 'open');
  }

  onreceive(buffer) {
    Debug.valid(buffer, ArrayBuffer);
    let mutable = new Mutable(buffer);
    this.onevent(this, 'receive', mutable);
  }

  onclose() {
    this.onevent(this, 'close');
  }

  onerror(error) {
    Debug.error(
      'BasePort.onerror',
      'Stream error occurred.',
      error
    );
    this.onevent(this, 'error', error);
  }

  bind(interface) {
    Debug.abstract(
      'BasePort.bind',
      '<var> interface',
      '<undefined>'
    );
  }

  send(buffer) {
    Debug.abstract(
      'BasePort.send',
      '<ArrayBuffer> buffer',
      '<undefined>'
    );
  }

};
