module.exports = {

    db: 'mongodb://localhost/filecoves-test',
    port: 3001,
    app: {
      name: 'FileCoves Test'
    },

    facebook: {
        clientID: "249678341873679",
        clientSecret: "3689affe76888332a37ee31e8d7e8ffa",
        callbackURL: '/auth/facebook/callback'
    }

}
