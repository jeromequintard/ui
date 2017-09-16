import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import csstyles from './styles';

const Container = class Container extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onTabClick(this.props.id);
  }

  renderSprite() {
    if (this.props.sprite) {
      return <i className={'iks-' + this.props.sprite} />;
    }
    return null;
  }

  render() {
    const { styles, disabled, shifted, className, sprite, title, active } = this.props;

    const classNames = classnames({
      [styles.tab]: true,
      [styles.isActive]: active,
      [styles.isShifted]: shifted,
      [styles.isDisabled]: disabled,
      [styles.hasSprite]: sprite,
      [className]: className !== null,
    });

    return (
      <li
        className={classNames}
        onClick={this.onClick}
      >
        {this.renderSprite()}<span>{ title }</span>
      </li>
    );
  }
};

Container.propTypes = {
  title: PropTypes.string.isRequired,
  shifted: PropTypes.bool,
  sprite: PropTypes.string,
  id: PropTypes.number,
  active: PropTypes.bool,
  onTabClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  shifted: false,
  active: false,
  disabled: false,
  className: null,
  activeClassName: null,
};

Container.displayName = 'Tab';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
