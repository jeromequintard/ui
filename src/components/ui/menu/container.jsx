import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  Types,
} from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import MenuItem from 'components/ui/menuItem';
import Divider from 'components/ui/divider';

import * as propTypes from './types';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props, context) {
    super(props, context);

    if (props.template === propTypes.Template.Default) {
      Types.value(props.title, 'Title is expected with the default template.').is.defined().else.error();
    }

    this.state = {
      opened: false,
    };

    this.onClick = this.onClickInside.bind(this);
    this.onMenuitemAfterClick = this.onMenuitemAfterClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
  }

  onClickInside(e) {
    this.setState({ opened: !this.state.opened });
    e.stopPropagation();
  }

  onMenuitemAfterClick(index, href) {
    this.setState({ opened: false });
    if (this.props.onMenuitemClick !== null) this.props.onMenuitemClick(index, href);
  }

  onClickOutside(e) {
    // Si on click pas sur le composant
    if (!findDOMNode(this).contains(e.target)) {
      // On met à jour l'état
      this.setState({ opened: false });
    }
  }

// Transforme les options
  getMenuitems(nodes) {
    return React.Children.map(this.props.children, (menuitem, index) => {
      const item = React.cloneElement(menuitem, {
        index,
        key: index,
        onAfterClick: this.onMenuitemAfterClick,
        linkExtraArguments: this.props.linkExtraArguments,
        ...menuitem.props,
      });
      // On retourne un nouveau item
      return <li>{item}</li>;
    });
  }

  render() {
    const { opened } = this.state;
    const { className, classNameTitle, disabled, template, styles, children } = this.props;

    const menuItems = this.getMenuitems();

    if (menuItems.length === 0) return null;

    let templateConfiguration = {
      ...this.props,
    };

    if (template === propTypes.Template.Grid) {
      templateConfiguration = {
        ...templateConfiguration,
        title: <svg className={styles.gridHandle} xmlns="http://www.w3.org/2000/svg" width="3" height="16" viewBox="0 0 3 16" preserveAspectRatio="xMidYMin">
                <path d="M3 3.5C3 4.3 2.3 5 1.5 5S0 4.3 0 3.5.7 2 1.5 2 3 2.7 3 3.5zM1.5 11c-.8 0-1.5.7-1.5 1.5S.7 14 1.5 14 3 13.3 3 12.5 2.3 11 1.5 11zm0-4.5C.7 6.5 0 7.2 0 8s.7 1.5 1.5 1.5S3 8.8 3 8s-.7-1.5-1.5-1.5z" />
               </svg>,
        orientation: propTypes.Align.Right,
        displayAdornment: false,
      };
    }

    const classNames = classnames({
      [styles.menu]: true,
      [styles.isDisabled]: disabled,
      [styles.isOpened]: opened,
      [styles.withAdornment]: templateConfiguration.displayAdornment,
      [styles.withLabelOrientationLeft]: templateConfiguration.labelOrientation === propTypes.Align.Left,
      [styles.withLabelOrientationRight]: templateConfiguration.labelOrientation === propTypes.Align.Right,
      [styles.withOrientationLeft]: templateConfiguration.orientation === propTypes.Align.Left,
      [styles.withOrientationRight]: templateConfiguration.orientation === propTypes.Align.Right,
      [styles.withDefaultTemplate]: template === propTypes.Template.Default,
      [styles.withGridTemplate]: template === propTypes.Template.Grid,
      [className]: className !== null,
    });

    const classNamesTitle = classnames({
      [styles.title]: true,
      [classNameTitle]: classNameTitle !== null,
    });

    return (
      <div className={classNames}>
        <div className={classNamesTitle} onClick={this.onClick}>{templateConfiguration.title}</div>
        <ul className={styles.menuitems}>{menuItems}</ul>
      </div>
    );
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([MenuItem, Divider]).isRequired,
  className: PropTypesEx.stylx,
  classNameTitle: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  displayAdornment: PropTypes.bool,
  labelOrientation: PropTypesEx.oneOf(propTypes.Align),
  linkExtraArguments: PropTypes.object,
  orientation: PropTypesEx.oneOf(propTypes.Align),
  onMenuitemClick: PropTypes.func,
  template: PropTypesEx.oneOf(propTypes.Template),
  title: PropTypes.any,
};

Container.defaultProps = {
  className: null,
  classNameTitle: null,
  disabled: false,
  displayAdornment: true,
  labelOrientation: 'Right',
  linkExtraArguments: null,
  orientation: 'Left',
  onMenuitemClick: null,
  template: propTypes.Template.Default,
};

Container.displayName = 'Menu';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
