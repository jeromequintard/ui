import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Toolbar from 'components/ui/toolbar';
import Theme from 'components/core/theme';

import Action from 'components/ui/grid/action';

import manifest from 'manifest.json';

import csstyles from './styles';

const Container = class Container extends Component {

  getActions() {
    const { disabled } = this.context;
    const { children } = this.props;

    // On wrap les actions dans un LI
    return React.Children.map(children, (action, index) => {
      const element = React.cloneElement(action, {
        ...action.props,
        disabled,
      });
      return element;
    });
  }

  render() {
    const { styles, className } = this.props;

    const actions = this.getActions();

    if (actions === null || actions.length === 0) return null;

    const classNames = classnames({
      [styles.actions]: true,
      [className]: className !== null,
    });

    return (
      <Toolbar className={classNames}>
        {actions}
      </Toolbar>
    );
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([Action]),
};

Container.contextTypes = {
  uid: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  className: null,
};

Container.displayName = 'Actions';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
