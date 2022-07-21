const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const LocationType = new GraphQLObjectType({
  name: "Locations",
  fields: () => ({
    timestamp: { type: GraphQLString },
    longitude: { type: GraphQLString },
    latitude: { type: GraphQLString },
  }),
});

module.exports = LocationType;
