const http = require('http');
const https = require('https');
const { Mixin } = require('mixwith');
const Web3 = require('web3');
const Web3HttpProvider = require('web3-providers-http');
const Web3WsProvider = require('web3-providers-ws');



/**
 * Web3
 *
 * @class
 * @return {Object} web3 mixin
 */

module.exports = Mixin((SuperClass) => class extends SuperClass {
   constructor(provider, type, timeout, prefixUrl, etherscanKey) {
      super(provider, type, timeout, prefixUrl, etherscanKey);

      switch (type) {

         case 'http':
         case 'https':
            this._web3 = new Web3(new Web3HttpProvider(provider, {
               keepAlive: true,
               timeout,
               headers: [
                  {
                     name: 'Access-Control-Allow-Origin',
                     value: '*'
                  }
               ],
               withCredentials: false,
               agent: {
                  http: (type === 'http') ? http.Agent() : https.Agent(),
                  baseUrl: provider
               }
            }));
            break;

         case 'ws':
         case 'wss':
            this._web3 = new Web3(new Web3WsProvider(provider, {
               timeout,
               headers: { authorization: '' },
               clientConfig: {
                  maxReceivedFrameSize: 100000000,
                  maxReceivedMessageSize: 100000000,
                  keepalive: true,
                  keepaliveInterval: 60000
               },
               reconnect: {
                  auto: true,
                  delay: 5000,
                  maxAttempts: 5,
                  onTimeout: false
               }
            }));
            break;

         default:
            this._web3 = new Web3(provider || Web3.givenProvider);
            break;
      }
   }

   get currentProvider() {
      return this._web3.currentProvider;
   }

   get web3Version() {
      return this._web3.version;
   }
});
