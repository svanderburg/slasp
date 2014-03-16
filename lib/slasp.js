/**
 * @static @class slasp
 * A collection of functions implementing asynchronous variants of the core
 * JavaScript language constructs.
 */
(function() {

    var slasp = {};

    /* Determine which implementation of setImmediate() to use */
    if(typeof setImmediate == "function") {
        slasp.setImmediate = setImmediate; // Use setImmediate() if it present
    } else {
        slasp.setImmediate = function(callback) {
           setTimeout(callback, 0); // Otherwise, use setTimeout() as a fallback
        };
    }

    function runStatement(stmts, index, callback, result) {
        if(index >= stmts.length) {
            if(typeof callback == "function")
                callback(null);
        } else {
            stmts[index](function(err, result) {
                if(err)
                    callback(err);
                else
                    runStatement(stmts, index + 1, callback, result);
                
            }, result);
        }
    }

    /**
     * Runs a number of asynchronous statements sequentially.
     *
     * Each statement is encoded as a function that takes two parameters.
     *
     * The first parameter is a callback function which is has to be invoked to
     * go to the next statement. The first parameter to the callback is an object
     * representing an exception. If no exception has been thrown this should be
     * set to null.
     *
     * The second parameter is optional and can be used to pass the result object
     * to the next statement.
     *
     * @param {Array.<function(callback, result)>} stmts An array of functions representing statements.
     * @param {function(err)} callback Callback that gets invoked when all statements are executed successfully or when an exception is thrown
     */
    function sequence(stmts, callback) {
        runStatement(stmts, 0, callback, undefined);
    }

    slasp.sequence = sequence;
    
    /**
     * Runs a selection statement that executes a then statment when the
     * conditional statement yields true and an else statement when conditional
     * function yields false.
     *
     * This function is an asynchronous variant of JavaScript's if-then-else
     * construct.
     *
     * @param {function(callback)} conditionFun A statement that evaluates a condition. It invokes the callback with a true result if and only if the condition yields true
     * @param {function(callback)} thenFun A statement that gets executed when the condition yields true
     * @param {function(callback)} elseFun A statement that gets executed when the condition yields false. If elseFun is not a function then nothing will be executed.
     * @param {function(err)} callback Callback that gets invoked after executing the selection.
     */
    function when(conditionFun, thenFun, elseFun, callback) {
        sequence([
            function(callback) {
                conditionFun(callback);
            },
            
            function(callback, result) {
                if(result) {
                    thenFun(callback);
                } else {
                    if(typeof elseFun == "function")
                        elseFun(callback);
                    else
                        callback(null);
                }
            }
        ], callback);
    }

    slasp.when = when;

    /**
     * Runs a statment in which a switch statement can be embedded so that a
     * selection of multiple options can be done.
     *
     * This function is supposed to represent an asynchronous variant of
     * JavaScript's switch construct
     *
     * @param {function(callback)} conditionFun A statement that evaluates a condition. It invokes the callback with a true result if and only if the condition yields true
     * @param {function(result,callback)} caseFun A statement in which a switch statemenent can be embedded. The result parameter gives the result of the condition function. The callback should be invoked when the work has been done.
     * @param {function(err)} callback Callback that gets invoked after executing the selection.
     */
    function circuit(conditionFun, caseFun, callback) {
        sequence([
            function(callback) {
                conditionFun(callback);
            },
            
            function(callback, result) {
                caseFun(result, callback);
            }
        ], callback);
    }

    slasp.circuit = circuit;

    /**
     * Keeps repeating a statement as long as the condition function yields
     * true. The condition check is done at the beginning of each iteration.
     *
     * This function represents an asynchronous variant of JavaScript's while
     * construct.
     *
     * @param {function(callback)} conditionFun A statement that evaluates a condition. It invokes the callback with a true result if and only if the condition yields true
     * @param {function(callback)} statementFun A statement that gets executed for each iteration.
     * @param {function(err)} callback Callback that gets invoked after executing the repetition.
     */
    function whilst(conditionFun, statementFun, callback) {
        when(conditionFun, function() {
            sequence([
                statementFun,
            
                function() {
                    slasp.setImmediate(function() {
                        whilst(conditionFun, statementFun, callback);
                    });
                }
            ], callback);
        }, undefined, callback);
    }

    slasp.whilst = whilst;
    
    /**
     * Keeps repeating a statement as long as the condition function yields
     * true. The condition check is done at the end of each iteration.
     *
     * This function represents an asynchronous variant of JavaScript's do-while
     * construct.
     *
     * @param {function(callback)} statementFun A statement that gets executed for each iteration.
     * @param {function(callback)} conditionFun A statement that evaluates a condition. It invokes the callback with a true result if and only if the condition yields true
     * @param {function(err)} callback Callback that gets invoked after executing the repetition.
     */
    function doWhilst(statementFun, conditionFun, callback) {
        sequence([
            statementFun,
            function() {
                when(conditionFun, function() {
                    slasp.setImmediate(function() {
                        doWhilst(statementFun, conditionFun, callback);
                    });
                }, undefined, callback);
            }
        ], callback);
    }

    slasp.doWhilst = doWhilst;

    /**
     * Performs a repetition a given number of times.
     *
     * This function represents an asynchronous variant of JavaScript's for
     * construct.
     *
     * @param {function(callback)} startFun Statement that gets executed before the repetition starts
     * @param {function(callback)} conditionFun A statement that evaluates a condition. It invokes the callback with a true result if and only if the condition yields true
     * @param {function(callback)} stepFun A statement that gets executed at the end of each iteration
     * @param {function(callback)} statementFun A statement that gets executed for each iteration.
     * @param {function(err)} callback Callback that gets invoked after executing the repetition.
     */
    function from(startFun, conditionFun, stepFun, statementFun, callback) {
        sequence([
            startFun,
            function(callback) {
                whilst(conditionFun, function(callback) {
                    sequence([
                        statementFun,
                        stepFun
                    ], callback);
                }, callback);
            }
        ], callback);
    }

    slasp.from = from;

    /**
     * Iterates over the keys of an array or object.
     *
     * This function represents an asynchronous variant of JavaScript's for-in
     * construct.
     *
     * @param {function(callback)} startFun Statement that gets executed before the repetition starts.
     * @param {function(result,callback)} statementFun A statement that gets executed for each iteration. The result parameter represents the value for each key.
     * @param {function(err)} callback Callback that gets invoked after executing the repetition.
     */
    function fromEach(startFun, statementFun, callback) {
        sequence([
            function(callback) {
                startFun(callback);
            },
            
            function(callback, result) {
                var keys = Object.keys(result);
                var i = 0;
    
                whilst(function(callback) {
                    callback(null, i < keys.length);
                }, function(callback) {
                    sequence([
                        function(callback) {
                            statementFun(keys[i], callback);
                        },
                        
                        function(callback) {
                            i++;
                            callback(null);
                        }
                    ], callback);
                }, callback);
            }
        ], callback);
    }

    slasp.fromEach = fromEach;

    /**
     * Attempts to execute a statement and executes a capture function if some
     * exception has been thrown. Finally, it executes a lastly statement
     * regardless of the outcome.
     *
     * This function represents an asynchronous variant of JavaScript's
     * try-catch-finally construct.
     *
     * @param {function(callback)} statementFun Statement to execute
     * @param {function(err,callback)} captureFun Statement to execute if an exception has been thrown. The first parameter contains the thrown error object.
     * @param {function(callback)} lastlyFun Statement that gets executed finally
     */
    function attempt(statementFun, captureFun, lastlyFun) {
        statementFun(function(err) {
            if(err) {
                if(typeof lastlyFun != "function")
                    lastlyFun = function() {};
                    
                captureFun(err, lastlyFun);
            } else {
                if(typeof lastlyFun == "function")
                    lastlyFun();
            }
        });
    }

    slasp.attempt = attempt;

    /**
     * Constructs a new object from a given constructor function.
     * 
     * Constructor functions have almost the same signature as conventional
     * synchronous ones. The main difference is that they use self instead of
     * this to refer to the object that is constructed. The last parameter should
     * be a callback providing the constructed object as a result, or an error if
     * some exception has been thrown.
     *
     * This function represents an asynchronous variant of JavaScript's new
     * operator.
     *
     * @param {...*} arguments This function takes at least two parameters. The first parameter is the constructor function.
     *     The last parameter is a callback providing the result or an exception. The other parameters are arbitrary parameters passed to the constructor.
     */
    function novel() {
        var args = Array.prototype.slice.call(arguments, 0);
    
        var constructorFun = args.shift();
        function F() {};
        F.prototype = constructorFun.prototype;
        F.prototype.constructor = constructorFun;
    
        var self = new F();
        args.unshift(self);
    
        var callback = args[args.length - 1];
        args[args.length - 1] = function(err, result) {
            if(err)
                callback(err);
            else
                callback(null, self);
        };
    
        constructorFun.apply(null, args);
    }

    slasp.novel = novel;

    /* Export the slasp functions */
    if(typeof module != "undefined")
        module.exports = slasp; // Node.js export
    else
        this.slasp = slasp; // Browser export

})();
