const t = require('babel-types');

const visited = new WeakSet();
let counter = 0;
const getId = () => counter++;


/**
 * TODO:
 *
 * make custom catcher, which would console.log by default
 */

/**
 * REFS
 * https://babeljs.io/docs/en/next/babel-types.html#callexpression
 * https://babeljs.io/docs/en/next/babel-types.html#memberexpression
 * https://babeljs.io/docs/en/next/babel-types.html#sequenceexpression
 * https://babeljs.io/docs/en/next/babel-types.html#expressionstatement
 * https://babeljs.io/docs/en/next/babel-types.html#functionexpression
 * https://babeljs.io/docs/en/next/babel-types.html#blockstatement
 * https://babeljs.io/docs/en/next/babel-types.html#returnstatement
 * https://github.com/babel/babel/blob/15dfce33df08bee7c515540b369fe3b872288404/packages/babel-types/src/validators/generated/index.js
 * https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
 * https://astexplorer.net/
 */

module.exports = function () {
    return {
        name: 'trace',
        visitor: {
            'CallExpression': (path) => {
                const { node } = path;

                if (visited.has(node)) {
                    return;
                }
                visited.add(node);

                const { callee, arguments: args } = node;

                if (isConsoleLogExpression(callee)) {
                    // do not transform console expressions
                    return;
                }

                const fnName = getCode(path, callee);

                if (callee.id && callee.id.name && callee.id.name.indexOf('$MYCONSOLELOGLOGGER') !== -1) {
                    // prevent recursion
                    return;
                }

                const argsVariables = args.map((_, i) => `$arg$${i}`);

                const fnArgs = args.map((arg, i) => {
                    if ('value' in arg) {
                        // literal type with value
                        return arg.value;
                    } else if (t.isIdentifier(arg)) {
                        return { name: getCode(path, arg), value: argsVariables[i]};
                    } else {
                        return getCode(path, arg);
                    }
                });

                const consoleLogBody = argsVariables.length === 0
                ? [ t.identifier(`'>>> CALL ${getFile(path)} ${fnName} ()'`) ]
                : [
                    t.identifier(`'>>> CALL ${getFile(path)} ${fnName} ('`),
                    t.identifier(fnArgs.map((arg, i) =>
                        arg && typeof arg == 'object' ? `['${arg.name}', ${arg.value}]` : argsVariables[i],
                    ).join(', ')),
                    t.identifier(`')'`),
                ];

                // foo(bar), to ->
                // (function () { return console.log(foo,bar), foo(bar); })(foo, bar)
                path.replaceWith(t.expressionStatement(t.callExpression(
                    t.functionExpression(t.identifier(`$MYCONSOLELOGLOGGER_${getId()}$`),
                        argsVariables.map(arg => t.identifier(arg)),
                        t.blockStatement([
                            t.returnStatement(t.sequenceExpression([t.callExpression(
                                consoleLogExpression, consoleLogBody
                            ), t.callExpression(
                                callee, argsVariables.map(arg => t.identifier(arg))
                            )]))
                    ])), args)
                ));

                path.skip();

                visited.add(path.node); // babel bug https://github.com/babel/babel/pull/9777
            },

            AssignmentExpression: (path) => {
                const { node } = path;
                if (visited.has(node)) {
                    return;
                }
                visited.add(node);

                const logRightVarName = t.isIdentifier(path.node.right) ? `to ${getCode(path, path.node.right)}` : '';

                // bar => (function (left, right) {console.log(left, right); return right})(bar);
                node.right = t.callExpression(
                    t.functionExpression(t.identifier(`$MYCONSOLELOGLOGGER_${getId()}$`),
                    [t.identifier('$l'), t.identifier('$r')],
                    t.blockStatement([
                        t.returnStatement(t.sequenceExpression([t.callExpression(
                            consoleLogExpression, [
                                t.identifier(`'>>> ASSIGN ${getFile(path)} ${getCode(path, path.node.left)} ${logRightVarName}, from ==> '`),
                                t.identifier("$l"),
                                t.identifier("' , to => '"),
                                t.identifier("$r"),
                            ]
                        ), t.identifier("$r")]))
                    ])), [path.node.left, path.node.right]
                );
            }
        }
    };
}

const escapeString = (s) => s.replace(/'/g, '\\\'');
const slideCode = (path, start, end) => path.hub.file.code.slice(start, end);
const getCode = (path, identifier) => escapeString(slideCode(path, identifier.start, identifier.end));
const getFile = (path) => path.hub.file.opts.filename.split(/\//).slice(-2).join('\/');

const isConsoleLogExpression = (callee) =>
    t.isMemberExpression(callee)
    && t.isIdentifier(callee.object)
    && callee.object.name === 'console';

// console.log
const consoleLogExpression = t.memberExpression(t.identifier('console'), t.identifier('log'));