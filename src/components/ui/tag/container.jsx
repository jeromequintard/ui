import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
} from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles.js';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };

    this.onSelected = this.onSelected.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.onClickOutside);
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onSelected(e) {
    this.selectOrNot(e);
  }

  onKeyDown(e) {
    if (this.state.selected) this.onDelete(e);
  }

  onClickOutside(e) {
    if (this.state.selected) {
      this.selectOrNot(e);
    }
  }

  selectOrNot(e) {
    if (!this.props.locked) {
      const selected = !this.state.selected;
      this.setState({ selected });
      this.props.onSelected(selected ? this.props.id : null, e);
    }
  }

  onDelete(e) {
    this.props.onDelete(this.props.id, e);
  }

  render() {
    const { styles, className, align, display, children, disabled, locked } = this.props;
    const { selected } = this.state;

    const classNames = classnames({
      [styles.tag]: true,
      [styles.isSelected]: selected,
      [styles.isLocked]: locked,
      [styles.isDisabled]: disabled,
      [styles.withFollowMode]: display === propTypes.Display.Follow,
      [styles.withLineMode]: display === propTypes.Display.Line,
      [styles.isLeftAlign]: align === propTypes.Align.Left,
      [styles.isCenterAlign]: align === propTypes.Align.Center,
      [styles.isRightAlign]: align === propTypes.Align.Right,
      [className]: className !== null,
    });

    return (
      <span className={classNames} onClick={this.onSelected}>
        <span>{children}</span>
        { !locked && <i onClick={this.onDelete} /> }
      </span>
    );
  }

};

Container.propTypes = {
  align: PropTypesEx.oneOf(propTypes.Align),
  children: PropTypes.string.isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  display: PropTypesEx.oneOf(propTypes.Display),
  id: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
};

Container.defaultProps = {
  align: propTypes.Align.Center,
  className: null,
  disabled: false,
  display: propTypes.Display.Follow,
  locked: false,
};

Container.displayName = 'Tag';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
