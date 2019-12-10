import { Query } from "react-apollo";
import React from "react";
import { VIEWER_QUERY } from "../apollo/queries";

export const ViewerContext = React.createContext();

const ViewerProvider = ({ children }) => {
  return (
    <Query query={VIEWER_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data.viewer);
        return (
          <ViewerContext.Provider value={data.viewer}>
            {children}
          </ViewerContext.Provider>
        );
      }}
    </Query>
  );
};

export { ViewerProvider };
export default ViewerContext;
