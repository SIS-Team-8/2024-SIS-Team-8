import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormText,
} from 'react-bootstrap';
import { fetchShortcut, updateShortcutSettings, getShortcut } from '@shoutem/redux-api-sdk';

class HelloWorldShortcutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingValue: '',
      checkboxValue: false,
    };
  }

  componentDidMount() {
    this.props.fetchShortcut();
  }

  handleCheckboxChange = (event) => {
    this.setState({ checkboxValue: event.target.checked });
  };

  handleDropdownChange = (event) => {
    this.setState({ settingValue: event.target.value });
  };

  handleSubmit = () => {
    const { updateShortcutSettings, shortcut } = this.props;
    const { settingValue, checkboxValue } = this.state;
    const settings = { settingValue, checkboxValue };
    updateShortcutSettings(shortcut, settings);
  };

  render() {
    const { shortcut } = this.props;

    if (!shortcut) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Settings for {shortcut.name}</h1>

        <FormGroup controlId="formBasicCheckbox">
          <FormLabel>Enable Feature</FormLabel>
          <FormControl
            type="checkbox"
            checked={this.state.checkboxValue}
            onChange={this.handleCheckboxChange}
          />
          <FormText>Toggle this feature on or off</FormText>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <FormLabel>Select an Option</FormLabel>
          <FormControl
            componentClass="select"
            value={this.state.settingValue}
            onChange={this.handleDropdownChange}
          >
            <option value="">Select...</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </FormControl>
          <FormText>Please select an option from the dropdown</FormText>
        </FormGroup>

        <Button onClick={this.handleSubmit} bsStyle="primary">Save Settings</Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { shortcutId } = ownProps;
  return {
    shortcut: getShortcut(state, shortcutId),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { shortcutId } = ownProps;
  return {
    fetchShortcut: () => dispatch(fetchShortcut(shortcutId)),
    updateShortcutSettings: (shortcut, settings) => (
      dispatch(updateShortcutSettings(shortcut, settings))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HelloWorldShortcutPage);
