import React, { Component } from "react";
import Profile from "./Profile";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Query } from "react-apollo";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = ViewerContext;

  render() {
    const viewer = Object.values(this.context);
    const urlParam = this.props.match.params.userid;
    return (
      <FullScreenLoader background="#212121">
        <Query
          query={ALL_USER_ITEMS_QUERY}
          variables={{ id: urlParam ? urlParam : viewer[0] }}
        >
          {({ data, loading, error }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Profile
                userId={{ id: urlParam ? urlParam : viewer[0] }}
                data={data.user}
                items={data.user.items}
              />
            );
          }}
        </Query>
      </FullScreenLoader>
    );
  }
}

export default ProfileContainer;
