import React, { Component, PropTypes } from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';
import { LoaderContainer } from '@shoutem/react-web-ui';
import {
  fetchShortcut,
  updateShortcutSettings,
  getShortcut,
} from '@shoutem/redux-api-sdk';
import { shouldRefresh } from '@shoutem/redux-io';
import { connect } from 'react-redux';
import './style.scss';

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