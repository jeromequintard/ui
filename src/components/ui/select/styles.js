import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .select {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      user-select: none;
    }

      .select:hover .label:after {
        color: ${scheme.ui.input.tooltipHover.forecolor};
      }

    .dropdown {
      background-color: ${scheme.ui.input.normal.backcolor};
      margin-top: 30px;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      transform: scale3d(1,0,1);
      transform-origin: 50% 0%;
      transition: transform 0.15s;
      z-index: 1000;
      ${Styles.border(scheme.ui.input.normal, { right: true, bottom: true, left: true })};
      box-sizing: border-box;
    }

    .label {
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      color: ${scheme.ui.input.placeholder.forecolor};
      ${Styles.font(scheme.ui.input.placeholder)};
      cursor: pointer;
      box-sizing: border-box;
      position: relative;
      width: 100%;
      ${Styles.border(scheme.ui.input.normal)};
      padding: 5px 35px 5px 10px;
    }

      .label:after {
        font-family: 'osiki';
        speak: none;
        content: '\\e903';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${scheme.ui.input.tooltip.forecolor};
        backface-visibility: hidden;
        right: 0;
        margin-right: 10px;
        position: absolute;
        transition: all 200ms;
      }

    .search {
      position: relative;
      margin-top: -1px;
      margin-bottom: 1px;
      ${Styles.border(scheme.ui.input.normal, { top: true, bottom: true })};
      background-color: ${scheme.ui.input.normal.backcolor};
      display: block;
    }

    .options {
      width: 100%;
      opacity: 1;
      visibility: visible;
      z-index: 10000;
      pointer-events: none;
      margin-top: -1px;
    }

    .option {
      opacity: 0;
      transform: translate3d(0,-25px,0);
      transition: transform 0.15s, opacity 0.15s;
    }

    .isOpened .label:after {
      transform: rotate(180deg);
    }

    .isOpened .dropdown {
      transform: scale3d(1,1,1);
      transition: none;
      animation: expand 0.15s ease-out;
    }

    .isOpened .options {
      pointer-events: auto;
    }

    .isOpened .option {
      transform: translate3d(0,0,0);
      opacity: 1;
    }

    .isReadonly,
    .isDisabled {
      pointer-events: none;
      cursor: default;
    }

      .isDisabled .label {
        border-color: ${scheme.ui.input.disabled.border.color};
        ${Styles.colors(scheme.ui.input.disabled)};
      }

      .isReadonly .label:after,
      .isDisabled .label:after {
        color: ${scheme.ui.input.disabled.forecolor};
      }

    @keyframes expand { 
      0% { transform: scale3d(1,0,1); }
      50% { transform: scale3d(1,0.9,1); }
      100% { transform: scale3d(1,1,1); }
    }

  `);
}
