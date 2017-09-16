import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  Types,
} from 'osiki-core';

import Link from 'components/ui/link';
import Ripple from 'components/ui/ripple';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';

import { models } from './selectors';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    // TODO: Terminer vérification ci-dessous
    // Types.value((props.href !== undefined && props.onClick !== undefined), 'href or onClick are expected on menuItem.').is.true().else.error();

    this.onClick = this.onClick.bind(this);
  }

  onClick(href, e) {
    const { onAfterClick, onBeforeClick, onClick, linkExtraArguments } = this.props;

    if (onBeforeClick !== null) onBeforeClick(href, linkExtraArguments, e);
    if (onClick !== null) onClick(href, linkExtraArguments, e);
    if (onAfterClick !== null) onAfterClick(href, linkExtraArguments, e);

    e.stopPropagation();
  }

  render() {

    const { className, styles, icon, status, currentLocation, href, target, children, disabled } = this.props;

    const classNames = classnames({
      [styles.menuitem]: true,
      [styles.isActive]: currentLocation.pathname === href,
      [styles.isDisabled]: disabled,
      [styles.withIcon]: icon,
      [className]: className !== null,
    });

    return (
      <Link
        className={classNames}
        href={href}
        target={target}
        onClick={this.onClick}
        icon={icon}
        status={status}
      >
      {children}
      </Link>
    );
  }
};

Container.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  linkExtraArguments: PropTypes.object,
  href: PropTypes.string,
  icon: PropTypes.string,
  index: PropTypes.number,
  onAfterClick: PropTypes.func,
  onBeforeClick: PropTypes.func,
  onClick: PropTypes.func,
  status: PropTypesEx.oneOf(propTypes.Status),
  target: PropTypes.string,
};

Container.defaultProps = {
  className: null,
  disabled: false,
  linkExtraArguments: null,
  icon: null,
  onAfterClick: null,
  onBeforeClick: null,
  onClick: null,
  status: propTypes.Status.Info,
  target: null,
};

Container.displayName = 'MenuItem';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  connect(models, null),
)(Container);
