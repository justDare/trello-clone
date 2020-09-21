const faunadb = require("faunadb");
const q = faunadb.query;
const middy = require("middy");
const authMiddleware = require("./utils/authMiddleware");

const getItemsByList = (event, context, callback) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    });

    console.log("Function `item-get-by-list` invoked");

    return client
        .query(
            q.Paginate(
                q.Match(q.Index("items_by_list_id"), event.headers["list_id"])
            )
        )
        .then((response) => {
            const itemRefs = response.data;
            // create new query out of item refs.
            const getAllItemDataQuery = itemRefs.map((ref) => {
                return q.Get(ref);
            });
            // then query the refs
            return client.query(getAllItemDataQuery).then((ret) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(ret),
                };
            });
        })
        .catch((error) => {
            console.log(error);
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            };
        });
};

exports.handler = middy(getItemsByList).use(authMiddleware());
