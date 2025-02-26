import { Platform } from "react-native";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchQuery = async (operation: any, variables: any) => {
  const graphqlURI =
    Platform.OS === "android"
      ? "http://10.0.2.2:4000/"
      : "http://localhost:4000/";

  const response = await fetch(graphqlURI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
};

// Create Relay environment
const RelayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
