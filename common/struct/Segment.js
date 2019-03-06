// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from './Debug.js';

import Buf from './Buf.js';
import Store from './Store.js';

import Sha256 from './crypto/Sha256.js';

class Segment {

  constructor(buf) {
    Debug.valid(buf, Buf);
    this.buf = buf;
  }

  get hash() {
    return Sha256.hash(this.buf);
  }

  get head() {
    let hash = this.buf.slice(0, Sha256.size),
        segment = Store.singleton.lookup(hash);
    return segment;
  }

  get payload() {
    return this.buf.slice(SHA256.size);
  }

};
