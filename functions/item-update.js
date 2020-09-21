const faunadb = require("faunadb");
const q = faunadb.query;
const middy = require("middy");
const authMiddleware = require("./utils/authMiddleware");

const updateItem = (event, context, callback) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    });

    console.log("Function `item-update` invoked");

    const data = JSON.parse(event.body);

    return client
        .query(
            q.Update(q.Ref(`classes/items/${event.headers["item_id"]}`), {
                data,
            })
        )
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

exports.handler = middy(updateItem).use(authMiddleware());
