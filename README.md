# thunkify-array

##Feature
You can use thunkify an array like yield an array.

But if the first argument is an array, thunkify-array will iterates it and each item will be the fist argument.Like a iterator.

And return a thunkify array

For example 

```javascript
thunkify-array(fs.readFile)(['index.js','package.json'],'utf-8');
```
equal to 
```javascript
[thunkify(fs.readFile)('index.js','utf-8'),thunkify(fs.readFile)('package.json','utf-8')]
```

and
```javascript
thunkify-array(fs.readFile)('package.json','utf-8');
```
still equal to 
```javascript
thunkify(fs.readFile)('package.json','utf-8');
```
So you can yield it easily.
##Example
```javascript
var thunkify = require('thunkify-array');
var co = require('co');
var fs = require('fs');
var read = thunkify(fs.readFile);
co(function* () {
    var res = yield read(['index.js','package.json'],'utf-8'); //if you have these file
    console.log(res);
}).catch((err)=>{console.error(err)});
```
