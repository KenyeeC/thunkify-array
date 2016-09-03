'use strict';
const assert = require('assert');

function thunkify(fn){
    assert('function' == typeof fn, 'function required');

    return function(){

        let ctx = this;

        if(arguments[0] instanceof Array ){
            let iterator = [];
            let args = arguments;
            for(let arg of arguments[0]){
                let temp = function (done) {
                    let called;
                    let tempArgs = new Array(args.length);
                    for(let i = 0; i < tempArgs.length; ++i) {

                        if(i == 0){
                            tempArgs[0] = arg;
                        }else{
                            tempArgs[i] = args[i];
                        }
                    }
                    tempArgs.push(function(){
                        if (called) return;
                        called = true;
                        done.apply(null, arguments);
                    });
                    try {
                        fn.apply(ctx, tempArgs);
                    } catch (err) {
                        done(err);
                    }
                };
                iterator.push(temp);
            }
            return iterator;
        }

        let args = new Array(arguments.length);
        for(let i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        return function(done){
            let called;

            args.push(function(){
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}
module.exports = thunkify;