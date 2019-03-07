// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '../Debug.js';
import Sha256 from '../crypto/Sha256.js';

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

  async cache(buffer) {
    Debug.valid(buffer, ArrayBuffer);
    return new Promise((resolve) => {
      let hash = Sha256.hash(buffer),
          result = await this.set(hash, buffer);
      result && this.history.push(buffer);
      resolve(result);
    });
  }

  async set(id, buf) {
    Debug.abstract(
      'Store::define',
      '<string> id',
      '<boolean>'
    );
  }

  async get(id) {
    Debug.abstract(
      'Store::lookup',
      '<string> id',
      '<ArrayBuffer>'
    );
  }

  async delete(id) {
    Debug.abstract(
      'Store.undefine',
      '<string> id',
      '<boolean>'
    );
  }

}
