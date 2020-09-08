const faunadb = require('faunadb'); /* Import faunaDB sdk */
const q = faunadb.query;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  console.log('Function `authenticate-user` invoked');
  const data = JSON.parse(event.body);

  return client
    .query(q.Get(q.Match(q.Index('users_by_email'), data.email)))
    .then(async (response) => {
      /* Compare password from request to hash in DB */
      const password_correct = await bcrypt.compare(
        data.password,
        response.data.password
      );

      if (password_correct) {
        /* Create token valid for 1 day to return to client */
        const token = jwt.sign({ id: response.ref.id }, jwtSecret, {
          expiresIn: 3600 * 24,
        });

        return {
          statusCode: 200,
          body: JSON.stringify({
            user: {
              id: response.ref.id,
              name: response.data.name,
              email: response.data.email,
            },
            token: token,
          }),
        };
      } else {
        /* Error! return the error with statusCode 400 */
        return {
          statusCode: 401,
          body: 'Password incorrect',
        };
      }
    })
    .catch((error) => {
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
