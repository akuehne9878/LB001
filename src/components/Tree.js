import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import PageModel from "../model/PageModel";

const styles = {
  links: {
    textDecoration: "none"
  },
  tree: {
    paddingTop: 0,
    paddingBottom: 0
  },

  wstree: {
    paddingTop: 10,
    paddingBottom: 10
  },
  iconbutton: {
    padding: 0
  }
};
class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    this.props.onClickItem(item.pageID);
    this.setState(prevState => ({ [item.pageID]: !prevState[item.pageID] }));
  }
  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler(children, level) {
    const { classes } = this.props;
    const { state } = this;
    const textIndent = 10;

    if (!children) {
      return;
    }

    let style = { textIndent: textIndent * level };

    return children.map(subOption => {
      if (!subOption.nodes) {
        return (
          <ListItem button key={subOption.pageID} onClick={() => this.handleClick(subOption)}>
            <ListItemText primary={subOption.title} style={style} />
          </ListItem>
        );
      }

      return (
        <List className={subOption.parentID === 0 ? classes.wstree : classes.tree} key={subOption.pageID}>
          <ListItem button onClick={() => this.handleClick(subOption)}>
            <ListItemText primary={subOption.title} style={style} />
            {state[subOption.pageID] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={state[subOption.pageID]} timeout="auto" unmountOnExit>
            {this.handler(subOption.nodes, level + 1)}
          </Collapse>
        </List>
      );
    });
  }
  render() {
    const { state } = this;
    const { classes } = this.props;
    return <List>{this.handler(this.props.data, 0)}</List>;
  }
}
export default withStyles(styles)(Tree);
