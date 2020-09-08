const faunadb = require('faunadb'); /* Import faunaDB sdk */
const q = faunadb.query;
const middy = require('middy');
const authMiddleware = require('./utils/authMiddleware');

const checkAuth = (event, context, callback) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  console.log('Function `check-authed` invoked');

  return client
    .query(q.Get(q.Ref(`classes/users/${event.user.id}`)))
    .then((response) => {
      console.log('success', response);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          id: response.ref.id,
          name: response.data.name,
          email: response.data.email,
        }),
      });
    })
    .catch((error) => {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};

exports.handler = middy(checkAuth).use(authMiddleware());
