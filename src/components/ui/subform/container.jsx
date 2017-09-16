import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  isEqual,
  getOid,
  newGUID,
} from 'osiki-core';

import Button from 'components/ui/button';
import FormField from 'components/ui/formField';
import Theme from 'components/core/theme';
import Translation from 'components/core/translation';
import Toolbar from 'components/ui/toolbar';

import manifest from 'manifest.json';

import * as propTypes from './types';
import csstyles from './styles';

import locales from './locale.json';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onComponentChange = this.onComponentChange.bind(this);

    this.state = {
      rows: [],
    };
  }

  componentWillMount() {
    this.newRow();
  }

  addRow() {
    const { rows } = this.state;
    const rowId = newGUID(5);
    rows.push(rowId);
    this.setState({ rows });
  }

  newRow() {
    const { allowAdd, maximumRows } = this.props;
    const { rows } = this.state;
    if (allowAdd && (maximumRows === null || rows.length < maximumRows)) this.addRow();
  }

  onComponentChange(name, value) {
    if (this.isLastRow(name)) this.newRow();
  }

  onDeleteClick(rowId) {
    const { minimumRows } = this.props;
    const { rows } = this.state;

    if (minimumRows !== null && rows.length === minimumRows) return null;

    const index = this.getIndex(rowId);
    if (index === -1) return null;

    rows.splice(index, 1);

    this.setState({ rows });
    return null;
  }

  // Renvoi l'index d'un RowId
  getIndex(rowId) {
    return this.state.rows.findIndex((row) => {
      return row === rowId;
    });
  }

  // Est-ce la dernière ligne ?
  isLastRow(name) {
    const arrName = name.split('/');
    const index = this.getIndex(arrName[2]);
    return (index !== -1) ? index === this.state.rows.length - 1 : null;
  }

  renderHeaders() {
    const fieldsNames = React.Children.map(this.props.children, (formField) => {
      return <th>{formField.props.label}</th>;
    });

    return <thead><tr>{fieldsNames}</tr></thead>;
  }

  renderRows() {
    const { styles, allowDelete, allowAdd, maximumRows, name } = this.props;
    const { rows } = this.state;

    // Pour chaque formfield
    return rows.map((row, index) => {
      // Pour chaque formField
      const ret = React.Children.map(this.props.children, (formField) => {
        // Pour chaque composant
        let components = formField.props.children;

        if (components !== null || components !== undefined) {
          // Si un seul composant on l'encapsule dans un tableau
          if (!Array.isArray(components)) components = [components];

          // On retourne les composants
          const elements = React.Children.map(components, (component) => {

            return React.cloneElement(component, {
              ...component.props,
              name: `Subform/${name}/${row}/${component.props.name}`,
              onChange: this.onComponentChange,
              validatorsRules: (index !== rows.length - 1 || rows.length === 1) ? component.props.validatorsRules : [],
            });
          });

          return <td>{elements}</td>;
        }

        return null;
      });

      if (index !== rows.length - 1) {
        ret.push(
          <td key={`delete/${row}`}>
            <Button size="Medium" onClick={() => { this.onDeleteClick(row); }} status="Critical" className={styles.buttonDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                <path fill="#FFFFFF" d="M6 0C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm3 8L8 9 6 7 4 9 3 8l2-2-2-2 1-1 2 2 2-2 1 1-2 2 2 2z" />
              </svg>
            </Button>
          </td>,
        );
      }

      return <tr key={row}>{ret}</tr>;
    });
  }

  render() {

    const { t, styles, className, children, disabled } = this.props;

    const classNames = classnames({
      [styles.subform]: true,
      [className]: className !== null,
    });

    return (
      <table className={classNames}>
        { this.renderHeaders() }
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  }
};

Container.propTypes = {
  allowAdd: PropTypes.bool,
  allowDelete: PropTypes.bool,
  children: PropTypesEx.oneOfComponent([FormField]).isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  maximumRows: PropTypes.number,
  minimumRows: PropTypes.number,
  name: PropTypes.string.isRequired,
};

Container.defaultProps = {
  allowAdd: true,
  allowDelete: true,
  className: null,
  disabled: false,
  maximumRows: null,
  minimumRows: null,
};

Container.displayName = 'Subform';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
)(Container);
