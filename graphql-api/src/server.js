import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolver.js";

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start Server
server.listen().then(({ url }) => {
	console.log(`🚀 GraphQL API running at ${url}`);
});
