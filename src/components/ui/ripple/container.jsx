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

  onClick(e) {
    const { styles } = this.props;
    // On récupère l'élément ripple
    const ripple = this.dirty;
    // On récupère le parent
    const component = ripple.parentNode;
    // On récupère les coordonnées du composant
    const rect = component.getBoundingClientRect();
    // On récupère la position de la souris dans le composant
    // en prenant en compte le scrolling
    const mx = e.pageX - (rect.left + window.scrollX);
    const my = e.pageY - (rect.top + window.scrollY);
    // On récupère le circle
    const circle = ripple.firstChild;
    // On le positionne à l'endroit ou l'on a cliqué
    circle.style.left = mx + 'px';
    circle.style.top = my + 'px';
    // On récupère le nom de la classe
    const rippleActiveClass = styles.isActive.className;
    // On ajoute la classe qui effectue l'animation
    circle.classList.add(rippleActiveClass);
    // On ajoute un listener pour la fin de l'animation
    circle.addEventListener('animationend', function() {
      this.classList.remove(rippleActiveClass);
    }, false);
  }

  render() {
    const { styles, className } = this.props;

    const classNames = classnames({
      [styles.ripple]: true,
      [className]: className !== null,
    });

    return (
      <div
        className={classNames}
        onClick={this.onClick}
        ref={(ref) => { this.dirty = ref; }}
      >
        <span />
      </div>
    );
  }
};

Container.propTypes = {
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  className: null,
};

Container.displayName = 'Ripple';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
