const { mix, Mixin } = require('mixwith');


const A = Mixin((SuperClass) => class extends SuperClass {
   constructor(a, b, c, d) {
      super(a, b, c, d);

      this.a = a;
      this.b = b;
   }
});


const B = Mixin((SuperClass) => class extends SuperClass {
   constructor(a, b, c, d) {
      super(a, b, c, d);

      this.c = c;
      this.d = d;
   }
});


module.exports = class extends mix(class Kether {}).with(A, B) {
   constructor({ infuraId, etherscanKey, type, chain }) {
      super(infuraId, etherscanKey, type, chain);
   }

   info() {
      console.log(this);
   }
}
