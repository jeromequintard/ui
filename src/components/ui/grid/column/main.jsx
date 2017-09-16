import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import { PropTypesEx } from 'osiki-core';

import * as types from 'components/ui/grid/types';
import { Format } from 'components/ui/grid/formats';

const Container = class Container extends Component {
  render() {
    return null;
  }
};

Container.propTypes = {
  align: PropTypesEx.oneOf(types.Align),
  className: PropTypesEx.stylx,
  displayTitle: PropTypes.bool,
  onClick: PropTypes.func,
  searchable: PropTypes.bool,
  separator: PropTypes.bool,
  sortable: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypesEx.size,
};

Container.defaultProps = {
  align: types.Align.Left,
  className: null,
  displayTitle: true,
  onClick: null,
  searchable: true,
  separator: true,
  sortable: true,
  title: null,
  width: null,
};

Container.displayName = 'Column';

export default Container;
