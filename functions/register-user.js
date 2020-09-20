const faunadb = require("faunadb"); /* Import faunaDB sdk */
const q = faunadb.query;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT;

exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });
  console.log("Function `register-user` invoked");
  const data = JSON.parse(event.body);

  const hashed_password = await bcrypt.hash(data.password, 10);

  const user = {
    data: { ...data, password: hashed_password },
  };

  return client
    .query(q.Create(q.Ref("classes/users"), user))
    .then((response) => {
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
    })
    .catch((error) => {
      /* Error! return the error with statusCode 400 */
      console.log(error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
