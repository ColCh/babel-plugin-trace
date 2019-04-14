function Greeter(name) {
  this.name = function $MYCONSOLELOGLOGGER_7$($l, $r) {
    return console.log('>>> ASSIGN greeter-pure/code.js this.name to name, from ==> ', $l, ' , to => ', $r), $r;
  }(this.name, name);
}

Greeter.prototype.greet = function $MYCONSOLELOGLOGGER_8$($l, $r) {
  return console.log('>>> ASSIGN greeter-pure/code.js Greeter.prototype.greet , from ==> ', $l, ' , to => ', $r), $r;
}(Greeter.prototype.greet, function () {
  (function $MYCONSOLELOGLOGGER_9$($arg$0) {
    return console.log('>>> CALL greeter-pure/code.js alert (', $arg$0, ')'), alert($arg$0);
  })('Hello, ' + this.name + ' !');
});

var greeter = new Greeter('World');

(function $MYCONSOLELOGLOGGER_10$() {
  return console.log('>>> CALL greeter-pure/code.js greeter.greet ()'), greeter.greet();
})(); // call!