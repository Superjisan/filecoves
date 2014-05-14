module.exports = {

    db: 'mongodb://localhost/filecoves',

    app: {
      name: 'FileCoves'
    },

    facebook: {
        clientID: "249678341873679",
        clientSecret: "3689affe76888332a37ee31e8d7e8ffa",
        callbackURL: '/auth/facebook/callback'
    }

}
