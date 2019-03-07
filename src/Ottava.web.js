/** util **/
import Debug from './shared/Debug.js';
/** crypto **/
import Sha256 from './shared/crypto/Sha256.js';
/** abstractions **/
import BasePort from './shared/base/BasePort.js';
import BaseStore from './shared/base/BaseStore.js';
/** implementaions **/
import WSPort from './platform/web/WSPort.js';
import LSStore from './platform/web/LSStore.js';

let Ottava = {
  Debug: Debug,
  Sha256: Sha256,
  Tranport: WSPort,
  Storage: LSStore
};

export default Ottava;
