// parse etherscan response data
exports.parseEthscanData = (data)=> {
   if (!data.status || !data.result) {
      throw new Error('invalid data');
   } else if (parseInt(data.status) === 1) {
      return data.result;
   } else if (parseInt(data.status) < 1) {
      return new Error(data.result);
   } else throw data;
}
