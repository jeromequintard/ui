import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
} from 'osiki-core';

import Button from 'components/ui/button';
import Column from 'components/ui/grid/column';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from 'components/ui/button/types';

import csstyles from './styles';

const Container = class Container extends Column {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.onClick(this.props.linkExtraArguments, e);
    e.stopPropagation();
  }

  render() {
    const { styles, className, size, children, disabled, icon, status, textFormat } = this.props;

    const classNames = classnames({
      [styles.action]: true,
      [styles.isDisabled]: disabled,
      [className]: className !== null,
    });

    return (
      <Button
        size={size}
        className={classNames}
        disabled={disabled}
        icon={icon}
        status={status}
        onClick={this.onClick}
        textFormat={textFormat}
      >
        {children}
      </Button>
    );
  }
};

Container.propTypes = {
  ...Column.propTypes,
  default: PropTypes.bool,
  disabled: PropTypes.bool,
  linkExtraArguments: PropTypes.object,
  icon: PropTypes.string,
  size: PropTypesEx.oneOf(propTypes.Size),
  status: PropTypesEx.oneOf(propTypes.Status),
  textFormat: PropTypesEx.oneOf(propTypes.TextFormat),
  onClick: PropTypes.func,
};

Container.defaultProps = {
  ...Column.defaultProps,
  default: true,
  disabled: false,
  linkExtraArguments: null,
  onClick: null,
  searchable: false,
  size: propTypes.Size.Normal,
  status: propTypes.Status.Success,
  textFormat: propTypes.TextFormat.Uppercase,
};

Container.displayName = 'Action';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
