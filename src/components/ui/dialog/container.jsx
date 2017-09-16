import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  DOM,
} from 'osiki-core';

import Button from 'components/ui/button';
import Scrollbar from 'components/ui/scrollbar';
import Theme from 'components/core/theme';
import Toolbar from 'components/ui/toolbar';
import Translation from 'components/core/translation';

import manifest from 'manifest.json';

import * as buttonPropTypes from 'components/ui/button/types';
import * as propTypes from './types';
import csstyles from './styles';

import { types, actions } from './actions';
import { models } from './selectors';

import locales from './locale.json';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      func: null,
      state: propTypes.State.Closed,
    };

    this.finaly = this.finaly.bind(this);
    this.blurringTerminate = this.blurringTerminate.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  // componentWillMount() {
  //   document.addEventListener('keydown', this.onKeyDown);
  // }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.state.state !== nextProps.dialog.state) {
      this.setState({ state: nextProps.dialog.state });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.state === propTypes.State.Opening || nextState.state === propTypes.State.Closing || nextState.state === propTypes.State.Closed);
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.dialog !== undefined && this.dialog !== null) {
      this.dialog.addEventListener('animationend', this.finaly);
      this.blurring();
    }
  }

  // componentWillUnmount() {
  //   document.removeEventListener('keypress', this.onKeyDown);
  // }

  blurring() {
    const { state } = this.state;

    if (this.dialog !== undefined && this.dialog !== null) {
      // Pour les noeuds qui suivent
      let el = this.dialog.nextSibling;
      while (el) {
        if (state === propTypes.State.Opening) {
          DOM.addClass(el, this.props.styles.blurredBackground);
          DOM.addClass(el, this.props.styles.isOpening);
        }

        if (state === propTypes.State.Closing) {
          el.addEventListener('animationend', this.blurringTerminate);
          DOM.removeClass(el, this.props.styles.isOpening);
          DOM.addClass(el, this.props.styles.isClosing);
        }

        el = el.nextSibling;
      }
    }
  }

  // onKeyDown(e) {
  //   if (e.key === 'Escape') {

  //   }
  // }

  blurringTerminate(e) {
    const el = e.target;
    DOM.removeClass(el, this.props.styles.blurredBackground);
    DOM.removeClass(el, this.props.styles.isClosing);
    el.removeEventListener('animationend', this.blurringTerminate);
  }

  finaly() {
    const { state, func } = this.state;

    this.dialog.removeEventListener('animationend', this.finaly);

    // Ouverture
    if (state === propTypes.State.Opening) {
      this.setState({ state: propTypes.State.Opened });
    }

    // Fermeture
    if (state === propTypes.State.Closing) {
      // On change l'état pour fermé
      this.setState({ state: propTypes.State.Closed });
      // On appelle l'action reduc
      this.props.hide();
      // On appelle la fonction d'origine
      if (func !== undefined) func();
    }
  }

  overrideOnClick(func) {
    return () => {
      this.setState({
        func,
        state: propTypes.State.Closing,
      });
    };
  }

  // Renvoi une valeur par défaut
  getDefault(value, defaultValue) {
    return (value === undefined || value === null) ? defaultValue : value;
  }

  getParameters() {
    const { t } = this.props;

    let parameters = this.props.dialog.parameters;

    // Uniquement le message
    if (typeof parameters === 'string') {
      const message = parameters;
      parameters = {};
      parameters.message = message;
    }

    // Aucune action est définie
    if (parameters.actions === undefined) {
      parameters.actions = [];
      parameters.actions[t('Close')] = {
        status: 'Critical',
        icon: 'danger',
      };
    }

    return parameters;
  }

  getActions(parameters) {
    // On énumère toutes les actions
    return Object.keys(parameters.actions).map((action) => {
      const props = parameters.actions[action];
      let onClick = null;
      let status = buttonPropTypes.Status.Success;
      let icon = 'success';

      // Pour seule propriété on a le onClick
      switch (typeof props) {
        case 'function':
          onClick = this.overrideOnClick(props);
          break;

        case 'object':
          onClick = this.overrideOnClick(props.action);
          status = this.getDefault(props.status, buttonPropTypes.Status.Success);
          icon = this.getDefault(props.icon, 'success');
          break;
        default:
      }

      return (
        <Button
          key={action}
          onClick={onClick}
          status={status}
          icon={icon}
        >
        {action}
        </Button>
      );
    });
  }

  render() {
    const { styles, className, width, closeAnim, openAnim } = this.props;
    const { state } = this.state;

    if (state === propTypes.State.Closed) return null;

    const overlayClassNames = classnames({
      [styles.overlay]: true,
      [styles.isOpening]: state === propTypes.State.Opening,
      [styles.isClosing]: state === propTypes.State.Closing,
    });

    const containerClassNames = classnames({
      [styles.container]: true,
      [styles.isOpening]: state === propTypes.State.Opening,
      [styles.isClosing]: state === propTypes.State.Closing,
      [styles.withOpenFadeAnim]: openAnim === propTypes.OpenAnim.Fade,
      [styles.withOpenScaleAnim]: openAnim === propTypes.OpenAnim.Scale,
      [styles.withOpenBounceAnim]: openAnim === propTypes.OpenAnim.Bounce,
      [styles.withOpenSlideAnim]: openAnim === propTypes.OpenAnim.Slide,
      [styles.withCloseFadeAnim]: closeAnim === propTypes.CloseAnim.Fade,
      [styles.withCloseScaleAnim]: closeAnim === propTypes.CloseAnim.Scale,
      [styles.withCloseSlideAnim]: closeAnim === propTypes.CloseAnim.Slide,
      [className]: className !== null,
    });

    const style = {
      width,
    };

    const parameters = this.getParameters();

    return (
      <div
        className={overlayClassNames}
        ref={(ref) => { this.dialog = ref; }}
      >
        <div
          className={containerClassNames}
          style={style}
        >
          <div className={styles.content}>
            {parameters.title && <h1>{parameters.title}</h1>}
            {parameters.message}
          </div>
          <Toolbar position="Flow">
            {this.getActions(parameters)}
          </Toolbar>
        </div>
      </div>
    );
  }
};

Container.propTypes = {
  className: PropTypesEx.stylx,
  closeAnim: PropTypesEx.oneOf(propTypes.CloseAnim),
  openAnim: PropTypesEx.oneOf(propTypes.OpenAnim),
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  closeAnim: propTypes.CloseAnim.Slide,
  openAnim: propTypes.OpenAnim.Slide,
  width: '600px',
};

Container.displayName = 'Dialog';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
  connect(models, actions),
)(Container);
