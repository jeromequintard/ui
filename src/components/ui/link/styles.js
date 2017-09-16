import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  const state = (type, ltype) => `
    .with${type}:before {
      background-color: ${scheme.palette.accents[ltype].color.N};
    }

    .with${type}:after {
      color: ${scheme.palette.accents[ltype].alt.N};
    }
  `;

  const states = () => ['Primary', 'Info', 'Success', 'Warning', 'Critical'].map(type => state(type, type.toLowerCase())).join('\n');

  return Stylx.set(`

    .link {
      ${Styles.font(scheme.ui.input.normal)};
      color: ${scheme.ui.input.normal.forecolor};
      line-height: 20px;
      display: inline-block;
      position: relative;
      transition: opacity 400ms;
      outline: none;
      cursor: pointer;
    }
    
      .link.withIcon:before {
        position: absolute;
        z-index: 1;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 0;
        margin-top: -10px;
        border-radius: 50%;
        content: '';
      }

      .link.withIcon:after {
        position: absolute;
        z-index: 10;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 0;
        margin-top: -5px;
        font-size: ${scheme.font.size.extraSmall};
        text-align: center;
      }

      .link:hover {
        transition: opacity 400ms;
        ${Styles.font(scheme.ui.input.hover)};
        color: ${scheme.ui.input.hover.forecolor};
      }

      .withIcon {
        padding-left: 26px;
      }

      .isDisabled {
        ${Styles.font(scheme.ui.input.disabled)};
        color: ${scheme.ui.input.disabled.forecolor};
        pointer-events: none;
        cursor: default; 
      }

        .withIcon.isDisabled:after {
          color: ${scheme.ui.input.disabled.forecolor};
        }    

        .withIcon.isDisabled:before {
          background-color: ${scheme.ui.input.disabled.backcolor};
        }

      ${states()}

  `);
}
