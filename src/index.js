const { mix } = require('mixwith');
const Web3 = require('./mixins/web3');
const Etherscan = require('./mixins/ethscan');
const Ether = require('./mixins/ether');
const Transaction = require('./mixins/transaction');
const Contract = require('./mixins/contract');



/**
 * @name kether.js
 * @author Sungjae Jin 2020 <crispy4343@gmail.com>
 * @version 0.1.0
 * @see {@link https://github.com/crispy43/kether}
 */



/**
 * @namespace Kether
 * @class
 * @classdesc Kether 인스턴스 생성
 * @param {Object} options 인스턴스 생성 옵션
 * @param {String} options.provider web3 원격 노드 연결 주소
 * @param {String=} options.infuraId infura.io 연결 아이디 (provider 없을 경우 필수)
 * @param {String=} options.etherscanKey etherscan.io API KEY (optional)
 * @param {String} [options.chain = mainnet] 이더리움 블록체인 네트워크, mainnet 또는 ropsten
 * @param {String} [options.type = https] web3 연결 프로토콜 종류, https 또는 wss
 * @param {Number} [options.timeout = 15 * 1000] web3와 이더스캔 요청 제한 시간 (ms)
 * @param {String=} options.account 기본 이더리움 주소
 * @example
 * const kether = new Kether({ infuraId: 'abcd...', account: '0x0...' });
 * @returns {Object} Kether 인스턴스
 */

module.exports = class extends mix(class Kether {}).with(Web3, Etherscan, Ether, Transaction, Contract) {
   constructor({
      provider, infuraId, etherscanKey, chain = 'mainnet', type, timeout = 15 * 1000, account
   } = {}) {

      // super
      let web3Provider;
      if (!provider && infuraId) {
         switch (type) {

            case 'http':
            case 'https':
               web3Provider = `https://${chain}.infura.io/v3/${infuraId}`
               break;

            case 'ws':
            case 'wss':
               web3Provider = `wss://${chain}.infura.io/ws/v3/${infuraId}`
               break;

            default:
               web3Provider = `https://${chain}.infura.io/v3/${infuraId}`
               break;
         }
      } else web3Provider = provider;

      const prefixUrl = `https://api${(chain === 'mainnet') ? '' : '-' + chain}.etherscan.io/api`;
      super(web3Provider, type, timeout, prefixUrl, etherscanKey);

      const defaultAccount = this.isAddress(account);

      this._accounts = (defaultAccount) ? new Set([defaultAccount]) : new Set();
      this._defaultAccount = (defaultAccount) ? defaultAccount : '';
      this._data = new Map();
      this._data.set('result', undefined);
      this._data.set('details', undefined);
   }



   // accounts
   get accounts() {
      return Array.from(this._accounts);
   }

   get defaultAccount() {
      return this._defaultAccount;
   }

   hasAccount(address) {
      return this._accounts.has(address);
   }

   addAccount(address, isDefault) {
      const validAddress = this.isAddress(address);
      if (!this._defaultAccount) this._defaultAccount = validAddress;
      else if (isDefault) this._defaultAccount = validAddress;
      return this._accounts.add(validAddress);
   }

   delAccount(address) {
      return this._accounts.delete(address);
   }

   clearAccount() {
      return this._accounts.clear();
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

   setData(result = true, details = undefined) {
      this._data.set('result', result);
      this._data.set('details', details);
   }

   clearData() {
      this._data.set('result', undefined);
      this._data.set('details', undefined);
   }
};
