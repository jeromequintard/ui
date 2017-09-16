import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  isEqual,
} from 'osiki-core';

import Input from 'components/internal/input';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import csstyles from './styles.js';

const Container = class Container extends Component {

  render() {
    const { styles, children, className, label } = this.props;

    const classNames = classnames({
      [styles.formfield]: true,
      [className]: className !== null,
    });

    return (
      <div className={classNames}>
        <label>{label}</label>
        <div className={styles.component}>
          {children}
        </div>
      </div>
    );
  }

};

Container.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  className: null,
};

Container.displayName = 'FormField';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
