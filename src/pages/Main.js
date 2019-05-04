import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import MarkdownIt from "markdown-it";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import SearchField from "../components/SearchField";

import Tree from "../components/Tree";

import NewWorkspaceDialog from "../components/NewWorkspaceDialog";
import NewPageDialog from "../components/NewPageDialog";

import PageModel from "../model/PageModel";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  }
});

class Main extends React.Component {
  state = {
    mobileOpen: false,
    userProfileMenuAnchor: null,
    pageMenuAnchor: null,
    isNewWorkspaceDialogOpen: false,
    isNewPageDialogOpen: false,
    currentPageID: 0,
    currentPageContent: null,
    treeData: []
  };

  componentDidMount() {
    this.updateTreeData();
  }

  updateTreeData = () => {
    let model = new PageModel();
    var that = this;
    model.hierarchy().then(function(data) {
      that.setState({ treeData: data });
    });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleUserProfile = event => {
    this.setState({ userProfileMenuAnchor: event.currentTarget });
  };

  handlePageMenu = event => {
    this.setState({ pageMenuAnchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ userProfileMenuAnchor: null });
    this.setState({ pageMenuAnchor: null });
  };

  logout = () => {
    sessionStorage.removeItem("userContext");
    localStorage.removeItem("user");
    this.props.history.push("/login");
  };

  loadPage = pageID => {
    let model = new PageModel();
    var that = this;
    model.get(pageID).then(function(data) {
      var md = new MarkdownIt();
      var result = md.render(data[0].content);

      that.setState({ currentPageContent: result, currentPageID: pageID });
    });
  };

  toggleNewWorkspaceDialog = event => {
    this.setState({
      isNewWorkspaceDialogOpen: !this.state.isNewWorkspaceDialogOpen
    });
  };

  toggleNewPageDialog = event => {
    this.setState({
      isNewPageDialogOpen: !this.state.isNewPageDialogOpen
    });
  };

  toggleModal = () => {};

  createMarkup() {
    return { __html: this.state.currentPageContent };
  }

  render() {
    const { classes, theme } = this.props;
    const { userProfileMenuAnchor, pageMenuAnchor } = this.state;

    const drawer = <Tree data={this.state.treeData} onClickItem={this.loadPage} />;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              Meine Workspaces
            </Typography>
            <SearchField />

            <IconButton color="inherit" onClick={this.handlePageMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={pageMenuAnchor} open={Boolean(pageMenuAnchor)} onClose={this.handleClose}>
              <MenuItem onClick={this.toggleNewPageDialog}>Neue Seite</MenuItem>
              <MenuItem onClick={this.toggleNewWorkspaceDialog}>Neuer Workspace</MenuItem>

              <MenuItem onClick={this.handleClose}>Bearbeiten</MenuItem>
              <MenuItem onClick={this.handleClose}>Löschen</MenuItem>
            </Menu>

            <NewPageDialog open={this.state.isNewPageDialogOpen} parentID={this.state.currentPageID} onClose={this.toggleNewPageDialog} afterClose={this.updateTreeData} />
            <NewWorkspaceDialog open={this.state.isNewWorkspaceDialogOpen} onClose={this.toggleNewWorkspaceDialog} afterClose={this.updateTreeData} />

            <IconButton color="inherit" onClick={this.handleUserProfile}>
              <PersonIcon />
            </IconButton>
            <Menu anchorEl={userProfileMenuAnchor} open={Boolean(userProfileMenuAnchor)} onClose={this.handleClose}>
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Typography dangerouslySetInnerHTML={this.createMarkup()} />
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
