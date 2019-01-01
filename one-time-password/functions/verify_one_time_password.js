const admin = require('firebase-admin');

module.exports = (req,res) => {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided!' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.bodycode, 10);
  let tokenKey = null;
  admin.auth().getUser(phone)
    .then(userRecord => {
      // find user in database
      const ref = admin.database().ref('users/' + phone);
      // and copy that object with the same value
      ref.on('value', snapshot => {
        // stop listening to value changes after we have the copy of value we need
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        // update the validity of code to false
        ref.update({ codeValid: false });
        //creates token using the phone number of user
        admin.auth().createCustomToken(phone)
          .then(token => {
            tokenKey = token;
            return res.send({ token: token });
          })
          .catch(err => res.send({ error: err }));
      });
      return res.send({ userRecord, token: tokenKey  });
    })
    .catch(err => {
      res.status(422).send({ error: err });
    })
}
