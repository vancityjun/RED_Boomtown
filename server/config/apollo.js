const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const jwt = require("jsonwebtoken");

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
      try {
        if (token) {
          user = jwt.verify(token, app.get("JWT_SECRET"));
          // console.log("user", user);
        }
        return {
          pgResource,
          req,
          user,
          token
        };
      } catch (e) {
        console.log(e);
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
