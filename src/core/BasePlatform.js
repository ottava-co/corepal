// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import Debug from 'ottava-debug';
import BaseStore from './BaseStore.js';
import BasePort from './BasePort.js';

/** Definition **/
export default class BasePlatform {

  static get PermanentStore() {
    Debug.abstract(
      'BasePlatform::PermanentStore',
      '<BaseStore>'
    );
  }

  static get TransferPort() {
    Debug.abstract(
      'BasePlatform::TransferPort',
      '<BasePort>'
    );
  }

};
