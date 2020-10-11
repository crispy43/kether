const { parseEthscanData } = require('../common/utils');



/**
 * 이더리움 잔액 조회
 * @function getEthBalance
 *
 * @param {Object} ethscan ethscan 인스턴스
 * @param {Array} address ETH 주소
 * @return {Object} result
 */

exports.getEthBalance = async (ethscan, address) => {
   try {
      const data = await ethscan.get({
         searchParams: {
            module: 'account',
            action: 'balance',
            address,
            tag: 'latest',
         }
      }).json();
      
      return parseEthscanData(data);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 이더리움 멀티 잔액 조회
 * @function getEthBalanceMulti
 *
 * @param {Object} ethscan ethscan 인스턴스
 * @param {Array} accounts ETH 주소 리스트
 * @return {Object} result
 */

exports.getEthBalanceMulti = async (ethscan, accounts) => {
   try {
      const data = await ethscan.get({
         searchParams: {
            module: 'account',
            action: 'balancemulti',
            address: `${accounts.join()}`,
            tag: 'latest',
         }
      }).json();
      
      return parseEthscanData(data);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 일반 트랜잭션 내역 조회
 * @function getNormalTransactions
 *
 * @param {Object} ethscan ethscan 인스턴스
 * @param {String} address ETH 주소
 * @param {String} sort 정렬
 * @param {Number} offset 오프셋
 * @param {Number} page 페이지
 * @return {Object} result
 */

exports.getNormalTransactions = async (ethscan, address, sort, offset, page) => {
   try {
      const data = await ethscan.get({
         searchParams: {
            module: 'account',
            action: 'txlist',
            address,
            startblock: 0,
            endblock: 99999999,
            sort,
            offset,
            page,
        }
      }).json();
      
      return parseEthscanData(data);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 인터널 트랜잭션 내역 조회
 * @function getInternalTransactions
 *
 * @param {Object} ethscan ethscan 인스턴스
 * @param {String} address ETH 주소
 * @param {String} sort 정렬
 * @param {Number} offset 오프셋
 * @param {Number} page 페이지
 * @return {Object} result
 */

exports.getInternalTransactions = async (ethscan, address, sort, offset, page) => {
   try {
      const data = await ethscan.get({
         searchParams: {
            module: 'account',
            action: 'txlistinternal',
            address,
            startblock: 0,
            endblock: 99999999,
            sort,
            offset,
            page,
        }
      }).json();

      console.log(data);
      
      return parseEthscanData(data);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}
