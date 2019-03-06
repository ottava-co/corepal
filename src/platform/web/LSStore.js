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

  static bufferToString(buffer) {
    let arr = new Uint8Array(buffer),
        str = '';
    if((arr.length%2)!=0) Debug.throw(
      'Buf.toString',
      'Invalid byte length for utf16',
      arr.length
    );
    for(let i = 0; i < arr.length; i+=2) {
      str += String.fromCharCode(
        (((arr[i] & 0xff) << 8) | (arr[i+1] & 0xff))
      );
    }
    return str;
  }

  static stringToBuffer(string) {
    Debug.valid(string, 'string');
    let arr = [];
    for(let i = 0; i < string.length; i++) {
      let utf16 = string.charCodeAt(i);
      arr.push((utf16 >> 8) & 0xff);
      arr.push(utf16 & 0xff);
    }
    let uint8arr = new Uint8Array(arr);
    return uint8array.buffer;
  }

  async set(id, buffer) {
    return new Promise((resolve) => {
      Debug.valid(id, 'string');
      Debug.valiud(buffer, ArrayBuffer);
      let ident = this.prefix + id;
      if(LS.getItem(ident)) {
        resolve(false);
        return;
      }

      store.setItem(
        ident, 
        LSStore.bufferToString(buffer)
      );
      resolve(true);
    });
  }

  async get(id) {
    return new Promise((resolve) => {
      Debug.valid(id, Buf);
      let hex = this.prefix + id.toHex(),
          str = LS.getItem(hex),
          buf = LSStore.stringToBuffer(str || '');
      return buf;
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      Debug.valid(id, Buf);
      let ident = this.prefix +  id.toHex();
      if(!LS.getItem(ident)) {
        resolve(false);
        return;
      }
      store.removeItem(ident);
      resolve(true);
    });
  }

};
