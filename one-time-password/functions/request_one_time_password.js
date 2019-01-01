const admin = require('firebase-admin');
const rp = require('request-promise');
const promotexter = require('./promotexter');
const {
  host,
  apiKey,
  apiSecret,
  from,
} = promotexter;

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.send(422).send({ error: 'You must provide a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin.auth().getUser(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));
      const text = `${code} is your one time password`;
      const options = {
        method: 'POST',
        uri: host,
        body: {
          apiKey,
          apiSecret,
          from,
          to: phone,
          text
        },
        json: true
      };

      rp(options)
        .then(user => {
            return res.send("SUCCESS");
        })
        .catch(err => {
          if (err) {
            return res.status(422).send(err);
          }
        });
      // request.post(
      //   host,
      //   {
      //     apiKey,
      //     apiSecret,
      //     from,
      //     to: phone,
      //     text
      //   },
      //   (err, response, body) => {
      //    if (err) {
      //      return res.status(422).send(err);
      //    }

       admin.database().ref('users/' + phone)
        .update({ code: code, codeValid: true }, () => {
          res.send({ success: true });
        })
      // });
      return res.send({ userRecord, code, from, to: phone  });
    })
    .catch(err => {
      res.status(422).send({ error: err });
    });
}
