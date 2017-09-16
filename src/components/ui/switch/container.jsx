import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Validator from 'components/core/validator';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.validator.componentMount(this, this.props.checked);
  }

  componentWillUnmount() {
    this.props.validator.componentUnmount(this);
  }

  onChange() {
    // On inverse l'état
    const checked = !this.state.checked;
    // On met à jour l'état
    this.setState({ checked });
    // On informe le validateur
    this.props.validator.setValue(checked);
    // On renvoi la nouvelle propriété
    if (this.props.onChange) {
      this.props.onChange(this.props.name, checked);
    }
  }

  onModelChange(model) {
    const data = Object.entries(model).filter((entry) => {
      return entry[0] === this.props.name;
    });

    if (data.length !== 0) {
      this.setState({ checked: data[0][1] });
    }
  }

  render() {
    const { styles, className, status, onChange, name, hidelabel, disabled, checked, ...props } = this.props;

    const classNames = classnames({
      [styles.switch]: true,
      [styles.isDisabled]: disabled,
      [styles.hasHiddenLabel]: hidelabel,
      [styles.withInfo]: status === propTypes.Status.Info,
      [styles.withSuccess]: status === propTypes.Status.Success,
      [styles.withWarning]: status === propTypes.Status.Warning,
      [styles.withCritical]: status === propTypes.Status.Critical,
      [className]: className !== null,
    });

    return (
      <div className={classNames}>
        <input
          className={styles.checkbox}
          onChange={this.onChange}
          type="checkbox"
          name={name}
          id={name}
          defaultChecked={checked}
          disabled={disabled}
          value="1"
        />
        <label htmlFor={name} />
      </div>
    );
  }
};

Container.propTypes = {
  status: PropTypesEx.oneOf(propTypes.Status),
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  hidelabel: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  status: propTypes.Status.Success,
  disabled: false,
  hidelabel: false,
  checked: false,
  className: null,
};

Container.displayName = 'Switch';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Validator,
)(Container);
