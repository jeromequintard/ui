import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';

import csstyles from './styles';

import { actions } from './actions';
import { models } from './selectors';

const Container = class Container extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { href, onClick } = this.props;

    if (this.props.onClick !== null) this.props.onClick(href, e);

    // Si c'est un lien local
    if (href !== null && href.indexOf('//') === -1) {
      // On demande au routeur de changer d'adresse
      this.props.push(href);
    }

    // On désactive le href
    e.preventDefault();
  }

  render() {

    const { styles, className, href, target, children, icon, status, disabled } = this.props;

    const classNames = classnames({
      [styles.link]: true,
      [styles.isDisabled]: disabled,
      [styles.withPrimary]: status === propTypes.Status.Primary && !disabled,
      [styles.withInfo]: status === propTypes.Status.Info && !disabled,
      [styles.withSuccess]: status === propTypes.Status.Success && !disabled,
      [styles.withWarning]: status === propTypes.Status.Warning && !disabled,
      [styles.withCritical]: status === propTypes.Status.Critical && !disabled,
      [styles.withIcon]: icon,
      ['iko-' + icon]: !!icon,
      [className]: className !== null,
    });

    return (
      <a
        className={classNames}
        href={href}
        target={target}
        onClick={this.onClick}
      >
        { children }
      </a>
    );
  }
};

Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  status: PropTypesEx.oneOf(propTypes.Status),
  target: PropTypes.string,
  onClick: PropTypes.func,
};

Container.defaultProps = {
  className: null,
  disabled: false,
  href: null,
  icon: null,
  status: propTypes.Status.Info,
  target: null,
  onClick: null,
};

Container.displayName = 'Link';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  connect(models, actions),
)(Container);
