/**
 * 이더리움 잔액 조회
 * @function getBalance
 *
 * @param {Object} web3 web3 인스턴스
 * @param {String} address ETH 주소
 * @param {String=} defaultBlock 조회할 블록 정의 (optional)
 * @return {String} 잔액
 */

exports.getBalance = async (web3, address, defaultBlock)=> {
   try {
      return await web3.eth.getBalance(address, defaultBlock);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 이더리움 멀티 잔액 조회
 * @function getBalanceBatch
 *
 * @param {Object} web3 web3 인스턴스
 * @param {String} accounts ETH 주소 리스트
 * @param {String=} defaultBlock 조회할 블록 정의 (optional)
 * @return {Array} 잔액 배열
 */

exports.getBalanceBatch = async (web3, accounts, defaultBlock)=> {
   try {
      const batch = new web3.BatchRequest();
      const promises = [];

      for (const address of accounts) {
         promises.push(
            new Promise((resolve, reject) => {
               batch.add(
                  web3.eth.getBalance.request(
                     address, (defaultBlock) ? defaultBlock : web3.eth.defaultBlock,
                     (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                     }
                  )
               );
            })
         );
      }

      batch.execute();
      return await Promise.all(promises);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 트랜잭션 카운트 조회
 * @function getTransactionCount
 *
 * @param {Object} web3 web3 인스턴스
 * @param {String} address ETH 주소
 * @param {String=} defaultBlock 조회할 블록 정의 (optional)
 * @return {Number} count
 */

exports.getTransactionCount = async (web3, address, defaultBlock)=> {
   try {
      return await web3.eth.getTransactionCount(address, defaultBlock);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 트랜잭션 카운트 멀티 조회
 * @function getBalanceBatch
 *
 * @param {Object} web3 web3 인스턴스
 * @param {String} accounts ETH 주소 리스트
 * @param {String=} defaultBlock 조회할 블록 정의 (optional)
 * @return {Array} 잔액 배열
 */

exports.getTransactionCountBatch = async (web3, accounts, defaultBlock)=> {
   try {
      const batch = new web3.BatchRequest();
      const promises = [];

      for (const address of accounts) {
         promises.push(
            new Promise((resolve, reject) => {
               batch.add(
                  web3.eth.getTransactionCount.request(
                     address, (defaultBlock) ? defaultBlock : web3.eth.defaultBlock,
                     (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                     }
                  )
               );
            })
         );
      }

      batch.execute();
      return await Promise.all(promises);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}
