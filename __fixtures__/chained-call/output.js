function SumChain() {
  var sum = 0;
  var obj = {
    add: function (num) {
      sum += function $MYCONSOLELOGLOGGER_0$($l, $r) {
        return console.log('>>> ASSIGN chained-call/code.js sum to num, from ==> ', $l, ' , to => ', $r), $r;
      }(sum, num);

      return self;
    },
    getSum: function () {
      return sum;
    }
  };
  var self = obj;
  return obj;
} // expect to be 4


(function $MYCONSOLELOGLOGGER_1$() {
  return console.log('>>> CALL chained-call/code.js SumChain().add(1).add(1).add(1).add(1).getSum ()'), SumChain().add(1).add(1).add(1).add(1).getSum();
})();