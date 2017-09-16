import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  isEqual,
  getFileExtension,
  getFilename,
  newGUID,
} from 'osiki-core';

import Button from 'components/ui/button';
import FileItem from 'components/ui/fileItem';
import Scrollbar from 'components/ui/scrollbar';
import Theme from 'components/core/theme';
import Translation from 'components/core/translation';
import Validator from 'components/core/validator';

import manifest from 'manifest.json';

import * as itemPropTypes from 'components/ui/fileItem/types';
import * as propTypes from './types';

import csstyles from './styles';
import { types, actions } from './actions';
import { models } from './selectors';

import locales from './locale.json';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      currentPath: null,
      files: [],
      selectedFullName: null,
      uid: props.name,
    };

    this.onSelected = this.onSelected.bind(this);
    this.onFolderChange = this.onFolderChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onBrowseClick = this.onBrowseClick.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const p = isEqual(this.props, nextProps);
    const s = isEqual(this.state, nextState);
    return !(p && s);
  }

  componentDidMount() {
    // On charge les données
    this.getData();
  }

  componentWillMount() {
    document.addEventListener('mouseup', this.onClickOutside);
    // Inscription à la validation
    this.props.validator.componentMount(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const model = nextProps.model[this.state.uid];

    if (model !== undefined) {
      switch (model.databound) {
        case propTypes.DataboundState.Loaded:
          this.setState({ files: model.files, currentPath: model.path });
          break;
        case propTypes.DataboundState.Error:
          this.setState({ files: [], currentPath: null, selectedFullName: null });
          break;
        default:
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onClickOutside);
    this.props.validator.componentUnmount(this);
  }

  onDeleteClick(e) {
    this.props.validator.setValue(null);
    this.setState({ selectedFullName: null, currentPath: null });
  }

  onBrowseClick(e) {
    this.setState({ opened: !this.state.opened });
  }

  onClickOutside(e) {
    // Si on click pas sur le composant
    if (!findDOMNode(this.input).contains(e.target)) {
      // On met à jour l'état
      this.setState({ opened: false });
    }
  }

  onFolderChange(fullName, isParent, e) {
    if (isParent) {
      const currentPath = fullName;
      this.setState({ currentPath }, () => {
        this.getData(currentPath);
      });
    } else {
      this.getData(fullName);
    }
  }

  onSelected(fullName, e) {
    const { validator, selectionType, onChange, uid } = this.props;
    this.setState({ currentPath: null, selectedFullName: fullName, opened: false });
    this.props.validator.setValue(fullName);
    if (onChange !==  null) onChange(uid, fullName);
  }

  getParentPath(path) {
    const arrPath = path.split('\\');
    if (arrPath.length >= 2) {
      arrPath.pop();
      // Si on est à la racine du lecteur
      if (arrPath.length === 1) return null;
      return arrPath.join('\\');
    }
    return null;
  }

  getData(path = null) {
    const { disabled, getData, dataSource, selectionType, extensions } = this.props;

    // On obtient les données depuis la source de données
    if (!disabled) {

      getData(
        this.state.uid,
        dataSource,
        path,
        selectionType,
        extensions,
      );
    }
  }

  getItems() {
    const { files, currentPath } = this.state;

    const fileItems = files.map((file) => {
      return this.getFileItem(file);
    });

    const parentPath = this.getParentPath(currentPath);

    if (parentPath !== null) {
      fileItems.unshift(this.getFileItem({
        create: null,
        fullName: parentPath,
        modify: null,
        size: null,
        type: itemPropTypes.Type.Folder,
        isParent: true,
      }));
    }

    return fileItems;
  }

  getFileItem(file) {
    const { view, selectionType } = this.props;

    return (
      <FileItem
        create={file.create !== null ? new Date(file.create) : null}
        fullName={file.fullName}
        key={newGUID(5)}
        modify={file.modify !== null ? new Date(file.modify) : null}
        onFolderChange={this.onFolderChange}
        onSelected={this.onSelected}
        size={file.size}
        type={file.type}
        view={view}
        isParent={file.isParent}
        selectionType={selectionType}
      />
    );
  }

  renderItems() {
    const { t, view, styles, disabled } = this.props;
    const { opened } = this.state;

    if (disabled || !opened) return null;

    const items = this.getItems();

    if (items.length === 0) {
      return <div className={styles.noContent}>{t('No content in this path')}</div>;
    }

    if (view === itemPropTypes.View.Icon) {
      return (
        <Scrollbar>
          <ul>{ items }</ul>
        </Scrollbar>
      );
    }

    return (
      <Scrollbar>
        <table className={styles.table} width="100%">
          <thead>
            <tr>
              <th className={styles.icon} />
              <th className={styles.fileName}>{t('Filename') }</th>
              <th className={styles.size}>{t('Size') }</th>
              <th className={styles.date}>{t('Date') }</th>
            </tr>
          </thead>
          <tbody>
            { items }
          </tbody>
        </table>
      </Scrollbar>
    );
  }

  renderButtons() {
    const { styles, disabled } = this.props;
    const { files, selectedFullName } = this.state;

    if (disabled) return null;

    if (selectedFullName !== null) {
      return (
        <Button
          size="Small"
          status="Critical"
          className={styles.button}
          onClick={this.onDeleteClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <path fill="#FFFFFF" d="M6 0C2.7 0 0 2.7 0 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm3 8L8 9 6 7 4 9 3 8l2-2-2-2 1-1 2 2 2-2 1 1-2 2 2 2z" />
          </svg>
        </Button>
      );
    }

    return (
      <Button
        size="Small"
        status="Primary"
        className={styles.button}
        onClick={this.onBrowseClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
          <path fill="#FFFFFF" d="M0 10.3c0 1 .7 1.7 1.6 1.7h10.8c1 0 1.6-.8 1.6-1.7v-7c0-1-.7-1.6-1.6-1.6h-6L5 0H1.5C.6 0 0 .8 0 1.7v8.6z" />
        </svg>
      </Button>
    );
  }

  render() {
    const { t, styles, className, disabled, view, width, height, selectionType, browserWidth, browserHeight, name } = this.props;
    const { selectedFullName, opened, displayFormErrors, uid } = this.state;

    // On récupère l'éventuel message d'erreur
    const errorMessage = (this.props.model[uid] !== undefined && this.props.model[uid].error) ||
                         this.props.validator.getErrorMessage();

    // Définit si l'on affiche l'erreur
    const hasError = errorMessage != null // Si il y un message d'erreur
                     && (selectedFullName !== null // Ou qu'il n'y'a pas valeur
                     || displayFormErrors); // Ou que l'on doit afficher les erreurs du formulaire

    // On affiche le placeholder ou le message d'erreur
    const tooltip = (hasError) ? errorMessage : null;

    let placeholder = this.props.placeholder;
    if (placeholder === null) placeholder = selectionType === itemPropTypes.SelectionType.File ? t('Select a file') : t('Select a folder');

    const classNames = classnames({
      [styles.fileBrowser]: true,
      [styles.isOpened]: opened,
      [styles.isDisabled]: disabled,
      [styles.hasError]: hasError,
      [className]: className !== null,
    });

    const style = {
      width,
    };

    const browserStyle = {
      width: browserWidth,
      height: browserHeight,
    };

    return (
      <div
        className={classNames}
      >
        <div
          className={styles.input}
          style={style}
          ref={(ref) => { this.input = ref; }}
        >
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            readOnly
            value={getFilename(selectedFullName)}
          />
          { this.renderButtons() }
        </div>
        <div className={styles.items} style={browserStyle}>
          {this.renderItems()}
        </div>
        <span className={styles.tooltip}>{ tooltip }</span>
      </div>
    );
  }
};

Container.propTypes = {
  browserHeight: PropTypesEx.size,
  browserWidth: PropTypesEx.size,
  className: PropTypesEx.stylx,
  dataSource: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  extensions: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  selectionType: PropTypesEx.oneOf(itemPropTypes.SelectionType),
  view: PropTypesEx.oneOf(itemPropTypes.View),
  width: PropTypesEx.size,
};

Container.defaultProps = {
  className: null,
  disabled: false,
  extensions: [],
  view: itemPropTypes.View.List,
  onChange: null,
  placeholder: null,
  selectionType: itemPropTypes.SelectionType.File,
  width: null,
  browserWidth: '700px',
  browserHeight: '300px',
};

Container.displayName = 'FileBrowser';

const cid = getOid(manifest, Container);

export default compose(
  Translation(locales, cid),
  Theme(csstyles, cid),
  Validator,
  connect(models, actions),
)(Container);
