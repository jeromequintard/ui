import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  Types,
} from 'osiki-core';

import manifest from 'manifest.json';

import Theme from 'components/core/theme';

import * as propTypes from './types';

import { exceptions } from './exceptions';
import { types, actions } from './actions';
import { models } from './selectors';

import { rules } from './rules';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    if (props.dataSource !== null) {
      Types.value(props.name, 'Property name is expected with datasource.').is.string().else.error();
      Types.value(props.primaryKey, 'Property primaryKey is expected with datasource.').is.string().else.error();
    }

    this.state = {
      isValid: false,
      uid: props.name,
      model: null,
    };

    this.attachToForm = this.attachToForm.bind(this);
    this.detachFromForm = this.detachFromForm.bind(this);
    this.validate = this.validate.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onModelChange = this.onModelChange.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataSource !== null) {
      const model = nextProps.model[this.state.uid];
      switch (model.databound) {
        case propTypes.DataboundState.Loaded:
          this.setState({ model: model.data }, this.onModelChange);
          break;
        case propTypes.DataboundState.Error:
          throw new exceptions.DataSourceException();
        default:
      }
    }
  }

  componentDidMount() {
    // On charge les données
    if (this.props.dataSource !== null) {
      this.props.getData(
        this.state.uid,
        this.props.dataSource,
        this.props.primaryKey,
      );
    }
  }

  // On définit le context
  getChildContext() {
    return {
      form: {
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        validate: this.validate,
        getErrors: this.getErrors,
        onFieldChange: this.onFieldChange,
      },
    };
  }

  // Notifie une modification du modèle au composant
  onModelChange() {
    this.props.components.forEach((component) => {
      if (component.onModelChange) component.onModelChange(this.state.model);
    });
  }

  // En cas de soumission du formulaire
  onSubmit(e) {
    // On filtre tous les éléments invalides
    this.props.components.filter((component) => {
      return component && !component.state.isValid;
    // Et on leur demande d'afficher les erreurs
    }).forEach((component) => {
      component.setState({ displayFormErrors: true });
    });

    // On soumet à l'évènement avec les donnnées si valide
    if (this.props.onSubmit && this.state.isValid) {
      this.props.onSubmit(this.convertSubform(this.getCurrentValues()));
    }

    // On désactive la soumission classique du DOM
    e.preventDefault();
    e.stopPropagation();
  }

  onKeyPress(e) {
    if (!this.props.allowEnterSubmit) {

      const textArea = /textarea/i.test(e.target.tagName);

      if (e.key === 'Enter' && !textArea) e.preventDefault();
    }
  }

  onFieldChange(value, initial) {
    if (this.props.onContentChange && !initial) this.props.onContentChange();
  }

  convertSubform(values) {
    const ret = [];
    const subformValues = [];

    // Pour chaque valeur du formulaire
    Object.entries(values).forEach(([key, value]) => {
      // Si elle commence par subform
      if (key.startsWith('Subform')) {
        // On split et on enlève le premier élément (subform)
        const arrValue = key.split('/');
        arrValue.shift();
        subformValues.push(arrValue);
      } else {
        // Sinon on ajoute l'élément
        ret[key] = value;
      }
    });

    // Si il y a des subform
    if (subformValues.length !== 0) {
      // On tri les données
      subformValues.sort((item1, item2) => {
        // Par subforms
        if (item1[0] < item2[0]) return -1;
        if (item1[0] > item2[0]) return 1;
        // Par id
        if (item1[1] < item2[1]) return -1;
        if (item1[1] > item2[1]) return 1;

        return 0;
      });

      // const tutu = subformValues.reduce((acc, formValue)) => {
      //   return [formValue[0]] = 
      //   console.info(formValue);

      // }, {});

      console.info('ICI', subformValues);

    }


    return ret;
  }

  // Retourne les valeurs de l'ensemble des champs
  getCurrentValues() {
    // On renvoi un tableau des valeurs
    return this.props.components.reduce((ret, component) => {
      // On réduit/cumul en prenant le nom du champ et sa valeur
      ret[component.props.name] = component.state.validatorValue;
      // On retoune le résultat
      return ret;
    }, {});
  }

  // Retourne les erreurs d'un composant
  getErrors(component) {
    if (component != null) {
      const { validatorsErrors, validatorsError } = component.props;
      const { errors } = component.state;

      if (errors && errors.length) {
        // On map les erreurs
        return errors.map((error) => {
          // Sur les messages indiqués dans le composant
          // ou le message global
          return validatorsErrors[error] ? validatorsErrors[error] : validatorsError;
        });
      }
    }

    return [];
  }

  // Vérifie si tous les éléments sont valides
  check() {
    const previous = this.state.isValid;

    const isValid = this.props.components.every((component) => {
      return component.state.isValid;
    });

    if (previous !== isValid) {
      this.setState({ isValid });
      // On propage l'état
      if (this.props.onChange) {
        this.props.onChange(isValid);
      }
    }
  }

  // Valide l'ensemble du formulaire
  validateForm() {
    // On effectue la validation de l'ensemble du formulaire
    // Le dernier traité met à jour l'état final
    this.props.components.forEach((component, index) => {
      const validation = this.checkComponent(component);
      component.setState({
        isValid: validation.isValid, // Le componsant est t'il valide ?
        errors: validation.errors, // Les erreurs associées
        displayFormErrors: false,
      }, index === this.props.components.length - 1 ? this.check.bind(this) : null);
    }, this);
  }

  // Attache un composant au formulaire
  attachToForm(component) {
    // Si le composant n'existe pas
    if (this.props.components.indexOf(component) === -1) {
      // On l'ajoute
      this.props.components.push(component);
    }
  }

  // Détache un composant du formulaire
  detachFromForm(component) {
    // Si le composant existe
    const pos = this.props.components.indexOf(component);
    if (pos !== -1) {
      // On supprime le composant du tableau
      this.props.components.splice(pos, 1);
    }
  }

  // On valide un composant
  validate(component, displayFormErrors = false) {
    if (component != null) {
      const validation = this.checkComponent(component);

      component.setState({
        isValid: validation.isValid, // Le componsant est t'il valide ?
        errors: validation.errors, // Les erreurs associées
        displayFormErrors: false,
      }, this.validateForm);

      return validation.isValid;
    }
    return false;
  }

  // On vérifie le composant
  checkComponent(component) {
    // On récupère les valeurs de l'ensemble des champs
    const values = this.getCurrentValues();
    // On récupère la valeur de ce composant
    const value = component.state.validatorValue;
    // On vérifie les validateurs et on retourne les règles en erreur
    const errors = this.checkRules(values, value, component.props.validatorsRules);
    // On détermine si le composant est valide
    const isValid = !errors.length;

    return {
      isValid,
      errors,
    };
  }

  // On applique les différents validateurs aux règles existantes
  checkRules(values, value, validators) {
    const errors = [];

    // Si c'est un string on la convertie en tableau
    if (typeof validators === 'string') validators = [validators];

    // Pour chaque validateur
    Object.keys(validators).forEach((index) => {
      let argument = null;
      let ruleName = validators[index];

      // Si c'est un objet
      if (typeof ruleName === 'object') {
        // On récupère l'argument
        argument = Object.values(ruleName)[0];
        // On récupère le nom de la règle
        ruleName = Object.keys(ruleName)[0];
      }

      // On récupère la règle associé
      const rule = rules[ruleName];
      // Si la règle est inconnue
      if (rule === undefined) {
        throw new Error(`Unknown validation rule ${ruleName}`);
      }

      // On exécute la règle
      if (!rule(values, value, argument)) {
        errors.push(ruleName);
      }
    });

    return errors;
  }

  render() {
    const { styles, className, children } = this.props;

    const classNames = classnames({
      [styles.form]: true,
      [className]: className !== null,
    });

    return (
      <form
        autoComplete="off"
        className={classNames}
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        {children}
      </form>
    );
  }

};

Container.propTypes = {
  allowEnterSubmit: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypesEx.stylx,
  components: PropTypes.array,
  dataSource: PropTypes.func,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onContentChange: PropTypes.func,
  onSubmit: PropTypes.func,
  primaryKey: PropTypes.string,
};

Container.defaultProps = {
  allowEnterSubmit: false,
  className: null,
  components: [],
  dataSource: null,
  primaryKey: null,
};

Container.childContextTypes = {
  form: PropTypes.object,
};

Container.displayName = 'Form';

// Permet l'ajout d'une règle
Container.addRule = (name, func) => {
  rules[name] = func;
};

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  connect(models, actions),
)(Container);
