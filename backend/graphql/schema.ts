// copied from schema.graphql because we cant get webpack graphql-loader to work with typescript
import { gql } from 'apollo-server-lambda'
export const typeDefs = gql`
  type Query {
    randomNumber: Int @cacheControl(maxAge: 30)
    getBlockDetails(blockHash: String!): BlockDetails @cacheControl(maxAge: 300)
    getBlocks(limit: Int, skip: Int): [Block] @cacheControl(maxAge: 300)
  }

  scalar Date

  type Block {
    height: Int
    hash: String
    time: Date
    main_chain: Boolean
  }

  type BlockDetails {
    size: Int
    block_index: Int
    prev_block: String
    tx: [Transaction]
    hash: String
  }

  type Transaction {
    size: Int
    block_index: String
    fee: Int
    result: Int
    balance: Int
    hash: String
  }

`
