// © 2016-2018 Fabio Garcia. All rights reserved.

//Dependencies
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

//Asbtraction
import BaseStore from '../../core/base/BaseStore.js';

const ls = window.localStorage;

class LocalStorageStore extends BaseStore {

  constructor(prefix) {
    super();
    prefix = prefix || 'ottava.webstore.';
    this.prefix = prefix;
  }

  async set(id, mutable) {
    return new Promise((resolve) => {
      Debug.valid(id, 'string');
      Debug.valid(mutable, Mutable);
      let locator = this.prefix + id;
      if(LS.getItem(locator)) {
        resolve(false);
        return;
      }
      ls.setItem(
        locator,
        mutable.toString()
      );
      resolve(true);
    });
  }

  async get(id) {
    return new Promise((resolve) => {
      Debug.valid(id, 'string');
      let locator = this.prefix + id,
          str = ls.getItem(locator),
          mutable = Mutable.fromString(str);
      resolve(mutable);
    });
  }

  async unset(id) {
    return new Promise((resolve) => {
      Debug.valid(id, 'string');
      let locator = this.prefix +  id;
      if(!ls.getItem(locator)) {
        resolve(false);
        return;
      }
      store.removeItem(locator);
      resolve(true);
    });
  }

};
