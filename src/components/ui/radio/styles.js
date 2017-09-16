import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .radio {
      height: 20px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      user-select: none;
    }

      .radio:hover .label:after {
        color: ${scheme.ui.input.tooltipHover.forecolor};
      }

      .label {
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: text-indent 0.3s, opacity 0.3s;
        display: block;
        color: ${scheme.ui.input.placeholder.forecolor};
        ${Styles.font(scheme.ui.input.placeholder)};
        cursor: pointer;
        padding-right: 20px;
        position: relative;
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
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

      .options {
        background-color: ${scheme.ui.input.normal.backcolor};
        box-shadow: ${scheme.ui.input.normal.border.color} 0px 1px 4px, ${scheme.ui.input.normal.border.color} 0px 1px 4px;
        padding: 0;
        position: absolute;
        width: auto;
        left: 0;
        visibility: hidden;
        z-index: 10000;
        transition: all 0.2s;
        overflow: hidden;
      }

        .option {
          opacity: 0;
          transform: translate3d(15%,0,0);
          transition: transform 0.3s, opacity 0.3s;
        }

      .withHideLabel.isOpened .label {
        text-indent: -999px;
        opacity: 0;
      }

      .isOpened .label:after {
        transform: translate3d(0,-50%,0)
      }

      .isOpened .options {
        visibility: visible;
      }

      .isOpened .option {
        transform: translate3d(0,0,0);
        opacity: 1;
      }
  
      .withOrientationTop .options { 
        bottom: 0;
        transform: translate3d(5%,0,0);
      }

      .withOrientationTop.isOpened .options {
        transform: translate3d(0,0,0);
      }

      .withOrientationMiddle .options { 
        top: 50%;
        transform: translate3d(5%,-50%,0);
      }

      .withOrientationMiddle.isOpened .options {
        transform: translate3d(0,-50%,0);
      }

      .withOrientationBottom .options { 
        top: 0;
        transform: translate3d(5%,0,0);
      }

      .withOrientationBottom.isOpened .options {
        transform: translate3d(0,0,0);
      }

      .isDisabled {
        pointer-events: none;
        cursor: default;
      }

      .isDisabled .label {
        color: ${scheme.ui.input.disabled.forecolor};
      }

      .isDisabled .label:after {
        color: ${scheme.ui.input.disabled.forecolor};
      }

  `);
}
