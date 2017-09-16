import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Container(WrappedComponent) {

  // Wrap le composant donné en second niveau de paramètres
  class validator extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };

      this.onComponentMount = this.onComponentMount.bind(this);
      this.onComponentUnmount = this.onComponentUnmount.bind(this);
      this.onSetValue = this.onSetValue.bind(this);
      this.getErrorMessages = this.getErrorMessages.bind(this);
      this.getErrorMessage = this.getErrorMessage.bind(this);
    }

    // Au montant du composant
    onComponentMount(component, initialValue = null) {
      // Si aucun form pas de validation
      if (this.context.form == null) return;
      this.setState({ component }, () => {
        // On attache le composant au formulaire
        this.context.form.attachToForm(component);
        // Si une valeur initiale est donnée
        if (initialValue != null) {
          this.onSetValue(initialValue, true);
        }
      });
    }

    // Au démontage du composant
    onComponentUnmount(component) {
      if (this.context.form == null) return;
      this.context.form.detachFromForm(component);
      this.setState({ component: null });
    }

    // Lorsque une valeur est modifiée
    onSetValue(value, initial = false) {
      if (this.state.component == null) return;
      // On fixe la valeur dans l'état
      this.state.component.setState({
        validatorValue: value,
      }, () => {
        this.context.form.onFieldChange(value, initial);
        // On fait la validation au callback
        if (this.context.form.validate(this.state.component) && this.props.onValid) {
          this.props.onValid(value);
        }
      });
    }

    getErrorMessage() {
      const messages = this.getErrorMessages();
      return messages.length ? messages[0] : null;
    }

    getErrorMessages() {
      if (this.state.component == null) return [];
      return this.context.form.getErrors(this.state.component);
    }

    render() {
      const methods = {
        setValue: this.onSetValue,
        componentMount: this.onComponentMount,
        componentUnmount: this.onComponentUnmount,
        getErrorMessages: this.getErrorMessages,
        getErrorMessage: this.getErrorMessage,
      };

      return (
        <WrappedComponent
          validator={methods}
          {...this.props}
        />
      );
    }
  }

  WrappedComponent.propTypes = {
    ...WrappedComponent.propTypes,
    validatorsRules: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    validatorsErrors: PropTypes.object,
    validatorsError: PropTypes.string,
    onValid: PropTypes.func,
  };

  WrappedComponent.defaultProps = {
    ...WrappedComponent.defaultProps,
    validatorsRules: [],
    validatorsErrors: {},
    validatorError: null,
    onValid: null,
  };

  validator.contextTypes = {
    form: PropTypes.object,
  };

  validator.displayName = 'Validator';

  return validator;
}
