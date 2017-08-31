# thunkify-array

A extension of thunkify

##Feature

If you want to execute a function with different arugments, you can push them in a array like this

```javascript
    const co = require('co')
    const thunkify = require('thunkify')
    co(function*(){
        yield [thunkify(fs.readFile)('index.js','utf-8'),thunkify(fs.readFile)('package.json','utf-8')]
    })
```

But if you have many arguments (in this example, they are files) to read, it's trouble

When you use thunkify-array, you can pass the first argument as array that include all arguments, like this

```javascript
    const co = require('co')
    const thunkifyArr = require('thunkify-array')
    co(function*(){
        yield thunkifyArr(fs.readFile)(['index.js','package.json'],'utf-8');
    })
```
It's easy!

However, if the first argument is not a array, it will work like thunkify

```javascript
    const co = require('co')
    const thunkify = require('thunkify')
    const thunkifyArr = require('thunkify-array')
    co(function*(){
        // They do same thing !!
        const a = yield thunkify(fs.readFile)('index.js','utf-8');
        const b = yield thunkifyArr(fs.readFile)('index.js','utf-8');
    })
```