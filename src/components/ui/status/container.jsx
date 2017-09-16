import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.onTimeout = this.onTimeout.bind(this);
    this.animTerminate = this.animTerminate.bind(this);

    this.state = {
      state: propTypes.State.Opening,
    };
  }

  componentWillMount() {
    const { timeout } = this.props;
    if (timeout !== null) {
      window.setTimeout(this.onTimeout, timeout);
    }
  }

  componentDidUpdate() {
    if (this.props.timeout !== null && this.state.state === propTypes.State.Closing) {
      this.status.addEventListener('animationend', this.animTerminate);
    }
  }

  animTerminate() {
    const { styles } = this.props;
    this.status.removeEventListener('animationend', this.animTerminate);
    if (this.props.onTimeout !== null) this.props.onTimeout();
  }

  onTimeout() {
    this.setState({ state: propTypes.State.Closing });
  }

  getExtraInfos() {
    const { code, origin } = this.props;

    const infos = [];
    if (code !== null) infos.push(code);
    if (origin !== null) infos.push(origin);

    return (infos.length !== 0) ? <span>[<strong key="infos">{infos.join(' - ')}</strong>]</span> : null;
  }

  render() {
    const { styles, status, className, message, container, openAnim, closeAnim } = this.props;
    const { state } = this.state;

    if (message === null) return null;

    const classNames = classnames({
      [styles.status]: true,
      [styles.isOpening]: state === propTypes.State.Opening,
      [styles.isClosing]: state === propTypes.State.Closing,
      [styles.withOpenScaleAnim]: openAnim === propTypes.OpenAnim.Scale,
      [styles.withOpenBounceAnim]: openAnim === propTypes.OpenAnim.Bounce,
      [styles.withCloseSlideAnim]: closeAnim === propTypes.CloseAnim.Slide,
      [styles.withInfo]: status === propTypes.Status.Info,
      [styles.withPrimary]: status === propTypes.Status.Primary,
      [styles.withSuccess]: status === propTypes.Status.Success,
      [styles.withWarning]: status === propTypes.Status.Warning,
      [styles.withCritical]: status === propTypes.Status.Critical,
      [styles.forNone]: container === propTypes.Container.None,
      [styles.forApp]: container === propTypes.Container.App,
      [styles.forComponent]: container === propTypes.Container.Component,
      [className]: className !== null,
    });

    return (
      <div
        className={classNames}
        ref={(ref) => { this.status = ref; }}
      >
        {this.getExtraInfos()}{message}
      </div>
    );
  }


};

Container.propTypes = {
  className: PropTypesEx.stylx,
  closeAnim: PropTypesEx.oneOf(propTypes.CloseAnim),
  code: PropTypes.number,
  container: PropTypesEx.oneOf(propTypes.Container),
  message: PropTypes.string,
  onTimeout: PropTypes.func,
  openAnim: PropTypesEx.oneOf(propTypes.OpenAnim),
  origin: PropTypes.string,
  status: PropTypesEx.oneOf(propTypes.Status),
  timeout: PropTypes.number,
};

Container.defaultProps = {
  className: null,
  closeAnim: propTypes.CloseAnim.Slide,
  code: null,
  container: propTypes.Container.None,
  message: null,
  onTimeout: null,
  openAnim: propTypes.OpenAnim.Scale,
  origin: null,
  status: propTypes.Status.Critical,
  timeout: null,
};

Container.displayName = 'Status';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
