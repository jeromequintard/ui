import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { PropTypesEx } from 'osiki-core';

import Menu from 'components/ui/menu';
import Data from 'components/ui/grid/data';
import Action from 'components/ui/grid/action';

const Container = class Container extends Component {
  render() {
    return null;
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([Data, Action, Menu]).isRequired,
};

Container.displayName = 'Columns';

export default Container;
