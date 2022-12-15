import { Config } from 'stellate'

const config: Config = {
  "config": {
    "enablePlayground": true,
    "passThroughOnly": false,
    "rootTypeNames": {
      "query": "Query"
    },
    "rules": [
      {
        "types": [
          "Query"
        ],
        "maxAge": 900,
        "swr": 900,
        "description": "Cache everything (default)"
      }
    ],
    "name": "nftoupon-api",
    "schema": "./src/graphql",
    "originUrl": "https://nftoupon-space.fly.dev/api/graphql"
  }
}

export default config;
