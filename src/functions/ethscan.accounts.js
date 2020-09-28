const { parseEthscanData } = require('../common/utils');



/**
 * 이더리움 잔액 조회
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
