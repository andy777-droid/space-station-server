const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./GraphQL/index");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(443, () => {
  console.log("server is running...");
});
