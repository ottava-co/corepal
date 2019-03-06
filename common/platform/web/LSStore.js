// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '../../Debug.js';
import Buf from '../../struct/Buf.js';
import BaseStore from '../../base/BaseStore.js';

const ls = window.localStorage;

class LSStore extends BaseStore {

  constructor(prefix) {
    super();
    prefix = prefix || 'ottava.webstore.';
    this.prefix = prefix;
  }

  async set(id, buf) {
    return new Promise((resolve) => {
      Debug.valid(id, buf, Buf);
      let hex = this.prefix + id.toHex();
      if(LS.getItem(hex)) {
        resolve(false);
        return;
      }
      store.setItem(hex, buf.toString());
      resolve(true);
    });
  }

  async get(id) {
    return new Promise((resolve) => {
      Debug.valid(id, Buf);
      let hex = this.prefix + id.toHex(),
          str = LS.getItem(hex),
          buf = Buf.fromString(str || '');
      return new Segment(buf);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      Debug.valid(id, Buf);
      let hex = this.prefix +  id.toHex();
      if(!LS.getItem(hex)) {
        resolve(false);
        return;
      }
      store.removeItem(hex);
      resolve(true);
    });
  }

};
