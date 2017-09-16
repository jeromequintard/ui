import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  render() {

    const { className, styles, orientation } = this.props;

    const classNames = classnames({
      [styles.divider]: true,
      [styles.isHorizontal]: orientation === propTypes.Orientation.Horizontal,
      [styles.isVertical]: orientation === propTypes.Orientation.Vertical,
      [className]: className !== null,
    });

    if (orientation === propTypes.Orientation.Horizontal) {
      return <hr className={classNames} />;
    }
    return <span className={classNames} />;
  }
};

Container.propTypes = {
  className: PropTypesEx.stylx,
  orientation: PropTypesEx.oneOf(propTypes.Orientation),
};

Container.defaultProps = {
  className: null,
  orientation: propTypes.Orientation.Horizontal,
};

Container.displayName = 'Divider';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
