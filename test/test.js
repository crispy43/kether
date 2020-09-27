const Kether = require('../src/index');

const kether = new Kether({
   // provider: 'https://ropsten.infura.io/v3/4b993c9cbc554045b6a322602d0700fd',
   infuraId: '4b993c9cbc554045b6a322602d0700fd',
   etherscanKey: 'VI9G61FUXK3P8K95UMXRDTM6U6AKBXY79Q',
   type: 'https',
   chain: 'ropsten'
});

(async ()=> {
   kether.addAccount('0x0d6e238E573d3553bba0C3C5457E609B0085e5AC');
   kether.addAccount('0x09Fdf95D6F96dE428Aa8A0fd9094Bf0EAa8e3F77');
   console.log(kether.accounts);
   console.log(await kether.getBalance());
   console.log(kether.details);
})();
