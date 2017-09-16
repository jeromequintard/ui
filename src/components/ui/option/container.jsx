import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Ripple from 'components/ui/ripple';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    if (this.props.onItemClick) {
      this.props.onItemClick(this.props.index);
    }
  }

  render() {
    const { styles, className, text, onItemClick, children } = this.props;

    const classNames = classnames({
      [styles.option]: true,
      [className]: className !== null,
    });

    if (text == null) {
      return <option className={classNames}>{children}</option>;
    }
    return (
      <li
        className={classNames}
        onClick={this.onItemClick}
      >
        { text }
      </li>);
  }
};

Container.propTypes = {
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  index: PropTypes.number,
  onItemClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  text: null,
  value: null,
  disabled: false,
  className: null,
};

Container.displayName = 'Option';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
