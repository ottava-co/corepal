// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from './Debug.js';
import Buf from './struct/Buf.js';

class Stream {

  constructor() {
    this.pipes = [];
  }

  attach(fn) {
    let index = this.pipes.indexOf(fn);
    if(index >= 0) {
      return false;
    }
    this.pipes.push(fn);
    return true;
  }

  detach(fn) {
    let index = this.pipes.indexOf(fn);
    if(index < 0) {
      return false;
    }
    this.pipes.splice(index);
    return true;
  }

  write(buf) {
    Debug.valid(buf, Buffer);
    let pipes = Array.from(this.pipes),
        count = 0;
    while(pipes.length) {
      let pipe = pipes.shift();
      pipe.call(null, buf);
      count++;
    }
    return count;
  }

};
