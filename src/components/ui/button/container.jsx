import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  isEqual,
} from 'osiki-core';

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

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps);
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
    const { styles, className, children, textFormat, icon, size, status, type, displayLabel, displayMode, disabled } = this.props;

    const classNames = classnames({
      [styles.button]: true,
      [styles.withInfo]: status === propTypes.Status.Info && !disabled,
      [styles.withPrimary]: status === propTypes.Status.Primary && !disabled,
      [styles.withSuccess]: status === propTypes.Status.Success && !disabled,
      [styles.withWarning]: status === propTypes.Status.Warning && !disabled,
      [styles.withCritical]: status === propTypes.Status.Critical && !disabled,
      [styles.withUppercase]: textFormat === propTypes.TextFormat.Uppercase,
      [styles.isSmallSize]: size === propTypes.Size.Small,
      [styles.isMediumSize]: size === propTypes.Size.Medium,
      [styles.isNormalSize]: size === propTypes.Size.Normal,
      [styles.hasHiddenLabel]: !displayLabel,
      [styles.hasDisplayModeAuto]: displayMode === propTypes.DisplayMode.Auto && !disabled,
      [styles.hasIcon]: icon,
      [styles.isDisabled]: disabled,
      ['iko-' + icon]: !!icon,
      [className]: className !== null,
    });

    return (
      <button
        className={classNames}
        disabled={disabled}
        onClick={this.onClick}
        type={type}
      >
        { this.renderRipple() }
        { children }
      </button>
    );
  }
};

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  displayLabel: PropTypes.bool,
  displayMode: PropTypesEx.oneOf(propTypes.DisplayMode),
  icon: PropTypes.string,
  ripple: PropTypes.bool,
  size: PropTypesEx.oneOf(propTypes.Size),
  status: PropTypesEx.oneOf(propTypes.Status),
  textFormat: PropTypesEx.oneOf(propTypes.TextFormat),
  type: PropTypesEx.oneOf(propTypes.Type),
  onClick: PropTypes.func,
};

Container.defaultProps = {
  className: null,
  disabled: false,
  displayLabel: true,
  displayMode: propTypes.DisplayMode.Static,
  ripple: true,
  size: propTypes.Size.Normal,
  status: propTypes.Status.Success,
  type: propTypes.Type.Button,
  textFormat: propTypes.TextFormat.Uppercase,
};

Container.displayName = 'Button';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
