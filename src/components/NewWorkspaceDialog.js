import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PageModel from "../model/PageModel";

export default class NewWorkspaceDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSave = () => {
    var model = new PageModel();

    var obj = { parentID: 0, type: "MD", link: "adsf", title: this.state.name, content: "", userID: "AKU" };

    var that = this;
    model.createObject(obj).then(function() {
      that.props.onClose();
    });
  };

  handleInput = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.onClose}>
          <DialogTitle>Neuer Workspace</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Name" type="text" fullWidth onChange={this.handleInput("name")} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Speichern
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
