import React, { Component } from "react";
import Items from "./Items";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";

class ItemsContainer extends Component {
  static contextType = ViewerContext;
  render() {
    return (
      <FullScreenLoader background="#212121">
        <Query query={ALL_ITEMS_QUERY} variables={{ filter: this.context.id }}>
          {({ data, loading, error }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return <Items items={data.items} />;
          }}
        </Query>
      </FullScreenLoader>
    );
  }
}

export default ItemsContainer;
