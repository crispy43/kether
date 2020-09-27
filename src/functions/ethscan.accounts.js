const { catchError, parseEthscanData } = require('../common/utils');



/**
 * 이더리움 멀티 잔액 조회
 *
 * @param {Object} config The default config for the instance
 * @param {a} config The default config for the instance
 * @return {Kether} A new instance of Kether
 */

exports.getEthBalanceMulti = async (etherscan, accounts) => {
   try {
      const data = await etherscan.get({
         searchParams: {
            module: 'account',
            action: 'balancemulti',
            address: `${accounts.join()}`,
            tag: 'latest',
         }
      }).json();
      
      return parseEthscanData(data);

   } catch (error) {
      return catchError(error);
   }
}