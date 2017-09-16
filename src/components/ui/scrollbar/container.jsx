import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { classnames, PropTypesEx, getOid } from 'osiki-core';

import Theme from 'components/core/theme';

import manifest from 'manifest.json';

import csstyles from './styles';

const Container = class Container extends Component {

  constructor(props) {
    super(props);

    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onContentMouseEnter = this.onContentMouseEnter.bind(this);
    this.onContentMouseLeave = this.onContentMouseLeave.bind(this);
    this.onTrackMouseEnter = this.onTrackMouseEnter.bind(this);
    this.onTrackMouseLeave = this.onTrackMouseLeave.bind(this);
    this.onTrackMouseDown = this.onTrackMouseDown.bind(this);
    this.onThumbMouseDown = this.onThumbMouseDown.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.content = null;
    this.track = null;
    this.thumb = null;

    this.timeoutHandle = null;
    this.dragging = false;
    this.currentTop = 0;
  }

  componentDidMount() {
    this.updateThumb();
  }

  componentDidUpdate() {
    this.updateThumb();
  }

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onDragEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onDragEnd);
    clearTimeout(this.timeoutHandle);
  }

  onContentMouseEnter() {
    this.display();
  }

  onContentMouseLeave() {
    this.hide();
  }

  onTrackMouseEnter() {
    this.display();
  }

  onTrackMouseLeave() {
    this.hide();
  }

  display() {
    if (this.props.autoHide) {
      clearTimeout(this.timeoutHandle);
      this.track.style.opacity = 1;
    }
  }

  hide() {
    if (this.props.autoHide && !this.dragging) {
      clearTimeout(this.timeoutHandle);
      // On créé un timeout qui remet l'opacité à 0
      this.timeoutHandle = setTimeout(() => {
        if (this.track !== undefined) {
          this.track.style.opacity = 0;
        }
      }, this.props.autoHideTimeout);
    }
  }

  getScrollOffset(position) {
    const { scrollHeight, clientHeight } = this.content;

    // On récupère la hauteur de la scrollbar et du thumb
    const trackHeight = this.track.clientHeight;
    const thumbHeight = this.thumbHeight();

    // On définit le nouvelle position
    return (position / (trackHeight - thumbHeight)) * (scrollHeight - clientHeight);
  }

  // Lorsque l'on clic sur la scrollbar
  onTrackMouseDown(e) {
    const { target, clientY } = e;
    // On récupère la position du clic
    const { top } = target.getBoundingClientRect();
    // On obtient la taille du thumb pour obtenir le point milieu
    const thumbHeight = this.thumbHeight();
    // On définit la position relative
    const offset = Math.abs(top - clientY) - (thumbHeight / 2);
    // On scroll à cette position
    this.content.scrollTop = this.getScrollOffset(offset);
    e.preventDefault();
  }

  onDragStart(e) {
    this.dragging = true;
    event.stopImmediatePropagation();
  }

  onDrag(e) {
    if (this.dragging && this.currentTop !== 0) {
      const { clientY } = e;
      // On récupère la position du clic
      const { top } = this.track.getBoundingClientRect();
      // On obtient la taille du thumb
      const thumbHeight = this.thumbHeight();
      // On définit la position relative
      const thumbTop = thumbHeight - this.currentTop;
      // On définit la nouvelle position relative
      const offset = (-top + clientY) - thumbTop;

      this.content.scrollTop = this.getScrollOffset(offset);
    }
    return false;
  }

  onDragEnd() {
    this.dragging = false;
    this.currentTop = 0;
  }

  onThumbMouseDown(e) {
    const { target, clientY } = e;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();

    this.onDragStart(e);
    // On obtient la position relative actuelle
    this.currentTop = offsetHeight - (clientY - top);
    e.preventDefault();
  }

  onWindowResize() {
    this.updateThumb();
  }

  onScroll() {
    this.updateThumb();
  }

  // Renvoi la hauteur du thumb
  thumbHeight() {
    const { thumbMinHeight } = this.props;
    const { scrollHeight, clientHeight } = this.content;
    // On récupère la hauteur de la scrollbar
    const trackHeight = this.track.clientHeight;
    // On calcul la hauteur du thumb au ratio des différentes hauteurs
    const thumbHeight = Math.ceil((clientHeight / scrollHeight) * trackHeight);
    // On retourne la hauteur la plus prêt du mini
    // définit pour le thumb
    return Math.max(thumbHeight, thumbMinHeight);
  }

  // Mets à jour la position du thumb dans la scrollbar
  updateThumb() {
    if (!this.props.disabled) {
      const { scrollTop, scrollHeight, clientHeight } = this.values;

      // On récupère la hauteur de la scrollbar et du thumb
      const trackHeight = this.track.clientHeight;
      const thumbHeight = this.thumbHeight();

      // On calcul la hauteur du thumb
      const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight);

      // On change la hauteur et la position du thumb
      this.thumb.style.height = `${thumbHeight}px`;
      this.thumb.style.transform = `translateY(${thumbTop}px)`;

      // On cache la scrollbar si aucun scrolling
      this.track.style.visibility = scrollHeight > clientHeight ? 'visible' : 'hidden';

      // On détermine la taille de la scrollbar (en partant du principe quelle est identique
      // en hauteur et en largeur). Cette taille évolue en fonction du l'OS, du thème de l'OS
      // du navigateur ou du thème du navigateur
      const scrollbarSize = this.content.offsetWidth - this.content.clientWidth;

      // On déplace la marge de droite et du bas pour faire
      // disparaître les scrollbar
      this.content.style.marginRight = `-${scrollbarSize}px`;
      this.content.style.marginBottom = `-${scrollbarSize}px`;
    }
  }

  get values() {
    if (this.content === null) return null;

    const { scrollTop, scrollHeight, clientHeight } = this.content;

    return {
      top: (scrollTop / (scrollHeight - clientHeight)) || 0,
      scrollTop,
      scrollHeight,
      clientHeight,
    };
  }

  render() {
    const { styles, className, disabled, trackClassName, height, width, thumbClassName, autoHide, children } = this.props;

    const classNames = classnames({
      [styles.scrollbar]: true,
      [styles.hasAutoHide]: autoHide,
      [className]: className !== null,
    });

    if (disabled) {
      return (
        <div className={classNames}>{children}</div>
      );
    }

    return (
      <div
        className={classNames}
        style={{ width, height }}
        ref={(ref) => { this.scrollbar = ref; }}
      >
        <div className={styles.canvas}>
          <div
            ref={(ref) => { this.content = ref; }}
            className={styles.content}
            onScroll={this.onScroll}
            onMouseEnter={this.onContentMouseEnter}
            onMouseLeave={this.onContentMouseLeave}
          >
            {children}
          </div>
        </div>
        <div
          ref={(ref) => { this.track = ref; }}
          className={classnames([styles.track, trackClassName])}
          onMouseEnter={this.onTrackMouseEnter}
          onMouseLeave={this.onTrackMouseLeave}
          onMouseDown={this.onTrackMouseDown}
        >
          <div
            ref={(ref) => { this.thumb = ref; }}
            className={classnames([styles.thumb, thumbClassName])}
            onMouseDown={this.onThumbMouseDown}
          />
        </div>
      </div>
    );
  }
};

Container.propTypes = {
  autoHide: PropTypes.bool,
  autoHideTimeout: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypesEx.stylx,
  disabled: PropTypes.bool,
  height: PropTypesEx.size,
  thumbClassName: PropTypesEx.stylx,
  thumbMinHeight: PropTypes.number.isRequired,
  trackClassName: PropTypesEx.stylx,
  width: PropTypesEx.size,
};

Container.defaultProps = {
  autoHide: true,
  autoHideTimeout: 400,
  className: null,
  disabled: false,
  height: '100%',
  thumbClassName: null,
  thumbMinHeight: 30,
  trackClassName: null,
  width: '100%',
};

Container.displayName = 'Scrollbar';

const cid = getOid(manifest, Container);

export default compose(
  Theme(csstyles, cid),
)(Container);
