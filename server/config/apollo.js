const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("../api/schema");
let resolvers = require("../api/resolvers");
const { AuthDirective } = require("../api/custom-directives");

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  });

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get("JWT_COOKIE_NAME");
      const token = req ? req.cookies[tokenName] : undefined;
      let user = null;
      // if (process.env.NODE_ENV === "development") token = req.headers.token;
      try {
        if (token) {
          user = jwt.verify(token, app.get("JWT_SECRET"));
        }
        return {
          pgResource,
          req,
          user,
          token
        };
      } catch (e) {
        throw error;
      }
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    cors: app.get("CORS_CONFIG")
  });
};
