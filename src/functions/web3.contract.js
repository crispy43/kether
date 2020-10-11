/**
 * 컨트랙트 인스턴스 생성
 * @function newContract
 *
 * @param {Object} web3 web3 인스턴스
 * @param {Object} abi 계약 인터페이스
 * @param {String} contractAddress 계약 주소
 * @param {String=} options 계약 옵션
 * @return {Object} 컨트랙트 인스턴스
 */

exports.newContract = async (web3, abi, contractAddress, options)=> {
   try {
      return await new web3.eth.Contract(abi, contractAddress, options);

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}



/**
 * 컨트랙트 배포
 * @function deploy
 *
 * @param {Object} contract 계약 인스턴스
 * @param {String} from 보내는 주소
 * @param {String} data 바이너리 계약 데이터
 * @param {Array} args 계약 파라미터
 * @return {Object} 트랜잭션 인스턴스
 */

exports.deploy = async (contract, from, data, args)=> {
   try {
      return await contract.deploy({
         from,
         data: (data.substring(0, 2 !== '0x')) ? `0x${data}` : data,
         arguments: args
      });

   } catch (error) {
      return new Error((error.message) ? error.message : error);
   }
}
