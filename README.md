slasp.js: SugarLess Asynchronous Structured Programming
=======================================================
This package is the result of a personal experiment and implements a module that
provides artificially created equivalents to common JavaScript programming
language constructs that are used to implement synchronous code. Most of these
implement structured programming concepts.

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

Usage
=====
Currently, this library is tested for usage with Node.js and web browsers.

Node.js
-------
Usage on Node.js is straight forward. It can be installed into a working
directory with the NPM package manager by running:

    $ npm install slasp

In the code, the module can be imported with:

    var slasp = require('slasp');

Browser
-------
For usage in the browser copy `lib/slasp.js` into a folder accessible by a web
page. Then add the following script include to the HTML code of that web page:

    <script type="text/javascript" src="slasp.js"></script>

An example
==========
Consider the following synchronous JavaScript code fragment that uses an
implementation of the Gregory–Leibniz formula to approximate pi up to 5 decimal
places:

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

Although the code above seem to do its job, it also takes a bit of time (i.e.
a couple of seconds) to complete.

While the code is executing it blocks the environment's event loop. As a
consequence, a browser cannot handle a user's input event and the Node.js
HTTP server cannot handle incoming connections.

To resolve the blocking issue, JavaScript's `while` construct can be replaced by
a `slasp.whilst` function invocation. Moreover, we can also the expressions and
statements asynchronous by generating tick events:

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

* The `html` folder shows a simple JavaScript program embedded in a web page that
is not supposed to block the browser.

API documentation
=================
This package includes API documentation, which can be generated with
[JSDuck](https://github.com/senchalabs/jsduck). The Makefile in this package
contains a `duck` target to generate it and produces the HTML files in `build/`:

    $ make duck

License
=======
The contents of this package is available under the [MIT license](http://opensource.org/licenses/MIT)
