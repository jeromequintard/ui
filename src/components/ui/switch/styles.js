import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    height: 20,
    padding: 2,
  };

  const state = (type, ltype) => `
    .with${type} .checkbox:checked + LABEL {
      background-color: ${scheme.palette.accents[ltype].color.N};
    }

    .with${type} .checkbox:checked + LABEL {
      background-color: ${scheme.palette.accents[ltype].color.N};
    }

    .with${type} .checkbox:checked + LABEL:before {
      color: ${scheme.palette.accents[ltype].alt.N};
    }
  `;

  const states = () => ['Primary', 'Info', 'Success', 'Warning', 'Critical'].map(type => state(type, type.toLowerCase())).join('\n');

  const size = settings.height - (settings.padding * 2);

  return Stylx.set(`

    .switch {
      overflow: hidden;
      display: inline-block;
    }

    .switch .checkbox {
      position: absolute;
      margin-left: -999px;
      visibility: hidden;
    }

      .switch .checkbox:checked + LABEL:before {
        content: 'I';
        left: 0;
      }

      .switch .checkbox:checked + LABEL:after {
        margin-left: ${settings.height - (settings.padding * 2)}px;
        content: '';
      }

    .switch > LABEL {
      position: relative;
      width: ${(size * 2) + (settings.padding * 2)}px;
      height: ${settings.height}px;
      cursor: pointer;
      background-color: ${scheme.ui.input.alt.backcolor};
      border-radius: ${settings.height}px;
      padding: ${settings.padding}px;
      transition:all 200ms ease;
      display: inline-block;
      box-sizing: border-box;
    }        

      .switch > LABEL:before {
        content: '0';
        position: absolute;
        left: ${size}px;
        top: 0;
        width: ${size}px;
        height: ${size}px;
        line-height: ${size}px;
        text-align: center;
        color: ${scheme.ui.input.alt.forecolor};
        font-family: ${scheme.ui.input.alt.font.family};
        font-size: ${scheme.font.size.extrasmall}px;
        font-weight: ${scheme.font.weight.bold};
        transition: all 200ms ease;
        display: block;
        margin: 2px;
      }

      .switch > LABEL:after {
        content : '';
        text-align: center;
        left: 0;
        top: 0;
        width: ${size}px;
        height: ${size}px;
        background-color: ${scheme.ui.canvas.face.backcolor};
        border-radius: ${size}px;
        transition: all 200ms ease;
        display: block;
      }

      .switch:hover > LABEL {
        background-color: ${scheme.ui.input.hover.backcolor};
      }

      .switch:active > LABEL {
        background-color: ${scheme.ui.input.alt.backcolor};
      }

    .isDisabled {
      pointer-events: none;
      cursor: default;
    }

      .isDisabled > LABEL {
        background-color: ${scheme.ui.input.disabled.backcolor};
      }

        .isDisabled > LABEL:before {
          color: ${scheme.ui.input.disabled.forecolor};
        }

    .hasHiddenLabel > LABEL:before {
      display: none;
    }

    ${states()}
  `);
}
