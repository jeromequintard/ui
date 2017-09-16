import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  isEqual,
  DOM,
} from 'osiki-core';

import Input from 'components/internal/input';

import Validator from 'components/core/validator';
import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles.js';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasValue: false,
      hasFocus: false,
      value: props.value,
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillMount() {
    this.props.validator.componentMount(this, this.props.value);
  }

  componentDidMount() {
    this.autoResize();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { value } = nextProps;
    if (this.props.value !== value) {
      this.setState({
        hasValue: !!value,
        value,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const p = isEqual(this.props, nextProps);
    const s = isEqual(this.state, nextState);
    return !(p && s);
  }

  componentDidUpdate() {
    this.autoResize();
  }

  componentWillUnmount() {
    this.props.validator.componentUnmount(this);
  }

  onModelChange(model) {
    const data = Object.entries(model).filter((entry) => {
      return entry[0] === this.props.name;
    });

    if (data.length !== 0) {
      this.setState({ value: data[0][1] });
    }
  }

  onChange(e) {
    const value = e.target.value;

    this.setState({
      hasValue: !!value,
      value,
    });

    this.props.validator.setValue(value);
    // On renvoi la nouvelle valeur
    if (this.props.onChange) {
      this.props.onChange(this.props.name, value);
    }
  }

  onFocus(e) {
    this.setState({ hasFocus: true });
  }

  onBlur(e) {
    this.setState({ hasFocus: false });
  }

  onKeyDown(e) {
    if (this.props.onKeyDown) this.props.onKeyDown(e.key, e.keyCode);
  }

  // Redimensionne le composant
  autoResize() {
    if (this.props.multiline) {
      const el = this.textinput;
      const heightOffset = parseFloat(DOM.css(el, 'border-width')) * 2;

      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight + heightOffset}px`;
    }
  }

  getInput() {
    const { styles, type, name, placeholder, multiline, readonly, rows } = this.props;
    const { value } = this.state;

    const Tag = (!multiline) ? 'input' : 'textarea';

    return (
      <Tag
        autoComplete="off"
        className={styles.input}
        id={name}
        name={name}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        readOnly={readonly}
        placeholder={placeholder}
        ref={(ref) => { this.textinput = ref; }}
        rows={rows}
        type={type.toLowerCase()}
        value={value}
      />
    );
  }

  render() {
    const { styles, className, width, disabled, placeholder, template } = this.props;
    const { hasValue, hasFocus, displayFormErrors } = this.state;

    // On récupère l'éventuel message d'erreur
    const errorMessage = this.props.validator.getErrorMessage();

    // Définit si l'on affiche l'erreur
    const hasError = errorMessage != null // Si il y un message d'erreur
                     && ((hasFocus || // Et que le composant à le focus
                     (!hasFocus && hasValue)) // Ou qu'il n'a pas le focus mais qu'il y'a une valeur
                     || displayFormErrors); // Ou que l'on doit afficher les erreurs du formulaire

    // On affiche le placeholder ou le message d'erreur
    const text = (hasError || template === propTypes.Template.Boxed) ? errorMessage : placeholder;

    const classNames = classnames({
      [styles.textinput]: true,
      [styles.isDisabled]: disabled,
      [styles.isUnderline]: template === propTypes.Template.Underline,
      [styles.isBoxed]: template === propTypes.Template.Boxed,
      [styles.hasValue]: hasValue,
      [styles.hasFocus]: hasFocus || displayFormErrors,
      [styles.hasError]: hasError,
      [className]: className !== null,
    });

    const style = {
      width,
    };

    return (
      <span className={classNames} style={style}>
        {this.getInput()}
        <label className={styles.label} htmlFor={name}>
          <span className={styles.tooltip}>{text}</span>
        </label>
      </span>
    );
  }

};

Container.propTypes = {
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  template: PropTypesEx.oneOf(propTypes.Template).isRequired,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  rows: PropTypes.number,
  type: PropTypesEx.oneOf(propTypes.Type).isRequired,
  value: PropTypes.string,
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  disabled: false,
  template: propTypes.Template.Boxed,
  multiline: false,
  readonly: false,
  rows: 2,
  type: propTypes.Type.Text,
  value: '',
  width: null,
};

Container.displayName = 'Textinput';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Validator,
)(Container);
