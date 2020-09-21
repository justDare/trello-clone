const faunadb = require("faunadb");
const q = faunadb.query;
const middy = require("middy");
const authMiddleware = require("./utils/authMiddleware");

const deleteItem = (event, context, callback) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    });

    console.log("Function `item-delete` invoked");

    return client
        .query(q.Delete(q.Ref(`classes/items/${event.headers["item_id"]}`)))
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        })
        .catch((error) => {
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};

exports.handler = middy(deleteItem).use(authMiddleware());
