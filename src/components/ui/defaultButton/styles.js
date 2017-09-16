import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    size: 120,
  };

  const state = (type, ltype) => `
    .with${type} {
      background-color: ${scheme.palette.accents[ltype].color.N};
    }

    .with${type}:after {
      color: ${scheme.palette.accents[ltype].alt.N};
    }

    .with${type}:hover {
      background-color: ${scheme.palette.accents[ltype].color.L1};
    }            

    .with${type}:active {
      background-color: ${scheme.palette.accents[ltype].color.D1};
    }
  `;

  const states = () => ['Primary', 'Info', 'Success', 'Warning', 'Critical'].map(type => state(type, type.toLowerCase())).join('\n');

  return Stylx.set(`

    .defaultButton {
      width: ${settings.size}px;
      height: ${settings.size}px;
      line-height: ${settings.size}px;
      border-radius: ${settings.size}px;
      padding: 0;
      border: none;
      position: relative;
      outline: none;
      transition: all 400ms;
      cursor: pointer;
      overflow: hidden;
      text-indent: -999px;
    }

      .defaultButton:before {
        position: absolute;
        z-index: 1;
        width: ${settings.size}px;
        height: ${settings.size}px;
        content: '';
        top: 0;
        right: 0;
        border-radius: 50%;
        transition: all 400ms ease;
      }

      .defaultButton:after {
        position: absolute;
        z-index: 2;
        width: ${settings.size}px;
        height: 100%;
        top: 0;
        right: 0;
        font-size: ${settings.size / 2}px;
        line-height: ${settings.size}px;
        backface-visibility: hidden;
        text-indent: 0;
      }

      .isDisabled {
        cursor: initial;
        ${Styles.colors(scheme.ui.input.disabled)};
      }

      ${states()}

  `);
}
