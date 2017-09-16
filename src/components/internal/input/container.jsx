import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const Container = class Container extends Component {

  // constructor(props) {
  //   super(props);
  // }
  render() {
    return React.Children.only(this.props.children);
  }
};

Container.propTypes = {
  name: PropTypes.string.isRequired,
};

Container.defaultProps = {

};

Container.displayName = 'Input';

export default Container;
