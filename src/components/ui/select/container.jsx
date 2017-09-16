import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  stripTags,
  isEqual,
  PropTypesEx,
  getOid,
  newGUID,
  Types,
} from 'osiki-core';

import Validator from 'components/core/validator';
import Translation from 'components/core/translation';
import Option from 'components/ui/option';
import Theme from 'components/core/theme';
import Search from 'components/ui/search';

import manifest from 'manifest.json';

import { exceptions } from './exceptions';

import { types, actions } from './actions';
import { models } from './selectors';

import locales from './locale.json';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props, context) {
    super(props, context);

    if (props.dataSource !== null) {
      Types.value(props.dataTextField, 'Property dataTextField is expected with dataSource.').is.string().else.error();
      Types.value(props.dataValueField, 'Property dataValueField is expected with dataSource.').is.string().else.error();
    }

    this.state = {
      opened: false,
      options: null,
      selectedIndex: props.selectedIndex,
      searchText: null,
      uid: props.name,
    };

    this.onClick = this.onClickInside.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    // On charge les données si il y a un datasource
    if (this.props.dataSource !== null) this.getData();
  }

  componentWillMount() {
    this.setOptions(this.props.children);

    document.addEventListener('mouseup', this.onClickOutside);
    // Inscription à la validation
    this.props.validator.componentMount(this);
  }

  // Quand on reçoit de nouvelle propriété
  // si les options sont différentes, on recréé les options
  componentWillReceiveProps(nextProps) {
    let options = null;
    // On récupère le select en cours
    const select = nextProps.selects[this.state.uid];

    if (select !== undefined) {
      // En fonction de l'action en cours
      switch (select.action) {
        case types.GET_DATA_DONE:
          // On obtient les données et on créé
          // les options correspondantes
          options = select.data.map((option, index) => {
            return React.cloneElement(<Option />, {
              index,
              value: option[this.props.dataValueField],
              children: option[this.props.dataTextField],
            });
          });

          // On déclenche un evènement à la réception des données
          if (this.props.onDataBound) this.props.onDataBound(this.state.uid, select.data);

          break;
        case types.GET_DATA_FAILED:
          throw new exceptions.DataSourceException();
        default:
          options = null;
      }
    } else {
      options = nextProps.children;
    }

    if (!isEqual(this.props.children, options)) {
      this.setOptions(options);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
    this.props.validator.componentUnmount(this);
  }

  getData() {
    if (this.props.onDataBinding) this.props.onDataBinding(this.state.uid, this.props.dataSource);
    // On obtient les données depuis la source de données
    this.props.getData(
      this.state.uid,
      this.props.dataSource,
    );
  }

  onClickInside() {
    this.setState({ opened: !this.state.opened });
  }

  onClickOutside(e) {
    // Si on click pas sur le composant
    if (!findDOMNode(this).contains(e.target)) {
      // On met à jour l'état
      this.setState({ opened: false });
    }
  }

  onModelChange(model) {
    const data = Object.entries(model).filter((entry) => {
      return entry[0] === this.props.name;
    });

    if (data.length !== 0) {
      this.setState({ selectedIndex: this.getIndexFromValue(data[0][1]) });
    }
  }

  onItemClick(index) {
    this.triggerChange(index);
  }

  onSearchChange(e) {
    this.setState({
      searchText: e.target.value,
    });

    // Si indiqué on lève l'évènement onSearch
    if (this.props.onSearch) {
      this.props.onSearch(e);
    }
  }

  // Renvoi la valeur courante
  getCurrentValue() {
    return this.getValueFromIndex(this.state.selectedIndex);
  }

  // Retourne l'index de l'option depuis sa valeur
  getIndexFromValue(value) {
    if (value === null || this.state.options === undefined || this.state.options === null) return null;

    return this.state.options.findIndex((option) => {
      return option.props.value === value;
    });
  }

  // Renvoi une clé depuis l'index de l'élément sélectionné
  getKeyFromIndex(index) {
    if (index === null || this.state.options === undefined || this.state.options === null) return null;

    // Si l'index sélectionné est en dehors
    if (index < 0 || index > this.state.options.length) {
      throw new exceptions.SelectedIndexException();
    }

    return stripTags(this.state.options[index].props.children);
  }

  // Renvoi une valeur depuis l'index de l'élément sélectionné
  getValueFromIndex(index) {
    if (index === null) return null;
    // On obtient la valeur
    const value = this.state.options[index].props.value;
    // Si aucune founie on renvoi la clé
    return (value !== undefined) ? value : this.getKeyFromIndex(index);
  }

  // Transforme les options
  setOptions(nodes) {
    // Pour chaque enfant
    const options = React.Children.map(nodes, (option, index) => {
      // On retourne un nouvel item
      return React.cloneElement(option, {
        index,
        value: option.props.value,
        text: stripTags(option.props.children),
        onItemClick: this.onItemClick,
        className: this.props.styles.option.className,
      });
    }, this);

    this.setState(
      {
        options,
      },
      () => {
        // On fixe la valeur dans le validateur
 //       this.props.validator.setValue(this.getCurrentValue());
      },
    );

    return options;
  }

  // En cas d'action
  triggerChange(index) {
    // On récupère la valeur correspondant à l'index
    const value = this.getValueFromIndex(index);
    const key = this.getKeyFromIndex(index);

    // On définit l'état
    this.setState({
      selectedIndex: index,
      opened: false,
    });

    // On informe le validateur
    this.props.validator.setValue(value);

    // On déclenche le onChange
    if (this.props.onChange) {
      this.props.onChange(this.state.uid, key, value, index);
    }
  }

  // Réalise le rendu du libellé
  renderLabel() {
    const { placeholder, t } = this.props;
    const label = (placeholder === null) ? t('Select an item') : placeholder;
    return (this.state.selectedIndex != null) ? this.getKeyFromIndex(this.state.selectedIndex) : label;
  }

  renderSearch() {
    if (this.props.searchable) {
      return (
        <Search
          className={this.props.styles.search.className}
          onChange={this.onSearchChange}
        />
      );
    }
    return null;
  }

  render() {
    const { opened } = this.state;
    const { styles, className, children, placeholder, disabled, readonly, width } = this.props;

    const options = this.state.options;
    const label = this.renderLabel();

    const classNames = classnames({
      [styles.select]: true,
      [styles.isDisabled]: disabled,
      [styles.isReadonly]: readonly,
      [styles.isOpened]: opened,
      [className]: className !== null,
    });

    const style = {
      width,
    };

    return (
      <div className={classNames} placeholder={placeholder} style={style}>
        <label className={styles.label} onClick={this.onClick}>{ label }</label>
        <div className={styles.dropdown}>
          { this.renderSearch() }
          <ul className={styles.options}>{ options }</ul>
        </div>
      </div>
    );
  }
};

Container.propTypes = {
  children: PropTypesEx.oneOfComponent([Option]),
  className: PropTypesEx.stylx,
  dataSource: PropTypes.func,
  dataTextField: PropTypes.string,
  dataValueField: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDataBinding: PropTypes.func,
  onDataBound: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  searchable: PropTypes.bool,
  selectedIndex: PropTypes.number,
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  dataSource: null,
  dataTextField: null,
  dataValueField: null,
  disabled: false,
  name: null,
  onChange: null,
  onDataBinding: null,
  onDataBound: null,
  placeholder: null,
  readonly: false,
  searchable: false,
  selectedIndex: null,
  width: null,
};

Container.displayName = 'Select';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
  Validator,
  connect(models, actions),
)(Container);
