import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  isComponentOfType,
} from 'osiki-core';

import Loader from 'components/ui/loader';
import Menu from 'components/ui/menu';
import Status from 'components/ui/status';
import Theme from 'components/core/theme';
import Translation from 'components/core/translation';

import manifest from 'manifest.json';

import * as menuPropTypes from 'components/ui/menu/types';
import * as buttonPropTypes from 'components/ui/button/types';
import * as propTypes from './types';

import Actions from './actions';
import Action from './action';
import Columns from './columns';
import Column from './column';
import Data from './data';
import Filter from './filter';
import Footer from './footer';
import Header from './header';
import Row from './row';
import Td from './td';

import locales from './locale.json';
import { types, actions } from './redactions';
import { models } from './selectors';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      grid: null,
      uid: props.name,
      properties: null,
    };
  }

  // On définit le context
  getChildContext() {
    return {
      uid: this.state.uid,
      disabled: this.props.disabled,
    };
  }

  componentWillMount() {
    const columns = this.getColumns();
    const properties = this.getProperties(columns);

    this.setState({ properties, columns });

    // Initialise redux avec les propriétés de cette grille
    this.props.init(this.state.uid, properties);
  }

  componentDidMount() {
    // On charge les données
    this.getData();
  }

  // On recoit des mises à jour
  componentWillReceiveProps(nextProps) {
    // On récupère la grille en cours
    const grid = nextProps.grids[this.state.uid];

    switch (grid.action) {
      case types.GET_DATA_DONE:
      case types.GET_DATA_FAILED:
        this.setState({ grid });
        break;
      case types.TO_PAGE:
        this.getData(grid.state.page);
        break;
      case types.SORT:
        this.getData(grid.state.page, grid.pages, grid.state.sort);
        break;
      case types.SEARCH:
      case types.RESET_SEARCH:
        this.getData(grid.state.page, grid.pages, grid.state.sort, grid.state.filter);
        break;
      default:
    }
  }

  getElementOfType(type) {
    let elements = this.props.children;

    // Un seul élément on l'encapsule
    if (!Array.isArray(elements)) elements = [elements];

    const ret = elements.filter((element) => {
      return isComponentOfType(type, element);
    });

    // Si il y a des éléments
    if (ret.length !== 0 && ret[0].props !== undefined) {
      const children =  ret[0].props.children;
      // Si c'est pas un tableau on l'encapsule
      if (children !== undefined) {
        return (!Array.isArray(children)) ? [children] : children;
      }
    }

    return null;
  }

  getColumns() {
    return this.getElementOfType(Columns).map((column) => {

      switch (column.type.displayName) {
        case Action.displayName:
          return React.cloneElement(column, {
            ...column.props,
            size: buttonPropTypes.Size.Small,
            textFormat: buttonPropTypes.TextFormat.Initial,
          });

        case Menu.displayName:
          return React.cloneElement(column, {
            ...Column.defaultProps,
            ...column.props,
            align: (column.props.template === menuPropTypes.Template.Grid) ? propTypes.Align.Center : column.props.align,
            searchable: false,
            width: (Column.defaultProps.width === null || column.props.width === undefined || column.props.width === null) ? '30px' : column.props.width,
          });
        default:
      }

      return column;
    });
  }

  getActions() {
    return this.getElementOfType(Actions);
  }

  // Retourne les propriétés des colonnes et
  // défini des valeurs par défaut sur certains objets
  getColumnsProperties(columns) {
    return columns.reduce((acc, column, index) => {
      acc[index] = column.props;
      return acc;
    }, []);
  }

  // On récupère les propriétés du composant
  getProperties(columns) {
    return {
      columns: this.getColumnsProperties(columns),
      disabled: this.props.disabled,
      displayMode: this.props.displayMode,
      displayStats: this.props.displayStats,
      pagerCount: this.props.pagerCount,
      pagerPivot: this.props.pagerPivot,
      primaryKey: this.props.primaryKey,
      searchable: this.props.searchable,
      selectionMode: this.props.selectionMode,
    };
  }

  getData(page = this.props.page, pageSize = this.props.pageSize, sort = [], filter = []) {
    // On obtient les données depuis la source de données
    this.props.getData(
      this.state.uid,
      this.props.dataSource,
      page,
      pageSize,
      sort,
      filter,
    );
  }

  getCells(row, pk, line) {
    // Pour chaque colonne
    const cells = React.Children.map(this.state.columns, (column, index) => {

      const { data, ...props } = column.props;

      let value = null;

      switch (column.type.displayName) {
        case Data.displayName:
          value = row[data];
          break;

        case Action.displayName:
        case Menu.displayName: {
          value = React.cloneElement(column, {
            ...column.props,
            linkExtraArguments: {
              primaryKey: pk,
              line,
            },
          });
          break;
        }
        default:
      }

      return (
        <Td
          key={index + 1}
          pk={pk}
          line={line + 1}
          onItemClick={this.props.onItemClick}
          {...props}
        >
          {value}
        </Td>
      );

    }, this);

    // Si sélection
    if (this.props.selectionMode !== propTypes.Selection.None) {
      // On met la colonne au début des cellules
      cells.unshift(
        <Td key={0} pk={pk} line={line + 1} selector />,
      );
    }

    return cells;
  }

  getRows() {
    const { selectionMode } = this.props;
    // On récupère la grille en cours
    const grid = this.props.grids[this.state.uid];

    // Si il existe et qu'il y a des données
    if (grid !== undefined && grid.data.length !== 0) {
      // Pour chaque ligne de donnée
      return grid.data.map((row, index) => {
        // On récupère la valeur de la clé primaire
        const pk = row[this.props.primaryKey].toString();
        // On créé une ligne de cellules
        const cells = this.getCells(row, pk, index);

        return <Row key={index} pk={pk} selectionMode={selectionMode}>{cells}</Row>;
      }, this);
    }

    return null;
  }

  getLoader() {
    // On récupère l'état
    const grid = this.state.grid;
    const databoundState = (grid === null) ? propTypes.DataboundState.Wait : this.state.grid.state.databound;

    if (databoundState === propTypes.DataboundState.Error) {
      return (
        <Status
          code={grid.state.error.status}
          message={grid.state.error.message}
          container="Component"
        />
      );
    }

    return (
      <Loader
        display={databoundState !== propTypes.DataboundState.Loaded ? 'Show' : 'Hide'}
      />
    );
  }

  getDataSet() {
    const { t, styles, width, classNameHeader } = this.props;
    // On récupère la grille en cours
    const grid = this.props.grids[this.state.uid];

    // Si il existe et qu'il y a des données
    if (grid !== undefined) {
      if (grid.data.length !== 0) {
        return (
          <table width={width} className={styles.dataset}>
            <Header className={classNameHeader} />
            <tbody>
              { this.getRows() }
            </tbody>
          </table>
        );
      }
      return <div className={styles.hasNoRecord}>{ t('no records') }</div>;
    }

    return null;
  }

  render() {
    const { disabled, styles, className, classNameFilter, classNameHeader, classNameFooter, children, icon, title, searchable, height, width } = this.props;

    const classNames = classnames({
      [styles.grid]: true,
      [styles.isDisabled]: disabled,
      [className]: className !== null,
    });

    const classNamesHeader = classnames({
      [styles.header]: true,
      [styles.hasIcon]: icon !== null,
      [classNameHeader]: classNameHeader !== null,
    });

    const style = {
      width,
      height,
    };

    return (
      <div className={classNames} style={style}>
        <div className={styles.content}>
          <div className={classNamesHeader}>
            { title && <h1 className={styles.title}>{title}</h1> }
            <Filter className={classNameFilter} hasTitle={!!title} />
            { icon && <span className={styles.icon}>{icon}</span> }
          </div>
          { this.getDataSet() }
        </div>
        <Footer className={classNameFooter} />
        <Actions>
          { this.getActions() }
        </Actions>
        { this.getLoader() }
      </div>
    );
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([Columns, Actions]).isRequired,
  className: PropTypesEx.stylx,
  classNameHeader: PropTypesEx.stylx,
  classNameFilter: PropTypesEx.stylx,
  classNameFooter: PropTypesEx.stylx,
  dataSource: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  displayMode: PropTypesEx.oneOf(propTypes.DisplayMode),
  displayStats: PropTypes.bool,
  height: PropTypesEx.size,
  icon: PropTypes.element,
  name: PropTypes.string.isRequired,
  onItemClick: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  pagerCount: PropTypes.number,
  pagerPivot: PropTypes.number,
  primaryKey: PropTypes.string.isRequired,
  searchable: PropTypes.bool,
  selectionMode: PropTypesEx.oneOf(propTypes.Selection),
  title: PropTypes.string,
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  classNameHeader: null,
  classNameFilter: null,
  classNameFooter: null,
  disabled: false,
  displayMode: propTypes.DisplayMode.All,
  displayStats: true,
  height: null,
  icon: null,
  name: null,
  onItemClick: null,
  page: 1,
  pageSize: 15,
  pagerCount: 5,
  pagerPivot: 3,
  searchable: true,
  selectionMode: propTypes.Selection.None,
  title: null,
  width: null,
};

Container.childContextTypes = {
  uid: PropTypes.string,
  disabled: PropTypes.bool,
};

Container.displayName = 'Grid';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
  connect(models, actions),
)(Container);
