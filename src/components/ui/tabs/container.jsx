import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Scrollbar from 'components/ui/scrollbar';
import Theme from 'components/core/theme';
import Tab from 'components/ui/tab';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: Number(this.props.selectedIndex),
    };

    this.onTabClick = this.onTabClick.bind(this);
  }

  // Au changement de tab
  onTabClick(index) {
    this.setState({ selectedIndex: index });

    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  render() {
    const { styles, shifted, className, navClassName, navWidth, height, width, containerClassName, toggleMode, disabled, children, ...props } = this.props;

    let activeContent = null;
    let sprites = false;

    let tabsElements = children;

    // Si ce n'est pas un tableau, on le transforme en plain object itérable
    if (!Array.isArray(tabsElements)) tabsElements = [tabsElements];

    let index = 0;

    // On récupère la liste des tabs
    const tabs = tabsElements.map((tab) => {
      // Dans le cas ou le tab est null
      // ce cas est provoqué par une itération
      if (tab !== null) {

        // Dans le cas d'une itération, TAB peut être un literal
        // On encaspsule dans un array pour éviter cette problématique
        if (!Array.isArray(tab)) tab = [tab];

        // Que l'on énumère ensuite
        return tab.map((el) => {
          let activeTab = false;
          const key = `${el.props.title}/${index}`;

          // Si il y a un sprite
          if (el.props.sprite && !sprites) sprites = true;

          // Si c'est celui-ci qui est sélectionné
          if (this.state.selectedIndex === index) {
            activeTab = true;
            activeContent = React.createElement('div', {
              key,
            }, el.props.children);
          }

          const classNames = classnames([
            styles.tab.className,
            el.props.className,
          ]);

          // On recréé chaque tab avec de nouvelles propriétés
          const newTab = React.cloneElement(el, {
            active: activeTab,
            title: el.props.title,
            key,
            id: index,
            shifted: (index === 0) ? shifted : false,
            onTabClick: this.onTabClick,
            className: classNames,
            disabled: disabled || el.props.disabled,
          });

          // On incrémente l'index
          index++;

          return newTab;
        });
      }
      return null;
    }, this);

    const classNames = classnames({
      [styles.tabs]: true,
      [styles.isDisabled]: disabled,
      [styles.isShifted]: shifted,
      [styles.hasToggleModeAuto]: toggleMode === propTypes.ToggleMode.Auto,
      [className]: className !== null,
    });

    const style = {
      width,
      height,
    };

    return (
      <div className={classNames} style={style} ref={(e) => { this.tabs = e; }}>
        <div className={classnames([styles.nav, navClassName])} style={{ flexBasis: navWidth }}><ul>{ tabs }</ul></div>
        <Scrollbar className={classnames([styles.container, containerClassName])} width={width} height={height} disabled={height === null}>
          { activeContent }
        </Scrollbar>
      </div>
    );
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([Tab]).isRequired,
  className: PropTypesEx.stylx,
  containerClassName: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  height: PropTypesEx.size,
  navClassName: PropTypesEx.stylx,
  navWidth: PropTypesEx.size,
  onChange: PropTypes.func,
  selectedIndex: PropTypesEx.indexOfChildren,
  shifted: PropTypes.bool,
  toggleMode: PropTypesEx.oneOf(propTypes.ToggleMode),
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  containerClassName: null,
  disabled: false,
  height: null,
  navClassName: null,
  navWidth: null,
  onChange: null,
  selectedIndex: 0,
  shifted: true,
  toggleMode: propTypes.ToggleMode.Fixed,
  width: null,
};

Container.displayName = 'Tabs';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
