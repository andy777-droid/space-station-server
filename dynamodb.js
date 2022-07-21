const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
});

const dynomoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "SpaceStationLocations";

const getLocations = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const locations = await dynomoClient.scan(params).promise();
  return locations.Items;
};

const addLocations = async (location) => {
  const params = {
    TableName: TABLE_NAME,
    Item: location,
  };
  return await dynomoClient.put(params).promise();
};

module.exports = { getLocations, addLocations };
