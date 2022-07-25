const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./GraphQL/index");
const cors = require("cors");
const axios = require("axios");
const { addLocations } = require("./dynamodb");
var nodeCron = require("node-cron");

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

app.listen(8080, () => {
  console.log("server is running...");
});

//This method is inserting the space station locations into the database
const cronJob = nodeCron.schedule("*/5 * * * * *", () => {
  axios.get("http://api.open-notify.org/iss-now.json/").then(async (response) => {
    let location = { timestamp: String(response.data.timestamp), longitude: String(response.data.iss_position.longitude), latitude: String(response.data.iss_position.latitude) };
    addLocations(location);
  });
});
