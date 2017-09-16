import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Types } from 'osiki-core';

import Api from './api';

import { exceptions } from './exceptions';

import { actions } from './actions';
import { models } from './selectors';

// HOC pour gérer les ACL
export default function Container(readPermission) {

  // Wrap le composant donné en second niveau de paramètres
  return (WrappedComponent) => {

    Types.value(readPermission, 'Default read permission is expected').is.string().else.error();

    class Acl extends Component {

      constructor(props) {
        super(props);

        this.state = {
          permissions: null,
        };
      }

      // Quand le composant monte
      componentWillMount() {
        // Chargement des ACL
        this.loadAcl();
        // this.props.aclCheck();
      }

      shouldComponentUpdate(nextProps, nextState) {
        const { permissions } = nextState;

        // Les permissions sont chargées
        if (permissions !== null) {

          // On a la permission (identifié ou non)
          if (permissions.indexOf(readPermission) !== -1) {
            // On autorise l'affichage
            return true;
          }

          // On est pas identifié
          if (!nextProps.isAuthenticated) {
            // On redirige vers l'authentification
            this.props.push(this.props.authPath);
          } else {
            throw new exceptions.ForbiddenException();
          }
        }

        // Dans les autres cas, on ne fait pas l'affichage
        return false;
      }

      loadAcl() {
        // On charge les permissions via l'API
        Api.getAcl(this.context.module.oid)
          .then((response) => {
            // On mets à jour l'état
            this.setState({ permissions: response });
          })
          .catch((error) => {
            console.info('error', error);
            throw new exceptions.AclLoaderException(error);
          });
      }

      render() {
        const { permissions } = this.state;

        // Appel initial, on renvoi null
        if (permissions === null) return null;

        // On valide l'affichage du composant
        // FIXME: A corriger !!!
      //  this.props.componentRenderDone();

        // On affiche le composant on fournit les
        // permissions en propriétés
        return (
          <WrappedComponent
            permissions={permissions}
            {...this.props}
          />
        );
      }
    }

    Acl.contextTypes = {
      module: PropTypes.object,
    };

    // On force le type pour utiliser le nom
    // du composant encapsulé
    Acl.displayName = WrappedComponent.displayName;

    return connect(models, actions)(Acl);
  };
}

Container.displayName = 'Acl';
