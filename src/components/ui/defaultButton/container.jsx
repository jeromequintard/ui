import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';
import Ripple from 'components/ui/ripple';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  renderRipple() {
    return (this.props.ripple && !this.props.disabled) ? <Ripple /> : null;
  }

  render() {

    const { styles, className, children, icon, status, disabled } = this.props;

    const classNames = classnames({
      [styles.defaultButton]: true,
      [styles.withPrimary]: status === propTypes.Status.Primary && !disabled,
      [styles.withInfo]: status === propTypes.Status.Info && !disabled,
      [styles.withSuccess]: status === propTypes.Status.Success && !disabled,
      [styles.withWarning]: status === propTypes.Status.Warning && !disabled,
      [styles.withCritical]: status === propTypes.Status.Critical && !disabled,
      [styles.isDisabled]: disabled,
      ['iko-' + icon]: !!icon,
      [className]: className !== null,
    });

    return (
      <button
        className={classNames}
        disabled={disabled}
        onClick={this.onClick}
      >
        { this.renderRipple() }
      </button>
    );
  }
};

Container.propTypes = {
  status: PropTypesEx.oneOf(propTypes.Status),
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  ripple: PropTypes.bool,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  status: propTypes.Status.Success,
  disabled: false,
  ripple: true,
  className: null,
};

Container.displayName = 'DefaultButton';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
