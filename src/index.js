const { mix } = require('mixwith');
const Web3 = require('./classes/web3');
const Etherscan = require('./classes/ethscan');
const EthMethods = require('./classes/eth.methods');
const web3Eth = require('./functions/web3.eth');



/**
 * kether.js
 * 
 * @version 0.0.1
 * @author Sungjae Jin 2020 <crispy4343@gmail.com>
 * @see {@link https://github.com/crispy43/kether}
 */



/**
 * Kether
 * 
 * @class
 * @param {Object} options 인스턴스 생성 옵션
 * @param {String} options.provider web3 원격 노드 연결 주소
 * @param {String} options.infuraId infura.io 연결 아이디
 * @param {String} options.etherscanKey etherscan.io API KEY
 * @param {String} [options.chain = mainnet] 이더리움 블록체인 네트워크, mainnet 또는 ropsten
 * @param {String} options.type web3 연결 프로토콜 종류, http 또는 ws
 * @param {String} options.timeout web3와 이더스캔 요청 제한 시간 (ms)
 * @return {Object} Kether instance
 */

module.exports = class extends mix(class Kether {}).with(Web3, Etherscan, EthMethods) {
   constructor({
      provider, infuraId, etherscanKey, chain = 'mainnet', type, timeout = 30 * 1000
   } = {}) {

      // super
      let infuraProvider;
      if (infuraId) {
         switch (type) {

            case 'http':
            case 'https':
               infuraProvider = `https://${chain}.infura.io/v3/${infuraId}`
               break;

            case 'ws':
            case 'wss':
               infuraProvider = `wss://${chain}.infura.io/ws/v3/${infuraId}`
               break;

            default:
               infuraProvider = `https://${chain}.infura.io/v3/${infuraId}`
               break;
         }
      }
      const prefixUrl = `https://api${(chain === 'mainnet') ? '' : '-' + chain}.etherscan.io/api`;
      super((provider) ? provider : infuraProvider, type, timeout, prefixUrl, etherscanKey);

      this._accounts = new Set([]);
      this._data = new Map();
      this._data.set('result', undefined);
      this._data.set('details', undefined);
   }



   // accounts
   get accounts() {
      return Array.from(this._accounts);
   }

   set accounts(accounts) {
      this._accounts = accounts;
   }

   addAccount(address) {
      return this._accounts.add(address);
   }

   hasAccount(address) {
      return this._accounts.has(address);
   }

   delAccount(address) {
      return this._accounts.delete(address);
   }

   clearAccounts() {
      this._accounts.clear();
   }



   // data
   get result() {
      return this._data.get('result');
   }

   get details() {
      return this._data.get('details');
   }

   get data() {
      return Object.fromEntries(this._data.entries());
   }

   setData(result, details = undefined) {
      this._data.set('result', result);
      this._data.set('details', details);
   }

   clearData() {
      this._data.set('result', undefined);
      this._data.set('details', undefined);
   }
};
