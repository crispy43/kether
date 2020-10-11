const fs = require('fs');
const Kether = require('../src/index');

const kether = new Kether({
   // provider: 'https://ropsten.infura.io/v3/4b993c9cbc554045b6a322602d0700fd',
   infuraId: '4b993c9cbc554045b6a322602d0700fd',
   // etherscanKey: 'VI9G61FUXK3P8K95UMXRDTM6U6AKBXY79Q',
   type: 'https',
   chain: 'ropsten',
   account: '0x0d6e238E573d3553bba0C3C5457E609B0085e5AC'
});

(async ()=> {
   kether.addAccount('0x09Fdf95D6F96dE428Aa8A0fd9094Bf0EAa8e3F77');
   console.log(kether.accounts);
   console.log(kether.defaultAccount);

   await kether.getBalance();
   console.log(kether.result);

   /* await kether.getNormalTransactions(0, { timeFormat: 'yyyy-MM-dd' });
   console.log(kether.details); */

   /* const abi = fs.readFileSync(`./test/contracts/asta/asta.abi`).toString();
   await kether.setContract(abi);
   console.log(kether.result);

   const bin = fs.readFileSync(`./test/contracts/asta/asta.bin`).toString();
   await kether.deploy(bin, ['Kether', 'KETH', 1000000, 8]);
   console.log(kether.result);
   console.log(kether.details); */
})();
