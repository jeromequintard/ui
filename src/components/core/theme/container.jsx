import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Types, Stylx, newGUID } from 'osiki-core';

// HOC pour gérer les Themes
export default function Container(styles, oid) {

  // TODO: Ajouter des évènements transitionstart / transitionend pour les composants

  // Wrap le composant donné en second niveau de paramètres
  return (WrappedComponent) => {

    Types.value(styles, 'Styles expected').is.function().else.error();
    Types.value(oid, 'OID is expected').is.string().else.error();

    class Theme extends Component {
      constructor(props) {
        super(props);

        this.state = {
          styles: null,
          guid: newGUID(),
        };

        this.onThemeUpdate = this.onThemeUpdate.bind(this);
      }

      componentWillMount() {
       // console.info('THEME MOUNT', WrappedComponent.displayName);
        // On mets à jour les styles
        this.updateCss();
      }

      // Avant que le composant monte
      componentDidMount() {
        // On souscrit à tout changement éventuelle du theme
        this.context.theme.subscribe(this.state.guid, () => this.onThemeUpdate());
      }

      componentWillUnmount() {
        // On désinscrit l'instance du composant de la notification
        // Attention on ne détruit pas pour autant les CSS associés
        // ils peuvent être utlisés par d'autres instances
        this.context.theme.unsubscribe(this.state.guid);
      }

      onThemeUpdate(scheme) {
        this.updateCss();
      }

      updateCss() {
        const scheme = this.context.theme.getScheme();

        if (this.context.theme !== undefined && scheme !== null) {
          // On gènère les styles avec le schéma renvoyé par le thème
          const _styles = styles(scheme);
          // On met à jour les css
          this.context.theme.addCss(oid, Stylx.get(_styles));
          // On met à jour l'état
          this.setState({
            styles: _styles,
          });
        }
      }

      render() {
        const scheme = this.context.theme.getScheme();
        const csstyles = this.state.styles;

        // Tant que le schéma ou les styles ne sont pas à jour, on n'affiche rien
        if (scheme === null || csstyles === null) return null;

        // On affiche le composant
        return (
          <WrappedComponent
            scheme={scheme}
            styles={csstyles}
            {...WrappedComponent.props}
            {...this.props}
          />
        );
      }
    }

    Theme.defaultProps = WrappedComponent.defaultProps;

    Theme.propTypes = WrappedComponent.propTypes;

    Theme.contextTypes = {
      ...WrappedComponent.contextTypes,
      theme: PropTypes.object,
    };

    // On force le type pour utiliser le nom
    // du composant encapsulé
    Theme.displayName = WrappedComponent.displayName;

    return Theme;
  };
}

Container.displayName = 'Theme';
