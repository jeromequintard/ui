import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Validator from 'components/core/validator';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import csstyles from './styles';

const Container = class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Si la valeur est définie par le code
    this.setValue(nextProps.checked, true);
  }

  onChange(e) {
    const { onChange, name } = this.props;
    const value = e.target.checked;
    // Si la valeur est définie par le click
    this.setValue(value, false);
    if (onChange !== null) onChange(name, value);
  }

  setValue(checked, preventChange) {
    // Si la valeur n'est pas définie par le code,
    // on propage le changement d'état
    //
    // FIXME: le changement d'état ne devrait se propager
    // qu'au composant ayant réalisé le changement de propriété
    // pour le moment ce filtrage est difficile a gérer
    // React ne donnant aucune origine de l'état
    if (!preventChange && this.props.onChange !== null) {
      this.props.onChange(checked);
    }

    this.setState({
      checked,
    });
  }

  render() {
    const { styles, className, onChange, name, displaylabel, disabled, checked, ...props } = this.props;

    const classNames = classnames({
      [styles.checkbox]: true,
      [styles.isDisabled]: disabled,
      [className]: className !== null,
    });

    return (
      <div className={classNames}>
        <input
          checked={this.state.checked}
          onChange={this.onChange}
          type="checkbox"
          name={name}
          id={name}
          disabled={disabled}
          value="1"
        />
        <label className={styles.label} htmlFor={name} />
      </div>
    );
  }
};


Container.propTypes = {
  checked: PropTypes.bool,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Container.defaultProps = {
  checked: false,
  className: null,
  disabled: false,
  onChange: null,
};

Container.displayName = 'Checkbox';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Validator,
)(Container);
