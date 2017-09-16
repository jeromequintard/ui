import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  PropTypesEx,
  classnames,
  getOid,
  newGUID,
} from 'osiki-core';

import Tag from 'components/ui/tag';
import Theme from 'components/core/theme';
import Translation from 'components/core/translation';
import Validator from 'components/core/validator';

import manifest from 'manifest.json';

import * as propTypesTag from 'components/ui/tag/types';
import locales from './locale.json';
import csstyles from './styles.js';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tags: null,
      inputHasValue: false,
      inputValue: '',
      error: null,
      selectedTagId: null,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeleteTagRequest = this.onDeleteTagRequest.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onTagSelected = this.onTagSelected.bind(this);
    this.onCSSTransitionEnd = this.onCSSTransitionEnd.bind(this);
  }

  componentWillMount() {
    this.toObject(this.props.value);
    this.props.validator.componentMount(this, this.props.value);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // this.toObject(nextProps.value);
  }

  componentDidMount() {
    this.tags.addEventListener('transitionend', this.onCSSTransitionEnd);
    this.updateInputSize();
  }

  componentDidUpdate() {
    this.updateInputSize();
  }

  componentWillUnmount() {
    this.tags.removeEventListener('transitionend', this.onCSSTransitionEnd);
    this.props.validator.componentUnmount(this);
  }

  onCSSTransitionEnd() {
    this.updateInputSize();
  }

  // Converti les objets en string
  toString(tags) {
    return tags.map((tag) => {
      return tag.tag;
    });
  }

  // Converti les string en objet
  toObject(tags) {
    // On converti le tableau de string en
    // un tableau d'objet avec un GUID
    this.setState({
      tags: Object.assign(
        tags.map((tag) => {
          return typeof tag === 'object' ? tag : {
            tag,
            id: newGUID(5),
          };
        }),
        this.state.tags,
      ),
    });
  }

  onKeyDown(e) {
    const { maximumChars } = this.props;
    const { inputValue } = this.state;

    switch (e.key) {
      case 'Backspace':
        if (this.props.removeWithBackspace && !this.state.inputHasValue) this.removeLastTag();
        break;
      case 'Enter':
        this.tryToAddTag();
        // Stop la propagation, empêche la soumission d'un formulaire
        if (this.props.stopEnterBubble) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 'Space':
        if (this.props.addWithSpace) this.tryToAddTag();
        break;
      default:
        if (maximumChars !== 0 && (inputValue.length >= maximumChars)) {
          e.preventDefault();
          return false;
        }
    }
    return true;
  }

  onTagSelected(id, e) {
    if (this.props.onTagSelected !== null) this.props.onTagSelected(id, e);
  }

  // Au focus sur le contrôle, on met le focus
  // sur l'input
  onFocus(e) {
    this.input.focus();
  }

  onBlur(e) {
    this.tryToAddTag();
  }

  onDeleteTagRequest(id, e) {
    const index = this.getTagIndexById(id);
    if (index !== -1) this.removeTag(index);
  }

  // En lève le dernier tag avec la touche backspace
  removeLastTag() {
    const tags = this.state.tags;
    const length = tags.length;
    if (length !== 0) this.removeTag(length - 1);
  }

  // Enlève un tag du tableau
  removeTag(index) {
    if (!this.props.locked) {
      const tags = this.state.tags;
      tags.splice(index, 1);
      this.setState({ tags }, this.onTagsChange);
    }
  }

  // Tente d'ajouter un tag
  tryToAddTag() {
    const { inputHasValue, inputValue, tags } = this.state;
    const { t, maximumTags, allowDuplicates } = this.props;

    const arrTags = tags;

    if (inputHasValue) {
      // Peux t'on encore ajouter un tag
      if (maximumTags === 0 || (tags.length < maximumTags)) {
        // Si l'on autorise pas les dupliqué ?
        if (allowDuplicates || (!allowDuplicates && this.getTagIndexByTag(inputValue.trim()) === -1)) {
          arrTags.push({
            tag: inputValue.trim(),
            id: newGUID(5),
          });

          this.setState({
            tags: arrTags,
          }, this.onTagsChange);
        } else {
          this.setState({ error: t('This tag allready exist') });
        }
      } else {
        this.setState({ error: t('Maximum tags reached') });
      }

      this.setState({
        inputValue: '',
        inputHasValue: false,
      });
    }
  }

  onChange(e) {
    let value = e.target.value;
    value = this.props.allowSpaces ? value.trimLeft() : value.trim();

    this.setState({
      error: null,
      inputHasValue: !!value,
      inputValue: value,
    });
  }

  onTagsChange() {
    const { tags } = this.state;
    this.props.validator.setValue(this.toString(tags));
    // On renvoi la nouvelle valeur
    if (this.props.onChange) {
      this.props.onChange(this.props.name, tags);
    }
  }

  // Retourne l'index d'un tag par son id
  getTagIndexById(id) {
    return this.state.tags.findIndex((el) => {
      return el.id === id;
    });
  }

  // Retourne l'index d'un tag par son libellé
  getTagIndexByTag(tag) {
    return this.state.tags.findIndex((el) => {
      return el.tag === tag;
    });
  }

  // Liste les tags
  getTags() {
    return this.state.tags.map((tag) => {
      return (
        <Tag
          key={tag.id}
          onDelete={this.onDeleteTagRequest}
          id={tag.id}
          locked={this.props.locked}
          disabled={this.props.disabled}
          onSelected={this.onTagSelected}
          align={this.props.align}
          display={this.props.display}
        >
          {tag.tag.trim()}
        </Tag>
      );
    });
  }

  updateInputSize() {
    if (this.container !== undefined && this.input !== undefined) {
      const nodes = this.container.childNodes;
      if (nodes.length >= 2) {
        // On récupère le dernier tag
        const lastTag = nodes[nodes.length - 2];
        // Position du bord par rapport à la gauche du container
        const offsetRight = lastTag.offsetLeft + lastTag.offsetWidth;
        // On obtient la largeur du container (hors padding)
        const containerWidth = this.container.clientWidth - 5;
        // Longueur de l'input
        const inputWidth = containerWidth - offsetRight - 5;
        // On définit la largeur de l'input
        this.input.style.width = ((inputWidth < 30) ? containerWidth : inputWidth) + 'px';
      }
    }
  }

  render() {
    const { styles, className, locked, name, width, height, disabled } = this.props;
    const { inputValue, error } = this.state;

    // On récupère l'éventuel message d'erreur
    const errorMessage = this.props.validator.getErrorMessage() || error;

    const classNames = classnames({
      [styles.tags]: true,
      [styles.isDisabled]: disabled,
      [styles.isLocked]: locked,
      [styles.hasError]: error,
      [className]: className !== null,
    });

    return (
      <div
        className={classNames}
        style={{ width }}
        ref={(ref) => { this.tags = ref; }}
      >
        <div
          className={styles.container}
          ref={(ref) => { this.container = ref; }}
          style={{ minHeight: height }}
          onClick={this.onFocus}
        >
          {this.getTags()}
          <input
            className={styles.input}
            type="text"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
            autoComplete="off"
            value={inputValue}
            ref={(e) => { this.input = e; }}
          />
        </div>
        { errorMessage && <span>{errorMessage}</span>}
      </div>
    );
  }

};

Container.propTypes = {
  addWithSpace: PropTypes.bool,
  align: PropTypesEx.oneOf(propTypesTag.Align),
  allowDuplicates: PropTypes.bool,
  allowSpaces: PropTypes.bool,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  display: PropTypesEx.oneOf(propTypesTag.Display),
  height: PropTypesEx.size,
  locked: PropTypes.bool,
  maximumChars: PropTypes.number,
  maximumTags: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onTagSelected: PropTypes.func,
  removeWithBackspace: PropTypes.bool,
  stopEnterBubble: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string),
  width: PropTypesEx.size,
};

Container.defaultProps = {
  addWithSpace: false,
  align: propTypesTag.Align.Center,
  allowDuplicates: true,
  allowSpaces: true,
  className: null,
  disabled: false,
  display: propTypesTag.Display.Follow,
  height: null,
  locked: false,
  maximumChars: 20,
  maximumTags: 0,
  onChange: null,
  onTagSelected: null,
  removeWithBackspace: true,
  stopEnterBubble: true,
  value: [],
  width: '300px',
};

Container.displayName = 'Tags';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
  Translation(locales, cid),
  Validator,
)(Container);
