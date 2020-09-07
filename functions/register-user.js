const faunadb = require('faunadb'); /* Import faunaDB sdk */
const bcrypt = require('bcryptjs');

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log('Function `create-user` invoked');
  const data = JSON.parse(event.body);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(data.password, salt, (err, hash) => {
      if (err) throw err;
      data.password = hash;

      const user = {
        data: data,
      };

      return client
        .query(q.Create(q.Ref('classes/users'), user))
        .then((response) => {
          /* Success! return the response with statusCode 200 */
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(response),
          });
        })
        .catch((error) => {
          /* Error! return the error with statusCode 400 */
          return callback(null, {
            statusCode: 400,
            body: JSON.stringify(error),
          });
        });
    });
  });
};
