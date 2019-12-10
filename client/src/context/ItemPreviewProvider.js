import React, { Component } from "react";
import { graphql } from "react-apollo";
import { ADD_ITEM_MUTATION } from "../apollo/queries";

export const ItemPreviewContext = React.createContext();

const InitialState = {
  title: "",
  description: "Describe your item",
  tags: [],
  imgUrl: "",
  // itemowner: {},
  create: new Date()
};
class ItemPreviewProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: InitialState,
      open: false
    };
  }

  updatePreview = event => {
    const { value, name } = event.target;
    const item = { [name]: value };
    const newItem = { ...this.state.item, ...item };
    this.setState({ item: newItem });
    // console.log(this.state.item);
  };

  resetPreveiw = () => {
    this.setState({ item: InitialState });
  };
  insertItem = event => {
    event.preventDefault();
    this.setState({ open: true });
    this.props.addItem({
      variables: { item: this.state.item }
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <ItemPreviewContext.Provider
        value={{
          state: this.state,
          updatePreview: this.updatePreview,
          resetPreveiw: this.resetPreveiw,
          insertItem: this.insertItem,
          open: this.state.open,
          handleClose: this.handleClose
        }}
      >
        {this.props.children}
      </ItemPreviewContext.Provider>
    );
  }
}

export default graphql(ADD_ITEM_MUTATION, {
  name: "addItem"
})(ItemPreviewProvider);
