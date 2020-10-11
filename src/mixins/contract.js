const { Mixin } = require('mixwith');
const BigNumber = require('bignumber.js');
const format = require('date-fns/format');
const web3Contract = require('../functions/web3.contract');



/**
 * Contract
 * 
 * @class
 */

module.exports = Mixin((SuperClass) => class extends SuperClass {
   constructor(provider, type, timeout, prefixUrl, etherscanKey) {
      super(provider, type, timeout, prefixUrl, etherscanKey);

      this._contracts = new Map();
   }

   getContract(contractAddress) {
      return this._contracts.get(contractAddress);
   }

   get undeployedContract() {
      return this._contracts.get('_');
   }

   getUndeployedContract() {
      return this._contracts.get('_');
   }

   hasContract(contractAddress) {
      return this._contracts.has(contractAddress);
   }

   delContract(contractAddress) {
      return this._contracts.delete(contractAddress);
   }

   delUndeployedContract() {
      return this._contracts.delete('_');
   }

   clearContract() {
      return this._contracts.clear();
   }



   /**
    * 컨트랙트 추가
    * @function setContract
    * 
    * @param {String|Object} abi JSON 계약 인터페이스
    * @param {String=} contractAddress 계약 주소
    * @param {Object=} options 계약 옵션
    * @property {Object} _web3
    * @property {Set} _contracts
    * @return {Boolean} isSet
    */

   async setContract(abi, contractAddress, options) {

      const contract = await web3Contract.newContract(
         this._web3, (typeof abi === 'string') ? JSON.parse(abi) : abi, contractAddress, options
      );
      this._contracts.set((contractAddress) ? contractAddress : '_', contract);

      this.setData(true, contract);
      return this.result;
   }



   /**
    * 컨트랙트 배포
    * @function deploy
    * 
    * @param {String} account 보내는 주소
    * @param {String} data 계약 주소
    * @param {Array} [args=[]] 계약 옵션
    * @property {Object} _web3
    * @property {Set} _contracts
    * @return {Boolean} isSet
    */

   async deploy(data, args = []) {
      console.log(this.undeployedContract);
      const contract = await web3Contract.deploy(this.undeployedContract, data, args);
      // this._contracts.set((contractAddress) ? contractAddress : '_', contract);

      this.setData(true, contract);
      return this.result;
   }
});
