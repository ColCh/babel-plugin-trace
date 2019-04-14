function Greeter(name) {
  this.name = function $MYCONSOLELOGLOGGER_2$($l, $r) {
    return console.log('>>> ASSIGN greeter-mutate/code.js this.name to name, from ==> ', $l, ' , to => ', $r), $r;
  }(this.name, name);
}

Greeter.prototype.greet = function $MYCONSOLELOGLOGGER_3$($l, $r) {
  return console.log('>>> ASSIGN greeter-mutate/code.js Greeter.prototype.greet , from ==> ', $l, ' , to => ', $r), $r;
}(Greeter.prototype.greet, function () {
  (function $MYCONSOLELOGLOGGER_4$($arg$0) {
    return console.log('>>> CALL greeter-mutate/code.js alert (', $arg$0, ')'), alert($arg$0);
  })('Hello, ' + this.name + ' !');
});

var greeter = new Greeter('Foo');

greeter.name = function $MYCONSOLELOGLOGGER_5$($l, $r) {
  return console.log('>>> ASSIGN greeter-mutate/code.js greeter.name , from ==> ', $l, ' , to => ', $r), $r;
}(greeter.name, 'World'); // assignment!


(function $MYCONSOLELOGLOGGER_6$() {
  return console.log('>>> CALL greeter-mutate/code.js greeter.greet ()'), greeter.greet();
})(); // call!