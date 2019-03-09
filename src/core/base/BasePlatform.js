// © 2016-2018 Fabio Garcia. All rights reserved.

import Debug from 'ottava-debug';
import BasePlatform from '../core/base/BasePlatform.js';
import BaseStore from '../core/base/BaseStore.js';
import BasePort from '../core/base/BasePort.js';

export default class BasePlatform {

  static get PersistentStore() {
    Debug.abstract(
      'BasePlatform::PersistentStore',
      '<BaseStore>'
    );
  }

  static get CommunicationPort() {
    Debug.abstract(
      'BasePlatform::CommunicationPort',
      '<BasePort>'
    );
  }

};
