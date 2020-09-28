const { Mixin } = require('mixwith');
const BigNumber = require('bignumber.js');
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
    * @param {Object} unit 이더리움 단위
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
});
