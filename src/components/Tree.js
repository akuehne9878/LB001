import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
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
  }
};
class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    let model = new PageModel();

    var that = this;
    model.hierarchy().then(function(data) {
      console.log(data);
      that.setState({ data: [data] });
    });
  }
  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    this.props.onClickItem(item.pageID);
    this.setState(prevState => ({ [item.title]: !prevState[item.title] }));
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
            <Link to={subOption.title} className={classes.links}>
              <ListItemText primary={subOption.title} style={style} />
            </Link>
          </ListItem>
        );
      }
      return (
        <List className={classes.tree} key={subOption.pageID}>
          <ListItem button onClick={() => this.handleClick(subOption)}>
            <ListItemText primary={subOption.title} style={style} />
            {state[subOption.title] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={state[subOption.title]} timeout="auto" unmountOnExit>
            {this.handler(subOption.nodes, level + 1)}
          </Collapse>
        </List>
      );
    });
  }
  render() {
    const { state } = this;
    const { classes } = this.props;
    return <List className={classes.tree}>{this.handler(state.data, 0)}</List>;
  }
}
export default withStyles(styles)(Tree);
