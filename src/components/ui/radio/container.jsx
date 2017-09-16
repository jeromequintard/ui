import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';

import { classnames, stripTags, isEqual, PropTypesEx, getOid } from 'osiki-core';

import Validator from 'components/core/validator';
import Translation from 'components/core/translation';
import Theme from 'components/core/theme';
import Option from 'components/ui/option';

import manifest from 'manifest.json';

import * as propTypes from './types';
import locales from './locale.json';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: false,
      options: null,
      selectedIndex: props.selectedIndex,
    };

    this.onClick = this.onClickInside.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentWillMount() {
    this.setOptions(this.props.children);
    document.addEventListener('mouseup', this.onClickOutside);
    // Inscription à la validation
    this.props.validator.componentMount(this);
  }

  // Quand on reçoit de nouvelles propriétés
  // si les options sont différentes, on recréé les options
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.children, nextProps.children)) {
      this.setOptions(nextProps.children);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
    this.props.validator.componentUnmount(this);
  }

  onClickInside() {
    this.setState({ opened: !this.state.opened });
  }

  onClickOutside(e) {
    // Si on click pas sur le composant
    if (!findDOMNode(this).contains(e.target)) {
      // On met à jour l'état
      this.setState({ opened: false });
    }
  }

  onItemClick(index) {
    this.triggerChange(index);
  }

  // Renvoi la valeur courante
  getCurrentValue() {
    return this.getValueFromIndex(this.state.selectedIndex);
  }

  // Renvoi une clé depuis l'index de l'élément sélectionné
  getKeyFromIndex(index) {
    if (!this.state.options.length || this.state.selectedIndex === null) return null;
    return stripTags(this.state.options[index].props.children);
  }

  // Renvoi une valeur depuis l'index de l'élément sélectionné
  getValueFromIndex(index) {
    if (index === null) return null;
    // On obtient la valeur
    const value = this.state.options[index].props.value;
    // Si aucune founie on renvoi la clé
    return (value !== undefined) ? value : this.getKeyFromIndex(index);
  }

  // Transforme les options
  setOptions(nodes) {
    // Pour chaque enfant
    const options = React.Children.map(nodes, (option, index) => {
      // On retourne un nouveau item
      return React.cloneElement(option, {
        index,
        key: index,
        text: stripTags(option.props.children),
        onItemClick: this.onItemClick,
        className: this.props.styles.option.className,
      });
    }, this);

    this.setState(
      {
        options,
      },
      () => {
        // On fixe la valeur dans le validateur
        this.props.validator.setValue(this.getCurrentValue());
      },
    );

    return options;
  }

  // En cas d'action
  triggerChange(index) {
    // On récupère la valeur correspondant à l'index
    const value = this.getValueFromIndex(index);

    // On définit l'état
    this.setState({
      selectedIndex: index,
      opened: false,
    });

    // On informe le validateur
    this.props.validator.setValue(value);

    // On déclenche le onChange
    if (this.props.onChange) {
      this.props.onChange(name, value, index);
    }
  }

  // Réalise le rendu du libellé
  renderLabel() {
    const { placeholder, t } = this.props;
    const label = (placeholder === null) ? t('Select an item') : placeholder;
    return (this.state.selectedIndex != null) ? this.getKeyFromIndex(this.state.selectedIndex) : label;
  }

  render() {
    const { opened } = this.state;
    const { styles, className, children, hideLabel, placeholder, orientation, disabled, ...props } = this.props;

    const options = this.state.options;
    const label = this.renderLabel();

    const classNames = classnames({
      [styles.radio]: true,
      [styles.withOrientationTop]: orientation === propTypes.Orientation.Top,
      [styles.withOrientationMiddle]: orientation === propTypes.Orientation.Middle,
      [styles.withOrientationBottom]: orientation === propTypes.Orientation.Bottom,
      [styles.withHideLabel]: hideLabel,
      [styles.isDisabled]: disabled,
      [styles.isOpened]: opened,
      [className]: className !== null,
    });

    return (
      <div className={classNames} placeholder={placeholder}>
        <label className={styles.label} onClick={this.onClick}>{ label }</label>
        <ul className={styles.options}>{options}</ul>
      </div>
    );
  }
};

Container.propTypes = {
  placeholder: PropTypes.string,
  children: PropTypesEx.oneOfComponent([Option]).isRequired,
  selectedIndex: PropTypesEx.indexOfChildren,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  orientation: PropTypesEx.oneOf(propTypes.Orientation),
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  disabled: false,
  hideLabel: true,
  placeholder: null,
  orientation: propTypes.Orientation.Middle,
  selectedIndex: null,
  className: null,
};

Container.displayName = 'Radio';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
  Validator,
)(Container);
