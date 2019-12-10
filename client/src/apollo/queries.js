import gql from "graphql-tag";

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
    #
    # https://www.apollographql.com/docs/react/data/fragments/
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html

    id
    title
    imageurl
    description
    created
    tags {
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    # @TODO: Query an item by its id and return the ItemFields fragment.
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
    # Use the ItemFields fragment for the items and borrowed fields.
    user(id: $id) {
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    # @TODO: Pass the item and image into the addItem mutation as arguments
    # and return the new item id when the mutation is complete.
    addItem(item: $item) {
      id
    }
  }
`;

/**
 * Auth-related queries and mutations.
 */

export const VIEWER_QUERY = gql`
  query {
    # @TODO: Query the id, email, fullname, and bio fields for the viewer.
    viewer {
      id
      email
      fullname
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation logout($id: ID!) {
    # @TODO: Run the logout mutation.
    logout(id: $id) {
      id
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user) {
      token
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      token
      user {
        id
      }
    }
  }
`;
