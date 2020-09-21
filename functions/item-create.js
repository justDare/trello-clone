const faunadb = require("faunadb");
const q = faunadb.query;
const middy = require("middy");
const authMiddleware = require("./utils/authMiddleware");

const createItem = (event, context, callback) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    });

    console.log("Function `item-create` invoked");

    /* parse the string body into a useable JS object */
    const data = JSON.parse(event.body);

    const item = {
        data: { ...data, done: false, list_id: event.headers["list_id"] },
    };

    /* construct the fauna query */
    return client
        .query(q.Create(q.Ref("classes/items"), item))
        .then((response) => {
            /* Success! return the response with statusCode 200 */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            /* Error! return the error with statusCode 400 */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};

exports.handler = middy(createItem).use(authMiddleware());
