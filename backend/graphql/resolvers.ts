import axios from 'axios'
import { GraphQLScalarType, Kind } from 'graphql'
export const resolvers = {
  Query: {
    randomNumber: (): number => {
      return Math.round(Math.random() * 100)
    },
    getBlocks: () => {
      return axios.get('https://blockchain.info/blocks?format=json')
        .then(res => res.data)
        .then(data => data.blocks)
    },
    getBlockDetails: (root, args) => {
      console.log(args)
      return axios.get(`https://blockchain.info/rawblock/${args.blockHash}`)
        .then(res => res.data)
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue (value): Date {
      return new Date(value) // value from the client
    },
    serialize (value): string {
      if (!isNaN(value)) {
        return new Date(value).toISOString()
      }
      return value.toISOString() // value sent to the client
    },
    parseLiteral (ast: any): Date {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // ast value is always in string format
      }
      return new Date(ast.value)
    }
  })
}
