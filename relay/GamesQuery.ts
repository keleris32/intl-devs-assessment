import { graphql } from "react-relay";

export const GamesQuery = graphql`
  query GamesQuery {
    games {
      id
      team1 {
        name
        logo
      }
      team2 {
        name
        logo
      }
      moneyline1
      moneyline2
      spread1
      spread2
      totalOver
      totalUnder
      endTime
    }
  }
`;
