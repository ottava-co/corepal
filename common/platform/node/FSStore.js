// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import fs from 'fs';

import Debug from '../../Debug.js';
import Buf from '../,,/struct/Buf.js';
import BaseStore from '../../base/BaseStore.js';

class FSStore extends BaseStore {

  constructor(path) {
    path = path || './';
    Debug.valid(path, 'string');
    super();
    this.path = path;
  }

  rel(id) {
    Debug.valid(id, buf, Buf);
    return this.path + id.toHex();
  }

  async set(id, buf) {
    let path = this.rel(id);
    Debug.valid(buf, Buf);
    return new Promise((resolve) => {
      if(this.map[id]) {
        resolve(undefined);
        return;
      }
      fs.writeFile(path, buf.buffer, (err) => {
        if(err) {
          Debug.error('FS - Write file error.', err);
          resolve(false);
          return;
        }
        this.map[id] = buf;
        resolve(true);
      });
    });
  }

  async get(id) {
    let path = this.rel(id);
    return new Promise((resolve) => {
      if(this.map[id]) {
        resolve(this.map[id]);
        return;
      }
      fs.readFile(path, (err, buffer) => {
        if(err) {
          Debug.error('FS - Read file error.', err);
          resolve(false);
          return;
        }
        let buf = new Buf(buffer);
        resolve(new Segment(buf));
      });
    });
  }

  async delete(id) {
    let path = this.rel(id);
    return new Promise((resolve) => {
      if(!this.map[id]) {
        resolve(undefined);
        return;
      }
      fs.unlinkFile(path, (err) => {
        if(err) {
          Debug.error('FS - Unlink file error.', err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    });
  }

};
