/** util **/
import Debug from './shared/Debug.js';
/** crypto **/
import Sha256 from './shared/crypto/Sha256.js';
/** abstractions **/
import BasePort from './shared/base/BasePort.js';
import BaseStore from './shared/base/BaseStore.js';
/** implementaions **/
import WSPort from './platform/node/WSPort.js';
import FSStore from './platform/node/FSStore.js';

let Ottava = {
  Debug: Debug,
  Sha256: Sha256,
  Tranport: WSPort,
  Storage: FSStore
};

export default Ottava;
