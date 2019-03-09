// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import fs from 'fs';
import Debug from 'ottava-debug';
import Mutable from 'ottava-mutable';

/** Abstraction **/
import BaseStore from '../../core/BaseStore.js';

/** Implmentation **/
class FileSystemStore extends BaseStore {

  constructor(root) {
    root = root || './';
    Debug.valid(root, 'string');
    super();
    if(!root.endsWith('/')) {
      root = root + '/';
    }
    this.root = root;
  }

  path(id) {
    return this.root + id;
  }

  async get(id) {
    let path = this.path(id);
    return new Promise((resolve) => {
      if(!fs.existsSync(path)) {
        resolve(undefined);
        return;
      }
      fs.readFile(path, (err, buffer) => {
        if(err) {
          Debug.error(
            'FileSystemStore.get',
            'Read file error.', 
            err
          );
          resolve(undefined);
          return;
        }
        resolve(new Mutable(buffer));
      });
    });
  }

  async set(id, mutable) {
    let path = this.path(id);
    Debug.valid(mutable, Mutable);
    return new Promise((resolve) => {
      if(fs.existsSync(path)) {
        resolve(false);
        return;
      }
      fs.writeFile(path, mutable.buffer, (err) => {
        if(err) {
          Debug.error(
            'FileSystemStore.set', 
            'Write file error.', 
            err
          );
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async unset(id) {
    let path = this.path(id);
    return new Promise((resolve) => {
      if(!fs.existsSync(path)) {
        resolve(false);
        return;
      }
      fs.unlinkFile(path, (err) => {
        if(err) {
          Debug.error(
            'FileSystemStore.unset',
            'Unlink file error.', 
            err
          );  
          resolve(false);
          return;
        }
        resolve(true);
      })
    });
  }

};
