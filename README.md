slasp.js: SugarLess Asynchronous Structured Programming
=======================================================
This package is the result of a personal experiment. From that experiment, I
concluded that making a JavaScript software application asynchronous (i.e.
non-blocking) requires someone to "forget" about commonly used synchronous programming
language constructs and replace them by different ones supporting asynchronous
programming.

This package implements a module that provides artificially created asynchronous
equivalents to common synchronous JavaScript programming language constructs.
Most of these implement structured programming concepts.

There are many software abstractions available to make asynchronous programming
more convenient and to cope with the so-called "callback hell". This library is
different compared to others, because it sticks to the bare bones of the
JavaScript language.

Unlike other software abstractions, it does NOT provide any _sugar_, such as
asynchronous variants of utility functions found in functional programming
languages, encapsulation of activities into objects, and so on.

However, it does provide more features when it comes to expressing things in an
asynchronous world, such as asynchronous if/while/do-while test conditions and
asynchronous object constructors and methods.

Sugar (of course) can still be built on top of this library.

Disclaimer
==========
This package is effectively obsolete with the introduction of various new
concepts in the ECMAScript 6 standard, such as Promises, `async` and `await`.

It will be kept available to support old projects. For new projects, simply
using `await` to fetch the result of an asynchronous function (returning) a
`Promise` should suffice. As a result, the language concepts I was referring
can be used without any problems.

Concepts
========
The JavaScript language implements a number of programming language concepts.
The following table lists these concepts, how they are used while programming
synchronous applications, and what alternatives should be used to make the same
concepts asynchronous:

Concept            | Synchronous                                         | Asynchronous
-------------------|-----------------------------------------------------|---------------------------------------------------------------------------
Function interface | `function f(a) { ... }`                             | `function f(a, callback) { ... }`
Return statement   | `return val;`                                       | `callback(null, val);`
Sequence           | `a; b;`                                             | `slasp.sequence([function (cb) { a; cb(); }, function(b) { b; cb(); } ]);`
if-then-else       | `if c() t() else e();`                              | `slasp.when(c, t, e);`
switch             | `switch(c()) { case "a": f(); break; }`             | `slasp.circuit(c, function(r, cb) { switch(r) { ... } });`
Recursion          | `function fun() { fun(); }`                         | `function fun(cb) { setImmediate(function() { fun(cb); }) };`
while              | `while(c()) { s(); }`                               | `slasp.whilst(c, s);`
doWhile            | `do { s(); } while(c());`                           | `slasp.doWhilst(s, c);`
for                | `for(s(); c(); inc()) { stmt(); }`                  | `slasp.from(s, c, inc, stmt);`
for-in             | `for(var a in arr()) { stmt(); }`                   | `slasp.fromEach(arr, function(a, callback) { stmt(callback); });`
throw              | `throw err;`                                        | `callback(err);`
try-catch-finally  | `try { a(); } catch(err) { e(); } finally { f(); }` | `slasp.attempt(a, function(err, callback) { e(callback); }, f);`
constructor        | `function Cons(a) { this.a = a; }`                  | `function Cons(self, a, callback) { self.a = a; callback(null); }`
new                | `new Cons(a);`                                      | `slasp.novel(Cons, a, callback);`

For most of the concepts listed above, a function abstraction is needed to make
an application asynchronous. These abstractions are provided by this library.

Usage
=====
Currently, this library is tested for usage with Node.js and web browsers.

Node.js
-------
Usage on Node.js is straight forward. It can be installed into a working
directory with the NPM package manager by running:

    $ npm install slasp

In the code, the module can be imported with:

```javascript
var slasp = require('slasp');
```

Browser
-------
For usage in the browser copy `lib/slasp.js` into a folder accessible by a web
page. Then add the following script include to the HTML code of that web page:

```html
<script type="text/javascript" src="slasp.js"></script>
```

An example
==========
Consider the following synchronous JavaScript code fragment that uses an
implementation of the [Gregory–Leibniz](http://en.wikipedia.org/wiki/Leibniz_formula_for_%CF%80)
formula to approximate pi up to 5 decimal places:

```javascript
function printOnConsole(value) {
    console.log(value);
}

function checkTreshold() {
    return (approx.toString().substring(0, 7) != "3.14159");
}

var approx = 0;
var denominator = 1;
var sign = 1;

while(checkTreshold()) {
    approx += 4 * sign / denominator;
    printOnConsole("Current approximation is: "+approx);

    denominator += 2;
    sign *= -1;
}
```

Although the code above seem to do its job, it also takes a bit of time to
complete. In this time window the environment such as a web browser or web server
is blocked, because the event loop cannot process events.

To resolve the blocking issue, JavaScript's `while` construct can be replaced by
a `slasp.whilst` function invocation. Moreover, we can also make the expressions
and statements asynchronous by generating tick events:

```javascript
var slasp = require('slasp');

function printOnConsole(value, callback) {
    process.nextTick(function() {
        console.log(value);
    });
}

function checkTreshold(callback) {
    process.nextTick(function() {
        callback(null, approx.toString().substring(0, 7) != "3.14159");
    });
}

var approx = 0;
var denominator = 1;
var sign = 1;

slasp.whilst(checkTreshold, function(callback) {
    slasp.sequence([
        function(callback) {
            approx += 4 * sign / denominator;
            callback(null);
        },

        function(callback) {
            printOnConsole("Current approximation is: "+approx, callback);
        },

        function(callback) {
            denominator += 2;
            callback(null);
        },

        function(callback) {
            sign *= -1;
            callback(null);
        }
    ], callback);
});
```

The above expression does not block an environment's event loop allowing a
Node.js HTTP server to still handle incoming connections and a browser to still
handle user input.

Overview
========
The `slasp` module implements the following function abstractions:

sequence(stmts, callback)
-------------------------
Runs a number of asynchronous statements sequentially.

when(conditionFun, thenFun, elseFun, callback)
----------------------------------------------
Runs a selection statement that executes a then statment when the conditional
function yields true and an else statement when conditional statement yields
false.

This function is an asynchronous variant of JavaScript's `if-then-else`
construct.

circuit(conditionFun, caseFun, callback)
----------------------------------------
Runs a statment in which a switch statement can be embedded so that a
selection of multiple options can be done.

This function is supposed to represent an asynchronous variant of
JavaScript's `switch` construct

whilst(conditionFun, statementFun, callback)
--------------------------------------------
Keeps repeating a statement as long as the condition function yields true. The
condition check is done at the beginning of each iteration.

This function represents an asynchronous variant of JavaScript's `while`
construct.

doWhilst(statementFun, conditionFun, callback)
----------------------------------------------
Keeps repeating a statement as long as the condition function yields true. The
condition check is done at the end of each iteration.

This function represents an asynchronous variant of JavaScript's `do-while`
construct.

from(startFun, conditionFun, stepFun, statementFun, callback)
-------------------------------------------------------------
Performs a repetition a given number of times.

This function represents an asynchronous variant of JavaScript's `for` construct.

fromEach(startFun, statementFun, callback)
------------------------------------------
Iterates over the keys of an array or object.

This function represents an asynchronous variant of JavaScript's `for-in`
construct.

attempt(statementFun, captureFun, lastlyFun)
--------------------------------------------
Attempts to execute a statement and executes a capture function if some exception
has been thrown. Finally, it executes a lastly statement regardless of the
outcome.

This function represents an asynchronous variant of JavaScript's
`try-catch-finally` construct.

novel(constructorFun, ..., callback)
------------------------------------
Constructs a new object from a given constructor function.

Constructor functions have almost the same signature as conventional synchronous
ones. The main difference is that they use self instead of this to refer to the
object that is constructed. The last parameter should be a callback providing the
constructed object as a result, or an error if some exception has been thrown.

This function represents an asynchronous variant of JavaScript's `new` operator.

Examples
========
The test suite that resides in the `tests/` folder also serves an example
showcase:

* In the `nodejs` folder testcases can be found showing synchronous JavaScript
programs and their asynchronous counterparts using the function abstractions
described earlier

* The `html` folder contains a simple JavaScript program embedded in a web page
that is not supposed to block the browser.

API documentation
=================
This package includes API documentation, which can be generated with
[JSDoc](http://usejsdoc.org).

License
=======
The contents of this package is available under the [MIT license](http://opensource.org/licenses/MIT)
