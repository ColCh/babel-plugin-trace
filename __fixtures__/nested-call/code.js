function decorateName (name) {
    return "<<" + name + ">>";
}

function decorateGreet (str) {
    return "Hello, " + str;
}

function decorateExclamate (str) {
    return str + "!";
}

// should be `Hello, <<World>>!`
var decorated = decorateExclamate(
    decorateGreet(
        decorateName('World')
    )
);

// here are 3 nested calls