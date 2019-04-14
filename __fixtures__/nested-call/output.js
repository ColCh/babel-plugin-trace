function decorateName(name) {
  return "<<" + name + ">>";
}

function decorateGreet(str) {
  return "Hello, " + str;
}

function decorateExclamate(str) {
  return str + "!";
} // should be `Hello, <<World>>!`


var decorated = function $MYCONSOLELOGLOGGER_12$($arg$0) {
  return console.log('>>> CALL nested-call/code.js decorateExclamate (', $arg$0, ')'), decorateExclamate($arg$0);
}(decorateGreet(decorateName('World'))); // here are 3 nested calls