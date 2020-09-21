const faunadb = require("faunadb");
const q = faunadb.query;
const middy = require("middy");
const authMiddleware = require("./utils/authMiddleware");

const deleteList = (event, context, callback) => {
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    });

    console.log("Function `list-delete` invoked");

    return client
        .query(q.Delete(q.Ref(`classes/lists/${event.headers["list_id"]}`)))
        .then((response) => {
            return client
                .query(
                    q.Map(
                        q.Paginate(
                            q.Match(
                                q.Index("items_by_list_id"),
                                event.headers["list_id"]
                            )
                        ),
                        q.Lambda("X", q.Delete(q.Var("X")))
                    )
                )
                .then((ret) => {
                    return {
                        statusCode: 200,
                        body: JSON.stringify(response),
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

exports.handler = middy(deleteList).use(authMiddleware());
