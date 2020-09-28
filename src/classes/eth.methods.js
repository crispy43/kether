const { Mixin } = require('mixwith');
const BigNumber = require('bignumber.js');
const format = require('date-fns/format');
const web3Eth = require('../functions/web3.eth');
const ethscanAccounts = require('../functions/ethscan.accounts');



/**
 * methods
 * 
 * @class
 */

module.exports = Mixin((SuperClass) => class extends SuperClass {
   constructor(provider, type, timeout, prefixUrl, etherscanKey) {
      super(provider, type, timeout, prefixUrl, etherscanKey);
   }



   /**
    * 이더리움 잔액 조회
    * @function getEthBalance
    * 
    * @param {Object} [unit = ether] 이더리움 단위
    * @property {Object} _web3
    * @property {Object} _ethscan
    * @property {Set} _accounts
    * @return {String} result
    */

   async getEthBalance(unit = 'ether') {

      // 주소 하나 조회
      if (this._accounts.size === 1) {
         const balance = await web3Eth.getBalance(this._web3, this.accounts[0]);

         this._data.set('result', this._web3.utils.fromWei(balance, unit));
         this._data.set('details', new Map().set(this.accounts[0], this._web3.utils.fromWei(balance, unit)));
         return this._data.get('result');


      // 주소 멀티 조회
      } else if (this._accounts.size > 1) {
         const balances = await web3Eth.getBalanceBatch(this._web3, this.accounts);
         let totalBalance = new BigNumber(0);
         const details = new Map();

         for (let i in balances) {
            totalBalance = totalBalance.plus(balances[i]);
            details.set(this.accounts[i], this._web3.utils.fromWei(balances[i], unit));
         }

         this._data.set('result', this._web3.utils.fromWei(totalBalance.toFixed(), unit));
         this._data.set('details', details);
         return this._data.get('result');
      }

      /* // 이더스캔 주소 멀티 조회
      } else if (this._accounts.size > 1) {
         const balances = await ethscanAccounts.getEthBalanceMulti(this._ethscan, this.accounts);
         let totalBalance = new BigNumber(0);
         const details = new Map();

         for (let i in balances) {
            totalBalance = totalBalance.plus(balances[i].balance);
            details.set(balances[i].account, this._web3.utils.fromWei(balances[i].balance, unit));
         }

         this._data.set('result', this._web3.utils.fromWei(totalBalance.toFixed(), unit));
         this._data.set('details', details);
         return this._data.get('result');
      } */
   }



   /**
    * 이더리움 일반 트랜잭션 내역 조회
    * @function getNormalTransactions
    * 
    * @param {Number|String} account 조회할 계정 인덱스 | 계정 주소
    * @param {Object=} options 조회 옵션
    * @param {String} [options.unit = ether] 이더리움 단위
    * @param {String} [options.timeFormat = iso] 타임 포멧
    * @param {String} [options.sort = asc] 정렬
    * @param {Number} [options.offset = 15] 오프셋
    * @param {Number} [options.page = 1] 페이지
    * @property {Object} _web3
    * @property {Object} _ethscan
    * @property {Set} _accounts
    * @return {String} result
    */

   async getNormalTransactions(account, { unit = 'ether', timeFormat = 'iso', sort = 'asc', offset = 15, page = 1 } = {}) {

      let address;
      if (typeof account === 'number') {
         address = this.accounts[parseInt(account)];
      } else address = account;

      const txs = await ethscanAccounts.getNormalTransactions(this._ethscan, address, sort, offset, page);

      for (let i in txs) {
         txs[i].value = this._web3.utils.fromWei(txs[i].value, unit);
         txs[i].time = (timeFormat.toLowerCase() === 'iso') ?
            new Date(txs[i].timeStamp * 1000).toISOString() :
            format(new Date(txs[i].timeStamp * 1000), timeFormat);
      }

      this._data.set('result', txs);
      this._data.set('details', new Set(txs));
      return this._data.get('result');
   }
});
