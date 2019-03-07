/** util **/
import Debug from './Debug.js';
/** crypto **/
import Sha256 from './crypto/Sha256.js';
/** abstractions **/
import BasePort from './base/BasePort.js';
import BaseStore from './base/BaseStore.js';
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
