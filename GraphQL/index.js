const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = graphql;
const { getLocations, addLocations } = require("../dynamodb");

const LocationType = require("./Types/LocationType");

const MainQuery = new GraphQLObjectType({
  name: "MainQueryType",
  fields: {
    listAllLocations: {
      type: new GraphQLList(LocationType),
      args: {
        timestamp: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getLocations()?.find((a) => a.timestamp > String(new Date(new Date().getTime() - 1000 * 60 * 60).valueOf()));
      },
    },
  },
});

const MainMutation = new GraphQLObjectType({
  name: "MainMutationType",
  fields: {
    insertLocation: {
      type: LocationType,
      args: {
        timestamp: { type: GraphQLString },
        longitude: { type: GraphQLString },
        latitude: { type: GraphQLString },
      },
      resolve(parent, args) {
        addLocations({
          timestamp: args.timestamp,
          longitude: args.longitude,
          latitude: args.latitude,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: MainQuery, mutation: MainMutation });
