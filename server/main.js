// require('babel-core/register')({
//   'presets': [
//     ['env', {
//       'targets': {
//         'node': true
//       }
//     }]
//   ],
//   "plugins": [
//     ["transform-runtime", {
//       "helpers": false, // defaults to true
//       "polyfill": false, // defaults to true
//       "regenerator": true, // defaults to true
//       "moduleName": "babel-runtime" // defaults to "babel-runtime"
//     }]
//   ]
// })
//require("babel-polyfill");
require('../env')
require('./app.js')
