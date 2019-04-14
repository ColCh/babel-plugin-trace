# babel-plugin-trace

automatic console logger.

## plugin would to instrument such cases

### function call

```js
// file: index.js
// from
alert('hello world!')

// to
(function (firstArgument) {
    console.log('>>> CALL index.js alert("Hello world!")');
    return alert(firstArgument);
})('hello world!');
```

### variable assignment

```js
// from
window.name = "FOO";

// to:
window.name = (function (firstArgument) {
    console.log('>>> ASSIGN index.js window.name from "" to "FOO"');
    return "FOO";
})();
```

See fixtures dir for more examples: [__fixtures__](/__fixtures__)

## state

very WIP

source code is very small, please browse it