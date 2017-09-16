import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  getLogo() {
    if (this.props.container !== 'App') return null;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130">
        <g className={this.props.styles.logo}>
          <polygon points="0 -45 0 -22 20 -10.8 40 -22.5" />
          <polygon points="20 -10.8 40 -22.5 40 22.5 20 10.8" />
          <polygon points="40 22.5 20 10.8 0 22 0 45" />
          <polygon points="0 22 -20 10.8 -40 22.5 0 45" />
          <polygon points="-40 -22.5 -20 -10.7 -20 10.8 -40 22.5" />
          <polygon points="0 -45 -40 -22.5 -20 -10.7 0 -22" />
        </g>
      </svg>
    );
  }

  getDots() {
    return (
      <svg className={this.props.styles.dots} xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 50 20">
        <circle cx="5" cy="10" r="0"><animate attributeName="r" from="0" to="5" values="0;5;5;5;0" dur="1s" repeatCount="indefinite" /></circle>
        <circle cx="25" cy="10" r="0"><animate attributeName="r" from="0" to="5" values="0;5;5;5;0" begin="0.2" dur="1s" repeatCount="indefinite" /></circle>
        <circle cx="45" cy="10" r="0"><animate attributeName="r" from="0" to="5" values="0;5;5;5;0" begin="0.4" dur="1s" repeatCount="indefinite" /></circle>
      </svg>
    );
  }

  render() {
    const { styles, className, display, container } = this.props;

    // On désactive le rendu
    if (display === 'Disabled') return null;

    const classNames = classnames({
      [styles.loader]: true,
      [styles.forApp]: container === propTypes.Container.App,
      [styles.forComponent]: container === propTypes.Container.Component,
      [styles.isShow]: display === propTypes.Display.Show,
      [styles.isHide]: display !== propTypes.Display.Show,
      [className]: className !== null,
    });

    return (
      <div className={classNames}>
        { this.getLogo() }
        { this.getDots() }
      </div>
    );
  }
};

Container.propTypes = {
  display: PropTypesEx.oneOf(propTypes.Display),
  container: PropTypesEx.oneOf(propTypes.Container),
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  display: propTypes.Display.Show,
  container: propTypes.Container.Component,
  className: null,
};

Container.displayName = 'Loader';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
