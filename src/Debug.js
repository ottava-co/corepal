// License: Do not view, copy, or transmit without explicit
// notarized written consent from the author, Fabio Garcia.
// © 2016-2018 Fabio Garcia. All rights reserved.

export default class Debug {

  static islevel(level) { return (Debug.level >= level); }

  static get level() { return 4; }

  static get DEBUG() { return 4; }

  static get INFO() { return 3; }

  static get WARN() { return 2; }

  static get ERROR() { return 1; }

  static get NONE() { return 0; }

  static debug() {
    if(!Debug.islevel(Debug.DEBUG)) return;
    var arg = Array.from(arguments),
        msg = ['Debug::Debug - '].concat(arg);
    console.trace();
    console.warn.apply(console, msg);
  }

  static info() {
    if(!Debug.islevel(Debug.INFO)) return;
    var arg = Array.from(arguments),
        msg = ['Debug::Info - '].concat(arg);
    console.log.apply(console, msg);
  }

  static warn() {
    if(!Debug.islevel(Debug.WARN)) return;
    var arg = Array.from(arguments),
        msg = ['Debug::Warn - '].concat(arg);
    console.warn.apply(console, msg);
  }

  static error() {
    if(!Debug.islevel(Debug.ERROR)) return;
    var arg = Array.from(arguments),
        msg = ['Debug::Error - '].concat(arg);
    console.trace();
    console.error.apply(console, msg);
  }

  static fault() {
    var arg = Array.from(arguments),
        msg = arg.length && arg.join('') || '';
    if(Debug.islevel(Debug.ERROR))
      Debug.error(msg);
  }

  static throw(func, reason, ref) {
    var msg = [
      func,'() - ',
      reason,'. ',
      ref.toString()
    ].join('');
    console.trace();
    throw msg;
  }

  static abstract() {
    var arg = Array.from(arguments),  
        method = arg.length 
          && arg.shift() 
            || '',
        argTypes = arg.length 
          && arg.join(', ') 
            || '',
        returnType = arg.length 
          && arg.pop() 
            || 'undefined';
    Debug.fault(
      method, 
      '(', argTypes, ') >> ',
      returnType,
      ' - Not implemented.'
    );
  }

  static validString(type, variant) {
    if(type === 'number') {
      var num = parseInt(variant);
      if(isNaN(num)) {
        return false;
      }
    }
    return (typeof(variant) == type);
  }

  static validFunction(type, variant) {
    if(type instanceof RegExp) {
      return type.test(variant);
    }
    return (variant instanceof type); 
  }

  static validType(type, variant) {
    switch(typeof(type)) {
      case 'string':
        if(Debug.validString(ty[pe], a)) {
          break;
        }
      case 'function':
      case 'object':
        if(Debug.validFunction(ty[pe], a)) {
          break;
        }
      default:
        return false;
    }
    return true;
  }

  static validTypes(types, variant) {
    types = types || [];
    variant = variant || '';
    for(let i = 0; i < types.length; i++) {
      if(Debug.validType(types[i], variant)) {
        return true;
      }
    }
    return false;
  }

  static valid() {
    let arg = Array.from(arguments),
        types = arg.length && arg.pop();
    if(types && !(types instanceof Array)) {
      types = [types];
    }
    while(arg.length) {
      let test = arg.shift();
      if(!Debug.validTypes(types, test) 
        Debug.throw(
          'Debug.type',
          'Invalid type.',
          test
        );
    }
  }

};
