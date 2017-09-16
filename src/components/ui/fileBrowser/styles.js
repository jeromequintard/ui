import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = { };

  return Stylx.set(`
    .fileBrowser {
      position: relative;
    }

    .isDisabled {
      cursor: initial;
    }

    .table {

    }

      .table > THEAD > TR {
        ${Styles.colors(scheme.ui.grid.header)};
        ${Styles.font(scheme.ui.grid.header)};
      }

      .table > THEAD > TR > TH {
        ${Styles.border(scheme.ui.grid.header, { right: true })};
        line-height: 30px;
        text-align: left;
        padding: 0 10px;
        white-space: nowrap;
      }
    
      .table .icon {
        width: 30px;
        border-right: none;
        padding-right: 0;
      }

      .table .fileName {

      }

      .table .size {
        width: 80px;
        text-align: right;
      }

      .table .date {
        width: 150px;
        border-right: none;
        text-align: right;
      }

    .input {
      position: relative;
      display: inline-block;
    }

      .input > INPUT {
        background-color: ${scheme.ui.input.normal.backcolor};
        ${Styles.border(scheme.ui.input.normal)};
        width: 100%;
        padding: 5px 30px 5px 5px;
        line-height: 20px;
      }

        .input > INPUT:focus {
          outline: none;
        }

      .input .button {
        position: absolute;
        top: 0;
        right: 0;        
        margin: 5px;
        padding: 0 2px;
        height: 17px;
        width: 16px;
      }

    .noContent {
      text-align: center;
      color: ${scheme.ui.input.normal.forecolor};
      ${Styles.font(scheme.ui.input.normal)};
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;      
    }

    .isDisabled .input > INPUT {
      background-color: ${scheme.ui.input.disabled.backcolor};
      color: ${scheme.ui.input.disabled.forecolor};
      ${Styles.font(scheme.ui.input.disabled)};
      ${Styles.border(scheme.ui.input.disabled)};
    }

      .isDisabled .input .button {
        display: none;
      }

    .isDisabled .input > INPUT::-webkit-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }
    
    .isDisabled .input > INPUT::-moz-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
      opacity:  1;
    }

    .isDisabled .input > INPUT:-ms-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }

    .isDisabled .input > INPUT::-ms-input-placeholder {
      color: ${scheme.ui.input.disabled.forecolor};
    }

    .items {
      background-color: ${scheme.ui.input.normal.backcolor};
      ${Styles.border(scheme.ui.input.normal)};
      position: absolute;
      padding: 40px;
      margin-top: -1px;
      z-index: 10000;
      visibility: hidden;
      transition: all 200ms;
      transform: translateY(5px); 
      opacity: 0;
    }

      .isOpened .items {
        transform: translateY(0); 
        opacity: 1;
        visibility: visible;
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

      .hasError .tooltip {
        color: ${scheme.ui.input.active.forecolor};
        ${Styles.font(scheme.ui.input.active)};
        transform: translate3d(0, 0, 0);
        transition: all 200ms;
        opacity: 1;
        color: ${scheme.ui.input.error.forecolor};
        ${Styles.font(scheme.ui.input.error)};
      }

  `);
}
