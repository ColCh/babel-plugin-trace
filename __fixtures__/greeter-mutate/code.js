function Greeter (name) {
    this.name = name;
}

Greeter.prototype.greet = function () {
    alert('Hello, ' + this.name + ' !');
};

var greeter = new Greeter('Foo');

greeter.name = 'World'; // assignment!

greeter.greet(); // call!