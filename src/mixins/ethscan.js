const { Mixin } = require('mixwith');
const got = require('got');



/**
 * Etherscan
 *
 * @class
 * @return {Object} ethscan mixin
 */

module.exports = Mixin((SuperClass) => class extends SuperClass {
   constructor(provider, type, timeout, prefixUrl, etherscanKey) {
      super(provider, type, timeout, prefixUrl, etherscanKey);

      this._ethscanUrl = prefixUrl;
      this._ethscanKey = etherscanKey;
      this._ethscan = got.extend({
         prefixUrl,
         timeout,
         searchParams: {
            apiKey: etherscanKey
         }
      });
   }



   // info
   get etherscanUrl() {
      return this._ethscanUrl;
   }

   get etherscanKey() {
      return this._ethscanKey;
   }
});
