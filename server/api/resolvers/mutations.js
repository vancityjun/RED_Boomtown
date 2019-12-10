const { ApolloError } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    maxAge: 2 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });
}

function generateToken(user, secret) {
  const { id, email, fullname } = user;

  return jwt.sign({ id, email, fullname }, secret, {
    expiresIn: "2h"
  });
}

const mutationResolvers = app => ({
  async signup(
    parent,
    { user: { fullname, email, password } },
    { pgResource, req }
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await pgResource.createUser({
        fullname: fullname,
        email: email,
        password: hashedPassword
      });

      const token = generateToken(user, app.get("JWT_SECRET"));
      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  async login(
    parent,
    { user: { email, password } },
    { pgResource, req },
    context
  ) {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(email);
      if (!user) throw "User was not found.";

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw "Invalid Password";

      // const { fullname, bio, email } = user;
      // console.log(email);
      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });
      // console.log("login", user);
      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  logout(parent, args, context) {
    context.req.res.clearCookie(app.get("JWT_COOKIE_NAME"));
    return true;
  },
  async addItem(parent, args, context, info) {
    const user = await jwt.verify(context.token, app.get("JWT_SECRET"));
    const newItem = await context.pgResource.saveNewItem({
      item: args.item,
      user
    });
    return newItem;
  }
});
module.exports = mutationResolvers;
