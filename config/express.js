// var express = require('express')
// var express = require('express')
//   , mongoStore = require('connect-mongo')(express)
//   , flash = require('connect-flash')
//   , winston = require('winston')
//   , helpers = require('view-helpers')

// var env = process.env.NODE_ENV || 'development'

// module.exports = function (app, config) {

//   app.set('showStackError', true)

//   app.use(express.favicon())
//   app.use(express.static(config.root + '/public'))

//   // Logging
//   // Use winston
//   var log = {
//       stream: {
//         write: function (message, encoding) {
//           winston.info(message)
//         }
//       }
//     }

//   // You can uncomment this line if you to enable logging
//   // app.use(express.logger(log))

//   app.configure(function () {
//     app.use(express.bodyParser())
//     app.use(express.methodOverride())
//     app.set('view engine', 'html')

//     app.use(app.router)

//   })
// }
