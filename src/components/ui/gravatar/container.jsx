import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import { actions } from './actions';
import { models } from './selectors';

import csstyles from './styles';

const Container = class Container extends Component {
  componentWillMount() {
    this.getGravatar(this.props.email);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { email } = nextProps;

    // Si l'adresse courante et celle demandée sont différentes
    if (this.props.email !== email) {
      this.getGravatar(email);
    }
  }

  getGravatar(email) {
    // Si c'est bien une adresse e-mail
    if (/^[\w\.-]+@(?:[\w]+\.)+[a-zA-Z]{2,}$/i.test(email)) {
      // On obtient le gravatar
      this.props.getGravatar(email, this.props.size);
    } else {
      // On réinitialise l'état
      this.props.resetGravatar();
    }
  }

  render() {
    const { styles, className, gravatar } = this.props;

    const classeNames = classnames({
      [styles.gravatar]: true,
      [styles.isLoaded]: gravatar.url !== null,
      [className]: className !== null,
    });

    return (
      <div className={classeNames}>
        <img src={this.props.gravatar.url} alt="gravatar" />
        <svg className={this.props.styles.defaultImage} xmlns="http://www.w3.org/2000/svg" width="40" height="49.5" viewBox="0 0 40 49.5" x="40">
          <path fill="#318293" d="M20 30.3C9 30.3 0 39 0 49.5h40c0-10.6-9-19.2-20-19.2z" />
          <path fill="#FCAF26" d="M14 25.7v6.5c0 3.6 2.7 6.5 6 6.5s6-3 6-6.5v-6.5H14z" />
          <circle fill="#FCAF26" cx="8.9" cy="18.3" r="2.4" />
          <circle fill="#FCAF26" cx="30.9" cy="17.2" r="2.4" />
          <path fill="#FCBF51" d="M31 15.6c0-7.3-5-13-11-13S9 8.2 9 15.5c0 .7.2 1.4.3 2a11 11 0 0 0-.2 1.8c0 6 5 11 11 11s11-5 11-11c0-.6 0-1.2-.2-1.7v-2z" />
          <circle fill="#78491E" cx="15.2" cy="18.1" r="1.2" />
          <circle fill="#78491E" cx="24.9" cy="18.1" r="1.2" />
          <path fill="#464342" d="M25 2.4L23.7 0h-5.3C8.4 1.3 7.8 12.2 7.8 12.2v4l2.4 2V12l14.6-5 5 5v6.2L32 16v-5c-.4-7.7-7-8.6-7-8.6z" />
          <path fill="#094358" d="M28.5 32.2a21.4 21.4 0 0 0-2.5-1v.4c0 2.7-2.7 5-6 5s-6-2.3-6-5v-.3c-.8.2-1.6.5-2.4 1C12 36 15.6 39 20 39c4.5 0 8-3 8.5-6.8z" />
        </svg>
      </div>
    );
  }
};

Container.propTypes = {
  size: PropTypes.number.isRequired,
  email: PropTypes.string,
  className: PropTypesEx.stylx,
};

Container.defaultProps = {
  size: 90,
  className: null,
};

Container.displayName = 'Gravatar';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  connect(models, actions),
)(Container);
