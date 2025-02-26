import { gql } from "apollo-server";

// Define GraphQL schema
export const typeDefs = gql`
	type Team {
		name: String!
		logo: String!
	}

	type Game {
		id: ID!
		team1: Team!
		team2: Team!
		moneyline1: Int!
		moneyline2: Int!
		spread1: Float!
		spread2: Float!
		totalOver: Float!
		totalUnder: Float!
		endTime: String!
	}

	type Query {
		games: [Game]
	}
`;
