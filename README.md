# kether
easy to use ethereum client

## Get Started
it is necessary that remote provider and [etherscan.io](https://etherscan.io/apis) api key.
if you don't have any provider url, you can use [infura.io](https://infura.io/) account.
```bash
$ npm install kether
```

## Example
```javascript
const Kether = require('kether');

const kether = new Kether({
   // provider: 'https://ropsten.infura.io/v3/7b893c9cbc55404sb6a322302d0100fa',
   infuraId: '7b893c9cbc55404sb6a322302d0100fa',
   etherscanKey: 'EI9S61FUXK3P2K95UMXQDTM6U4AKBXU79Q',
   type: 'https',
   chain: 'ropsten'
});

(async () => {
   kether.addAccount('0x1601d864fb1dB90e0D17889F0BB083Bf181C05e4');
   kether.addAccount('0x3c2Db96d8eF6e6c4acA033CC342937A016E41997');
   console.log(await kether.getEthBalance()); // 1.0025
   // console.log(kether.result); // 1.0025
   // console.log(kether.details); // Map { 0x1601d864fb1dB90e0D17889F0BB083Bf181C05e4 => '0.5513', ... }
})();

```
## Licence
[MIT](https://github.com/crispy43/kether/blob/master/LICENSE)
