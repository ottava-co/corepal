
/** abstractions **/
import BasePort from './core/base/BasePort.js';
import BaseStore from './core/base/BaseStore.js';
import BasePlatform from './core/base/BasePlatform.js';

/** implementaions **/
import WSPort from './platform/node/WSPort.js';
import FSStore from './platform/node/FSStore.js';

let lib = {
  Debug: Debug,
  Sha256: Sha256,
  BaseStore: BaseStore,
  Store: FSStore,
  BasePort: BasePort,
  Port: WSPort
};

export default lib;
