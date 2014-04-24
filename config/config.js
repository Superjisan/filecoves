var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')


  development: {
    db: 'mongodb://localhost/filecoves',
    root: rootPath,
    app: {
      name: 'FileCoves'
    },
  },
  test: {
    db: 'mongodb://localhost/filecoves_test',
    root: rootPath,
    app: {
      name: 'FileCoves Test'
    }
  }
}
