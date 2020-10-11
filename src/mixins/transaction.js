const { Mixin } = require('mixwith');
const BigNumber = require('bignumber.js');
const format = require('date-fns/format');
const { transactionCreater } = require('../common/utils');



/**
 * Transaction
 * 
 * @class
 */

module.exports = Mixin((SuperClass) => class extends SuperClass {
   constructor(provider, type, timeout, prefixUrl, etherscanKey) {
      super(provider, type, timeout, prefixUrl, etherscanKey);

      this._transaction = new Map();
   }

   getTransactions(address) {
      return this._transaction.get(address);
   }

   setTransactions(address, transaction) {
      return this._transaction.set(address, transaction);
   }

   hasTransaction(address) {
      return this._transaction.has(address);
   }

   delTransaction(address) {
      return this._transaction.delete(address);
   }

   clearTransaction() {
      return this._transaction.clear();
   }



   /**
    * 트랜잭션 넌스 세팅
    * @function setNextNonce
    * 
    * @param {String} [defaultBlock = pending] 조회할 블록 정의
    * @property {Object} _web3
    * @property {Set} _transaction
    * @return {Number} next nonce
    */

   async setNextNonce(account, defaultBlock = 'pending') {

      // 주소 하나 세팅
      if (this._accounts.size === 1 || account >= 0) {

         let address;
         if (typeof account === 'number') address = this.accounts[parseInt(account)];
         else if (typeof account === 'string') address = this.isAddress(account);
         else address = this.accounts[0];

         if (this.hasTransaction(address)) {
            const lastNonce = await web3Contract.getTransactionCount(this._web3, address, defaultBlock);
            const nextNonce = lastNonce + 1;
            const { transaction: localTransaction, nonce: localNonce } = this.getTransactions(address);
            if (nextNonce !== localNonce) this.setTransactions(address, localTransaction(nextNonce, localTransaction));
            
            this.setData(true, new Map.set(address, nextNonce));
            return this.result;

         } else {
            this.setData(false, new Map.set(address, false));
            return this.result;
         }
      }
      /* // 주소 멀티 세팅
      } else if (this._accounts.size > 1) {

         const addresses = [];
         for (const address of this.account) {
            if (this.hasTransaction(address)) addresses.push(address);
         }

         if (addresses.length > 0) {
            const lastNonce = await web3Contract.getTransactionCountBatch(this._web3, addresses, defaultBlock);
            const nextNonce = lastNonce + 1;
            const { transaction: localTransaction, nonce: localNonce } = this.getTransactions(address);
            if (nextNonce !== localNonce) this.setTransactions(address, localTransaction(nextNonce, localTransaction));

            this.setData(true, new Map.set(address, nextNonce));
            return this.result;
         }
      }
      
      this._contracts.set((contractAddress) ? contractAddress : '_', contract);

      this.setData(true, contract);
      return this.result; */
   }
});
