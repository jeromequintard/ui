import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Translation from 'components/core/translation';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import locales from './locale.json';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    this.props.onChange(e);
  }

/*
  onKeyDown(e) {
  }
*/

  render() {
    const { styles, className, t, placeholder } = this.props;

    const classNames = classnames({
      [styles.search]: true,
      [className]: className !== null,
    });

    return (
      <span className={classNames}>
        <input
          type="search"
          placeholder={t(placeholder)}
          autoComplete="off"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </span>);
  }
};

Container.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  placeholder: 'Search',
  className: null,
};

Container.displayName = 'Search';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
)(Container);
