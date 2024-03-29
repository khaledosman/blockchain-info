import { ApolloServer } from 'apollo-server-lambda'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { RedisCache } from 'apollo-server-cache-redis'

import { resolvers } from './resolvers'
// import { validateAuthHeader } from '../helpers/authentication'
import { typeDefs } from './schema'

const IS_OFFLINE = process.env.IS_OFFLINE

export function createApolloServer (redisCache: RedisCache): ApolloServer {
  const commonPlugins = []
  const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: false, /* {    Date: () => {      return new Date()}} */
    playground: {
      endpoint: IS_OFFLINE ? `http://localhost:3000/${process.env.AWS_STAGE}/graphql` : `${process.env.BASE_URL}/graphql`
    },
    introspection: true, // Boolean(IS_OFFLINE),
    tracing: Boolean(IS_OFFLINE),
    cacheControl: { defaultMaxAge: 60 * 60 }, // 1h
    ...(!IS_OFFLINE && { cache: redisCache }),
    cache: redisCache,
    plugins: IS_OFFLINE ? [...commonPlugins, responseCachePlugin()] : [...commonPlugins, responseCachePlugin({ cache: redisCache })],
    context: async ({ event, context }): Promise<any> => {
    // get the user token from the headers
      const mongooseConnection = context.mongooseConnection
      const redisClient = context.redisClient
      console.log(event.headers)
      // try {
      //   const decodedToken = await validateAuthHeader(event.headers.Authorization || event.headers.authorization)
      //   // try to retrieve a user with the token
      //   const User = mongooseConnection.model('User')
      //   const user: IUser = await User.findById(decodedToken._id).lean()
      //   // add the user to the context
      //   if (user) {
      //     return { user, mongooseConnection, redisClient }
      //   } else {
      //     return { user, mongooseConnection, err: new Error('This user was deleted from the database'), redisClient }
      //   }
      // } catch (err) {
      // console.log(err)
      return { mongooseConnection, /* err, */ redisClient }
      // }
    },
    ...(!IS_OFFLINE && {
      persistedQueries: {
        cache: redisCache
      }
    })
  })
  return server
}
