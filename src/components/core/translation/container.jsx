import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isEmpty } from 'osiki-core';

import { actions } from './actions';
import { models } from './selectors';

// HOC pour gérer les traductions
// Le composant attend les traductions (JSON)
// Optionnellement l'OID d'un composant auquel
// associer les traductions

export default function Container(locales, componentOid) {

  // Wrap le composant donné en second niveau de paramètres
  return (WrappedComponent) => {
    class Translation extends Component {
      // Quand le composant monte
      componentWillMount() {
        // On execute l'action
        this.props.setLocales(locales, componentOid);
      }

      render() {
        // Si les traductions ne sont pas
        // disponibles on n'affiche rien
        if (isEmpty(this.props.locales)) return null;

        // Sinon on créé l'élément
        return (
          <WrappedComponent
            oid={componentOid}
            {...WrappedComponent.props}
            {...this.props}
          />
        );
      }
    }

    Translation.defaultProps = WrappedComponent.defaultProps;

    Translation.propTypes = WrappedComponent.propTypes;

    // On force le type pour utiliser le nom
    // du composant encapsulé
    Translation.displayName = WrappedComponent.displayName;

    // On wrap models pour lui ajouter l'oid
    const mapStateToProps = (state) => {
      return models(state, componentOid);
    };

    return connect(mapStateToProps, actions)(Translation);
  };
}

Container.displayName = 'Translation';
