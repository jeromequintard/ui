import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  newGUID,
} from 'osiki-core';

import Theme from 'components/core/theme';
import Status from 'components/ui/status';

import manifest from 'manifest.json';

import * as statusPropTypes from 'components/ui/status/types';
import * as propTypes from './types';
import csstyles from './styles';

import { types, actions } from './actions';
import { models } from './selectors';

const Container = class Container extends Component {

  constructor(props) {
    super(props);
    this.onDeleteMessage = this.onDeleteMessage.bind(this);
    this.counter = 0;
  }

  renderMessages() {
    const { model, styles, timeout } = this.props;

    return model.notifications.map((notification, index) => {
      if (this.props.maxNotifications !== null && ((index + 1) > this.props.maxNotifications)) return null;

      return (
        <Status
          className={styles.message}
          key={notification.oid}
          message={notification.message}
          status={notification.status}
          openAnim={statusPropTypes.OpenAnim.Bounce}
          onTimeout={this.onDeleteMessage}
          timeout={timeout}
        />
      );
    });
  }

  onDeleteMessage() {
    this.counter++;
    if (this.counter === this.props.model.notifications.length || this.counter === this.props.maxNotifications) {
      this.props.popNotifications(this.counter);
      this.counter = 0;
    }
  }

  render() {
    const { styles, className, model } = this.props;

    if (model.notifications.length === 0) return null;

    // On obtient le premier message de la liste
    const classNames = classnames({
      [styles.notification]: true,
      [className]: className !== null,
    });

    return (
      <div className={classNames}>
        {this.renderMessages()}
      </div>
    );
  }

};

Container.propTypes = {
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypesEx.stylx,
  maxNotifications: PropTypes.number,
  timeout: PropTypes.number,
};

Container.defaultProps = {
  channel: null,
  className: null,
  maxNotifications: 5,
  timeout: 5000,
};

Container.displayName = 'Notification';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  connect(models, actions),
)(Container);
