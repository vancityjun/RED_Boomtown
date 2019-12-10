import React, { Component } from "react";
import Share from "./Share";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Query } from "react-apollo";
import { ALL_TAGS_QUERY } from "../../apollo/queries";
export const TagsContext = React.createContext();

class ShareContainer extends Component {
  render() {
    return (
      <FullScreenLoader>
        <Query query={ALL_TAGS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            // console.log(data.tags);
            return (
              <TagsContext.Provider value={data.tags}>
                {/* {this.props.children} */}
                <Share />
              </TagsContext.Provider>
            );
          }}
        </Query>
      </FullScreenLoader>
    );
  }
}

export default ShareContainer;
