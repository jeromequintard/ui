import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  classnames,
  PropTypesEx,
  getOid,
  bytesToReadableSize,
  isEqual,
  toClasses,
  getFilename,
  getFileExtension,
} from 'osiki-core';

import Theme from 'components/core/theme';
import Translation from 'components/core/translation';
import Button from 'components/ui/button';

import manifest from 'manifest.json';

import * as propTypes from './types';

import csstyles from './styles';

import locales from './locale.json';

const Container = class Container extends Component {

  constructor(props) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onSelected(e) {
    const { onSelected, fullName } = this.props;
    onSelected(fullName, e);
  }

  onDoubleClick(e) {
    const { onFolderChange, onSelected, fullName, isParent, type, selectionType } = this.props;
    if (selectionType === propTypes.SelectionType.File && type === propTypes.Type.File) {
      onSelected(fullName, e);
    } else {
      onFolderChange(fullName, isParent, e);
    }
  }

  getIcon() {
    const { styles, type, view } = this.props;

    if (type === propTypes.Type.Folder) {
      const size = (view === propTypes.View.Icon) ? { width: 76, height: 62 } : { width: 20, height: 20 };
      return (
        <svg key="icon" xmlns="http://www.w3.org/2000/svg" width={size.width} height={size.height} viewBox="0 0 76 62">
          <path fill="#FFCB29" d="M76 53.3c0 4.8-3.8 8.7-8.6 8.7H8.6C3.8 62 0 58 0 53.3v-36c0-4.7 3.8-8.6 8.6-8.6h58.8c4.8 0 8.6 4 8.6 8.7v36z" />
          <path fill="#F99F1B" d="M8.6 8.7h26.8L26.8 0H8.6C3.8 0 0 4 0 8.7v8.7c0-4.8 3.8-8.7 8.6-8.7z" />
        </svg>
      );
    }

    const size = (view === propTypes.View.Icon) ? { width: 50, height: 62 } : { width: 16, height: 20 };

    return ([
      <svg key="icon" xmlns="http://www.w3.org/2000/svg" width={size.width} height={size.height} viewBox="0 0 50 62">
        <path fill="#46A748" d="M7 0C3 0 0 3 0 7v48c0 4 3 7 7 7h36c4 0 7-3 7-7V19L35 0H7z" />
        <path fill="#397F3D" d="M35 12c0 4 3 7 7 7h8L35 0v12z" />
      </svg>,
      this.getExtension(),
    ]);
  }

  getExtension() {
    const { fullName, view, styles } = this.props;
    return (view === propTypes.View.Icon) ? <span key="fileExtension" className={styles.fileExtension}>{getFileExtension(fullName)}</span> : null;
  }

  getSize() {
    const { size } = this.props;
    return (size === null) ? '' : bytesToReadableSize(size);
  }

  getDate() {
    const { modify } = this.props;
    return (modify === null) ? '' : modify.toLocaleDateString() + ' ' + modify.toLocaleTimeString();
  }

  getFilename() {
    const { fullName, isParent } = this.props;
    return !isParent ? getFilename(fullName) : '..';
  }

  getSelect() {
    const { t, styles, selectionType, view, isParent } = this.props;

    if (selectionType === propTypes.SelectionType.File) return null;
    const Tag = (view === propTypes.View.List) ? 'td' : 'div';
    if (isParent || selectionType === propTypes.SelectionType.File) return <Tag key="select" />;
    return <Tag key="select" className={styles.select} onClick={this.onSelected}><Button size="Small">{t('Ok')}</Button></Tag>;
  }

  renderList(props) {
    const { styles, fullName } = this.props;

    return ([
      <td key="icon" className={styles.icon}>{this.getIcon()}</td>,
      <td key="fileName" className={styles.fileName}>{this.getFilename()}</td>,
      <td key="size" className={styles.size}>{this.getSize()}</td>,
      <td key="date" className={styles.date}>{this.getDate()}</td>,
      this.getSelect(),
    ]);
  }

  renderIcon(props) {
    const { styles, fullName } = this.props;
    return ([
      <div key="icon" className={styles.icon}>{this.getIcon()}</div>,
      <div key="fileName" className={styles.fileName}>{this.getFilename()}</div>,
      this.getSelect(),
    ]);
  }

  render() {
    const { styles, className, disabled, type, view } = this.props;

    const classNames = classnames({
      [styles.fileItem]: true,
      [styles.isDisabled]: disabled,
      [styles.isFile]: type === propTypes.Type.File,
      [styles.isFolder]: type === propTypes.Type.Folder,
      [styles.asIcon]: view === propTypes.View.Icon,
      [styles.asList]: view === propTypes.View.List,
      [className]: className !== null,
    });

    const item = (view === propTypes.View.Icon) ? this.renderIcon() : this.renderList();
    const Tag = (view === propTypes.View.Icon) ? 'li' : 'tr';

    return (
      <Tag
        onDoubleClick={this.onDoubleClick}
        className={classNames}
      >
        {item}
      </Tag>
    );


  }
};

Container.propTypes = {
  className: PropTypesEx.stylx,
  create: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  fullName: PropTypes.string,
  isParent: PropTypes.bool,
  modify: PropTypes.instanceOf(Date),
  onFolderChange: PropTypes.func,
  onSelected: PropTypes.func,
  size: PropTypes.number,
  type: PropTypesEx.oneOf(propTypes.Type),
  view: PropTypesEx.oneOf(propTypes.View),
};

Container.defaultProps = {
  className: null,
  create: null,
  disabled: false,
  fullName: null,
  isParent: false,
  modify: null,
  size: null,
  type: null,
  view: propTypes.View.List,
};

Container.displayName = 'FileItem';

const cid = getOid(manifest, Container);

export default compose(
  Translation(locales, cid),
  Theme(csstyles, cid),
)(Container);
