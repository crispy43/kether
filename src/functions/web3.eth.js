/**
 * 이더리움 잔액 조회
 *
 * @param {Object} config The default config for the instance
 * @param {a} config The default config for the instance
 * @return {Kether} A new instance of Kether
 */

exports.getBalance = async (Web3, address)=> {
   try {
      return await Web3.eth.getBalance(address);

   } catch (error) {
      return console.error(error);
   }
}
