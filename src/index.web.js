// © 2016-2018 Fabio Garcia. All rights reserved.

/** Dependencies **/
import LocalStorageStore from './platform/web/LocalStorageStore.js';
import WebSocketPort from './platform/web/WebSocketPort.js';

/** Abstractions **/
import BasePlatform from './core/base/BasePlatform.js';

/** Implementation **/
export default class CorePAL extends BasePlatform {

  static get PersistentStore() {
    return FileSystemStore;
  }

  static get CommunicationPort() {
    return WebSocketPort;
  }

};
