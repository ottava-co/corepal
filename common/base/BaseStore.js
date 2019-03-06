// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '../Debug.js';

class BaseStore {

  constructor() {
    Store.singleton && Debug.throw(
      'new Store',
      'Process store already instantiated.'
      Store.singleton
    );
    Store.singleton = this;
    this.history = [];
  }

  async cache(buf) {
    Debug.valid(buf, Buf);
    return new Promise((resolve) => {
      let hash = SHA256.hash(buf),
          result = await this.define(hash, buf);
      result && this.history.push(buf);
      resolve(result);
    });
  }

  async set(id, buf) {
    Debug.abstract(
      'Store::define',
      '<Buf> id',
      '<boolean>'
    );
  }

  async get(id) {
    Debug.abstract(
      'Store::lookup',
      '<Buf> id',
      '<Buf>'
    );
  }

  async delete(id) {
    Debug.abstract(
      'Store.undefine',
      '<Buf> id',
      '<boolean>'
    );
  }

}
