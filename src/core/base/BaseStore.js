// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from '../Debug.js';

export default class BaseStore {

  static set origin(store) {
    if(BaseStore.source) {
      Debug.warn(
        'set BaseStore::`origin',
        'BaseStore source origin already defined.',
        BaseStore.source
      );
      return;
    }
    BaseStore.source = store;
  }

  static get origin() {
    !BaseStore.source && Debug.throw(
      'get BaseStore::origin',
      'BaseStore source origin undefined.',
      BaseStore.source
    );
    return BaseStore.source;
  }

  constructor() {
    BaseStore.singleton = this;
  }

  get source() {
    if(!BaseStore.origin) {
      BaseStore.origin = this;
    }
    return BaseStore.origin;
  }

  async checksum(buffer) {
    Debug.abstract(
      'async BaseStore.checksum',
      '<ArrayBuffer> buffer',
      '<string>'
    );
  }

  async get(id) {
    Debug.abstract(
      'async BaseStore.get',
      '<string> id',
      '<ArrayBuffer>'
    );
  }

  async set(id, buffer) {
    Debug.abstract(
      'async BaseStore.set',
      '<string> id',
      '<ArrayBuffer> buffer',
      '<boolean>'
    );
  }

  async unset(id) {
    Debug.abstract(
      'async BaseStore.unset',
      '<string> id',
      '<boolean>'
    );
  }

};
