const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The User GraphQL type has two fields that are not present in the
     *  user table in Postgres: items and borrowed.
     *
     *  According to our GraphQL schema, these fields should return a list of
     *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
     *
     */
    async items(parent, arg, { pgResource }) {
      const item = await pgResource.getItems(parent.id);
      return item;
    },
    async borrowed(parent, arg, { pgResource }) {
      const borrowed = await pgResource.getBorrowedItemsForUser(parent.id);
      return borrowed;
    }
    // -------------------------------
  },

  Item: {
    /**
     *  @TODO: Advanced resolvers
     *
     *  The Item GraphQL type has two fields that are not present in the
     *  Items table in Postgres: itemowner, tags and borrower.
     *
     * According to our GraphQL schema, the itemowner and borrower should return
     * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
     *
     */
    // @TODO: Uncomment these lines after you define the Item type with these fields
    async itemowner(parent, arg, { pgResource }) {
      // @TODO: Replace this mock return statement with the correct user from Postgres
      const itemowner = await pgResource.getItemsForUser(parent.id);
      const { id, fullname, email, bio } = itemowner;
      return {
        id: id,
        fullname: fullname,
        email: email,
        bio: bio
      };
      // -------------------------------
    },
    async tags(parent, arg, { pgResource }) {
      // @TODO: Replace this mock return statement with the correct tags for the queried Item from Postgres
      const tag = await pgResource.getTagsForItem();
      return tag;
      // -------------------------------
    },
    async borrower(parent, arg, { pgResource }) {
      /**
       * @TODO: Replace this mock return statement with the correct user from Postgres
       * or null in the case where the item has not been borrowed.
       */
      return null;
      // -------------------------------
    }
    // -------------------------------
  }
};

module.exports = relationResolvers;
