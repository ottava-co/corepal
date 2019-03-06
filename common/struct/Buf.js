// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia. 
// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from './Debug.js';

export default class Buf {

  constructor(buffer, enc) {
    if(typeof(buffer) == 'number') {
      this.fromArray(new Array(buffer));
    } else if(typeof(buffer) == 'string') {
      enc = enc || 'utf16';
      if(enc == 'utf16') {
        this.fromString(buffer);
      } else if(enc == 'hex') {
        this.fromHex(buffer);
      }
    } else if(typeof(buffer) == 'object') {
      if(buffer instanceof Buf) {
        this.fromBuf(buffer);
      } else if(buffer instanceof Array) {
        this.fromArray(buffer);
      } else if(buffer instanceof Uint8Array) {
        this.buffer = buffer.buffer;
      } else if(buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
      } else Debug.throw(
        'new Buf()',
        'Invalid buffer.',
        buffer
      );
    }
  }

  static fromArray(array) {
    Debug.valid(array, Array);
    let arr = new Uint8Array(arr);
    return new Buf(arr.buffer);
  }

  static fromBuf(buf) {
    Debug.valid(buf, Buf);
    return buf.slice(0);
  }

  static fromString(string) {
    Debug.valid(string, 'string');
    let arr = [];
    for(let i = 0; i < string.length; i++) {
      let utf16 = string.charCodeAt(i);
      arr.push((utf16 >> 8) & 0xff);
      arr.push(utf16 & 0xff);
    }
    return Buf.fromArray(arr);
  }

  static fromHex(hex) {
    let arr = [];
    while (str.length >= 8) { 
        arr.push(parseInt(str.substring(0, 8), 16));
        str = str.substring(8, str.length);
    }
    return Buf.fromArray(arr);
  }

  get length() {
    return this.buffer.byteLength;
  }

  toArray() {
    let arr = new Uint8Array(this.buffer);
    return Array.from(arr);
  }

  toBuf() {
    return this.slice(0);
  }

  toString() {
    let arr = this.toArray(),
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

  toHex() {
    let arr = this.toArray(),
        hex = '',
        z;
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i].toString(16);
        z = 8 - str.length + 1;
        hex += Array(z).join("0") + str;
    }
    return hex;
  }

  concat(data) {
    if(data instanceof Buf) {
      data = data.toArray();
    }
    let arr = this.toArray();
    arr = arr.concat(data);
    return Buf.fromArray(arr);
  }

  slice(start, end) {
    return new Buf(
      this.buffer.slice(start, end)
    );
  }

  unshift(byte) {
    this.unshift(byte);
    return new Buf(this);
  }

  shift() {
    let byte = this.shift();
    return Buf.fromArray(this.toArray());
  }

  push(byte) {
    let bytes = this.toArray();
    bytes.push(byte);
    this.fromArray(bytes);
  }

  pop() {
    let bytes = this.toArray(),
        byte = bytes.pop();
    this.fromArray(bytes);
    return new Buf([byte]);
  }

  leftTrim(size) {
    return this.slice(size);
  }

  rightTrim(size) {
    return this.slice(0, size);
  }

  leftPad(generator, length) {
    let newBuf = Buf.Generate(generator, length - this.length);
    return newBuf.concat(this);
  }

  leftDepad(byte) {
    let newBuf = this.bytes.slice(0);
    while(newBuf[0] == byte) {
      newBuf.shift();
    }
    return new Buf(newBuf);
  }

  rightPad(generator, length) {
    let newBuf = Buf.Generate(generator, length - this.length);
    return this.concat(newBuf);
  }

  rightDepad(byte) {
    let newBuf = this.bytes.slice(0);
    while(newBuf[newBuf.length-1] == byte) {
      newBuf.pop();
    }
    return new Buf(newBuf);
  }

  leftBlockPad(generator, size) {
    let padding = (size - (this.length % size)) % size;
    return this.lpad(generator, this.length + padding);
  }

  rightBlockPad(generator, size) {
    let padding = (size - (this.length % size)) % size;
    return this.rpad(generator, this.length + padding);
  }


  indexOf(search, fromIndex){
    return this.buffer.indexOf(search, fromIndex);
  }

  equals(data) {
    Debug.valid(data, Buf);
    if(data.length !== this.length) return false;
    if(!this.length && !data.length) return true;
    let view1 = new Uint8Array(this.buffer),
        view2 = new Uint8Array(data.buffer);
    for(var i = 0; i < view1.length; i++)
      if(view2[i] !== view1[i]) return false;
    return true;
  }

  xor(data) {
    Debug.valid(data, Buf);
    if(data.length !== this.length) Bug.throw(
      'Buf.xor',
      'Invalid xor data.'.
      data
    );
    var ba = data.toArray(),
        bytes = this.toArray(),
        xor = new Array(this.length);
    for(var i = 0; i < this.length; i++) {
        xor[i] = bytes[i] ^ ba[i];
    }
    return new Buf(xor);
  }

};
