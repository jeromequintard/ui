import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .textinput {
      position: relative;
      display: inline-block;
      vertical-align: top;
    }

    .label {
      width: 100%;
      text-align: left;
      pointer-events: none;
      display: inline-block;
      user-select: none;
    }

    .input {
      width: 100%;
      color: ${scheme.ui.input.normal.forecolor};
      ${Styles.font(scheme.ui.input.normal)};
      position: relative;
      display: block;
      float: right;
      border: none;
      resize: none;
    }

      .input:focus {
        outline: none;
      }

    .tooltip {
      position: relative;
      display: block;
      width: 100%;
      line-height: 24px;
      height: 24px;
      color: ${scheme.ui.input.placeholder.forecolor};
      ${Styles.font(scheme.ui.input.placeholder)};
      transition: all 300ms;
      transform-origin: 0 0;
      transform: translate3d(10px, 0, 0);
      opacity: 0;
    }

    .isUnderline .input {
      height: 24px;
      line-height: 24px;
      background-color: transparent;
      box-shadow: 0 1px 0 ${scheme.ui.input.normal.border.color};
      transition: all 200ms;
    }

      .isUnderline .label {
        height: 24px;
        line-height: 24px;
      }      

        .isUnderline .tooltip {

        }

    .isUnderline.hasValue .input,
    .isUnderline.hasFocus .input {
      box-shadow: 0 2px 0 ${scheme.ui.input.normal.border.color};
    }

    .isUnderline.hasValue .tooltip,
    .isUnderline.hasFocus .tooltip {
      color: ${scheme.ui.input.active.forecolor};
      transform: translate3d(0, 0, 0);
      transition: all 200ms;
      opacity: 1;
    }

    .isUnderline.hasError .tooltip {
      color: ${scheme.ui.input.error.forecolor};
      ${Styles.font(scheme.ui.input.error)};
    }

    .isBoxed .input {
      padding: 5px;
      line-height: 20px;
      background-color: ${scheme.ui.input.normal.backcolor};
      ${Styles.border(scheme.ui.input.normal)};
    }

    .isBoxed.hasError .input {
      ${Styles.border(scheme.ui.input.error)};
    }

    .isBoxed.hasValue.hasError .tooltip,
    .isBoxed.hasFocus.hasError .tooltip {
      color: ${scheme.ui.input.active.forecolor};
      ${Styles.font(scheme.ui.input.active)};
      transform: translate3d(0, 0, 0);
      transition: all 200ms;
      opacity: 1;
    }

    .isBoxed.hasValue.hasError .tooltip,
    .isBoxed.hasFocus.hasError .tooltip {
      color: ${scheme.ui.input.error.forecolor};
      ${Styles.font(scheme.ui.input.error)};
    }

    .isDisabled .input {
      pointer-events: none;
      cursor: default;
      background-color: ${scheme.ui.input.disabled.backcolor};
      ${Styles.font(scheme.ui.input.disabled)};
      ${Styles.border(scheme.ui.input.disabled)};
    }

    .isDisabled .input::-webkit-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }
    
    .isDisabled .input::-moz-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
      opacity:  1;
    }

    .isDisabled .input:-ms-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }

    .isDisabled .input::-ms-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }

  `);
}
