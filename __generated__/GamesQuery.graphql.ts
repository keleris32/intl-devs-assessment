/**
 * @generated SignedSource<<47669b5f05aab5fba6833dedb70b08c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GamesQuery$variables = Record<PropertyKey, never>;
export type GamesQuery$data = {
  readonly games: ReadonlyArray<{
    readonly endTime: string;
    readonly id: string;
    readonly moneyline1: number | null | undefined;
    readonly moneyline2: number | null | undefined;
    readonly spread1: number | null | undefined;
    readonly spread2: number | null | undefined;
    readonly team1: {
      readonly logo: string;
      readonly name: string;
    };
    readonly team2: {
      readonly logo: string;
      readonly name: string;
    };
    readonly totalOver: number | null | undefined;
    readonly totalUnder: number | null | undefined;
  }>;
};
export type GamesQuery = {
  response: GamesQuery$data;
  variables: GamesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logo",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Game",
    "kind": "LinkedField",
    "name": "games",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "team1",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Team",
        "kind": "LinkedField",
        "name": "team2",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "moneyline1",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "moneyline2",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "spread1",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "spread2",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalOver",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalUnder",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endTime",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "GamesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GamesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "96b349c47e863395ea89d9d40ffe8081",
    "id": null,
    "metadata": {},
    "name": "GamesQuery",
    "operationKind": "query",
    "text": "query GamesQuery {\n  games {\n    id\n    team1 {\n      name\n      logo\n    }\n    team2 {\n      name\n      logo\n    }\n    moneyline1\n    moneyline2\n    spread1\n    spread2\n    totalOver\n    totalUnder\n    endTime\n  }\n}\n"
  }
};
})();

(node as any).hash = "c7f31678430d61c731148f57a1cb6780";

export default node;
