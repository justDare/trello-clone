const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;

module.exports = function authMiddleware() {
  return {
    before: (handler, next) => {
      const token = handler.event.headers['auth-token'];

      if (!token)
        return handler.callback(null, {
          statusCode: 400,
          body: JSON.stringify({ msg: 'No token given' }),
        });

      try {
        // Verify token
        const decoded = jwt.verify(token, jwtSecret);

        // add user from token
        handler.event.user = decoded;
        return next();
      } catch (error) {
        /* Error! return the error with statusCode 401 */
        return handler.callback(null, {
          statusCode: 401,
          body: JSON.stringify({ msg: 'Not authorized' }),
        });
      }
    },
  };
};
