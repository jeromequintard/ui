import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  DOM,
} from 'osiki-core';


import Action from 'components/ui/grid/action';
import Button from 'components/ui/button';
import Divider from 'components/ui/divider';
import Menu from 'components/ui/menu';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as dividerPropTypes from 'components/ui/divider/types';
import * as buttonPropTypes from 'components/ui/button/types';
import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: this.props.position,
    };
  }

  componentDidUpdate() {
    // Si la position de la toolbar est en dehors de la zone visible
    const overflowed = (this.toolbar.offsetTop + this.toolbar.clientHeight) > this.toolbar.offsetParent.clientHeight;

    // Si on veut position la toolbar en bas, on applique uniquement ce
    // positionnement si la zone n'est pas scrollable, dans le cas restant
    // la toolbar reste à sa position actuelle
    if (this.state.position === propTypes.Position.Bottom && overflowed) {
      this.setState({ position: propTypes.Position.Flow }); // eslint-disable-line
    }

    // Si on est en flow mais qu'à l'origine on souhait la barre en bas et que l'ensemble est visible
    if (this.state.position === propTypes.Position.Flow && this.props.position === propTypes.Position.Bottom && !overflowed) {
      this.setState({ position: propTypes.Position.Bottom }); // eslint-disable-line
    }
  }

  getElements() {
    let elements = this.props.children;
    if (!Array.isArray(elements)) elements = [elements];
    return elements;
  }

  isNormalSize() {
    let ret = false;
    this.getElements().forEach((tool) => { // eslint-disable-line
      switch (tool.type.displayName) {
        case Button.displayName:
          if (tool.props.size === buttonPropTypes.Size.Normal) ret = true;
          break;
        case Action.displayName:
          ret = true;
          break;
        default:
      }
    });

    return ret;
  }

  getTools() {
    return React.Children.map(this.getElements(), (tool) => {
      let element = tool;

      // On clone les divider pour définir l'orientation verticale
      if (tool.type.displayName === Divider.displayName) {
        element = React.cloneElement(tool, {
          orientation: dividerPropTypes.Orientation.Vertical,
        });
      }

      return <li>{element}</li>;
    });
  }

  render() {
    const { align, styles, className } = this.props;
    const { position } = this.state;

    const isNormalSize = this.isNormalSize();

    const classNamesToolbar = classnames({
      [styles.toolbar]: true,
      [styles.hasNormalSize]: isNormalSize,
      [styles.hasSmallSize]: !isNormalSize,
      [className]: className !== null,
    });

    const classNamesBar = classnames({
      [styles.bar]: true,
      [styles.isLeftAlign]: align === propTypes.Align.Left,
      [styles.isRightAlign]: align === propTypes.Align.Right,
      [styles.hasNormalSize]: isNormalSize,
      [styles.hasSmallSize]: !isNormalSize,
      [styles.onFlow]: position === propTypes.Position.Flow,
      [styles.onTop]: position === propTypes.Position.Top,
      [styles.onBottom]: position === propTypes.Position.Bottom,
    });


    return (
      <div
        className={classNamesToolbar}
        ref={(ref) => { this.toolbar = ref; }}
      >
        <ul className={classNamesBar}>
          {this.getTools()}
        </ul>
      </div>
    );
  }
};

Container.propTypes = {
  align: PropTypesEx.oneOf(propTypes.Align),
  children: PropTypesEx.oneOfComponent([Button, Menu, Divider, Action]).isRequired,
  className: PropTypesEx.stylx,
  position: PropTypesEx.oneOf(propTypes.Position),
};

Container.defaultProps = {
  align: propTypes.Align.Right,
  className: null,
  position: propTypes.Position.Bottom,
};

Container.displayName = 'Toolbar';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
