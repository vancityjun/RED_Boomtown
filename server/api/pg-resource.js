function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: `INSERT into users (fullname, email, password) values ($1, $2, $3) RETURNING *`,
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: `select * from users where email = $1`,
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: "SELECT id, fullname, email, bio from users where id = $1",
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: idToOmit
          ? `SELECT * from items where "ownerId" != $1`
          : `select * from items`,
        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT items.* from items join users on items."ownerId" = users.id where users.id = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT items.* from items join users on items."borrowerId" = users.id where users.id = $1`,
        values: [id]
      });
      return items.rows[0];
    },
    async getTags() {
      const tags = await postgres.query("select * from tags");
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `select tags.title from tags inner join itemtags on tags.id = itemtags."tagId" inner join items on itemtags."itemId" = items.id where items.id = $1`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, user: { id } }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const { title, description, created, imgUrl, tags } = item;
              const insertItem = `INSERT into items (title, description, created, "imageUrl", "ownerId") values ('${title}', '${description}', '${created}', '${imgUrl}', ${id}) RETURNING *`;
              const newItem = await client.query(insertItem);
              const tagRelationship = {
                text: `INSERT into itemtags ("tagId", "itemId") values ${tagsQueryString(
                  tags,
                  newItem.rows[0].id,
                  ""
                )}`,
                values: tags.map(tag => {
                  return tag.id;
                })
              };
              await client.query(tagRelationship);

              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
