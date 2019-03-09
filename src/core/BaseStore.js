// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

/** Definition **/
export default class BaseStore {

  static set origin(store) {
    if(BaseStore.source) { 
      Debug.warn(
        'set BaseStore::origin',
        'BaseStore source origin already defined.',
        BaseStore.source
      );
      return;
    }
    BaseStore.source = store;
  }

  static get origin() {
    (!BaseStore.source) && Debug.throw(
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

  async checksum(mutable) {
    Debug.abstract(
      'async BaseStore.checksum',
      '<Mutable> mutable',
      '<string>'
    );
  }

  async get(id) {
    Debug.abstract(
      'async BaseStore.get',
      '<string> id',
      '<Mutable>'
    );
  }

  async set(id, mutable) {
    Debug.abstract(
      'async BaseStore.set',
      '<string> id',
      '<Mutabler> mutable',
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
