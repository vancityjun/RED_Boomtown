const { ApolloError } = require("apollo-server");
const queryResolvers = app => ({
  viewer(parent, args, { user }, info) {
    return user;
  },
  async user(parent, { id }, { pgResource }, info) {
    try {
      const user = await pgResource.getUserById(id);
      return user;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async items(parent, { filter }, { pgResource }) {
    const item = await pgResource.getItems(filter);
    return item;
  },
  async tags(parent, arg, { pgResource }) {
    const tag = await pgResource.getTags();
    return tag;
  }
});
module.exports = queryResolvers;
