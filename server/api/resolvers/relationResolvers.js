const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    async items(parent, arg, { pgResource }) {
      const item = await pgResource.getItems(parent.id);
      return item;
    },
    async borrowed(parent, arg, { pgResource }) {
      const borrowed = await pgResource.getBorrowedItemsForUser(parent.id);
      return borrowed;
    }
  },

  Item: {
    async itemowner(parent, arg, { pgResource }) {
      const itemowner = await pgResource.getUserById(parent.ownerId);
      const { id, fullname, email, bio } = itemowner;
      return {
        id: id,
        fullname: fullname,
        email: email,
        bio: bio
      };
    },
    async tags(parent, arg, { pgResource }) {
      const tag = await pgResource.getTagsForItem(parent.id);
      return tag;
    },
    async borrower(parent, arg, { pgResource }) {
      const borrower = await pgResource.getBorrowedItemsForUser(parent.id);
      return borrower;
    }
  }
};

module.exports = relationResolvers;
