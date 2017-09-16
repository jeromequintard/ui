import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    small: {
      size: 15,
      padding: 5,
      borderWidth: 2,
      borderRadius: 3,
      fontSize: scheme.font.size.extraSmall,
    },
    medium: {
      size: 28,
      padding: 14,
      borderWidth: 2,
      borderRadius: 4,
      fontSize: scheme.font.size.small,
    },
    normal: {
      size: 30,
      padding: 14,
      borderWidth: 3,
      borderRadius: 30,
    },
  };

  const state = (type, ltype) => `
    .with${type} {
      background-color: ${scheme.palette.accents[ltype].color.N};
      border-color: ${scheme.palette.accents[ltype].color.N};
      color: ${scheme.palette.accents[ltype].alt.N};
    }

    .with${type}:after {
      color: ${scheme.palette.accents[ltype].color.N};
    }

    .with${type}:hover {
      background-color: ${scheme.palette.accents[ltype].color.L1};
      border-color: ${scheme.palette.accents[ltype].color.L1};
    }            

    .with${type}:active {
      background-color: ${scheme.palette.accents[ltype].color.D1};
      border-color: ${scheme.palette.accents[ltype].color.D1};
    }

    .with${type}:before {
      background-color: ${scheme.palette.accents[ltype].alt.N};
    }
  `;

  const states = () => ['Primary', 'Info', 'Success', 'Warning', 'Critical'].map(type => state(type, type.toLowerCase())).join('\n');

  return Stylx.set(`
    .button {
      ${Styles.font(scheme.ui.input.normal)};
      box-sizing: content-box;
      text-align: center;
      position: relative;
      border-style: solid;
      transition: all 400ms ease;
      cursor: pointer;
      overflow: hidden;
      outline: none;
    }

      .isSmallSize {
        font-size: ${settings.small.fontSize}px;
        line-height: ${settings.small.size}px;
        border-radius: ${settings.small.borderRadius}px;
        padding: 0 ${settings.small.padding}px 0 ${settings.small.padding}px;
        height: ${settings.small.size}px;
        border-width: ${settings.small.borderWidth}px;
      }

      .isMediumSize {
        font-size: ${settings.medium.fontSize}px;
        line-height: ${settings.medium.size}px;
        border-radius: ${settings.medium.borderRadius}px;
        padding: 0 ${settings.medium.padding}px 0 ${settings.medium.padding}px;
        height: ${settings.medium.size}px;
        border-width: ${settings.medium.borderWidth}px;
      }

      .isNormalSize {
        line-height: ${settings.normal.size}px;
        border-radius: ${settings.normal.borderRadius}px;
        padding: 0 ${settings.normal.padding}px 0 ${settings.normal.padding}px;
        height: ${settings.normal.size}px;
        border-width: ${settings.normal.borderWidth}px;
      }

    .button:hover, 
    .button:active {
      transition: all 400ms ease;
    }

    .isSmallSize.hasIcon {
      padding: 0 ${(settings.small.padding + settings.small.size) + 2}px 0 ${settings.small.padding}px;
    }

    .isNormalSize.hasIcon {
      padding: 0 ${(settings.normal.padding + settings.normal.size) - 2}px 0 ${settings.normal.padding}px;
    }

      .hasIcon:before {
        position: absolute;
        z-index: 1;
        height: 100%;
        content: '';
        top: 0;
        right: 0;
      }

        .isSmallSize.hasIcon:before {
          width: ${settings.small.size}px;
        }

        .isNormalSize.hasIcon:before {
          border-radius: 50%;
          width: ${settings.normal.size}px;
        }

      .hasIcon:after {
        position: absolute;
        z-index: 2;
        height: 100%;
        top: 0;
        right: 0;
        backface-visibility: hidden;
      }

        .isSmallSize.hasIcon:after {
          width: ${settings.small.size}px;
          line-height: ${settings.small.size}px;
          font-size: ${settings.small.fontSize}px;
        }

        .isNormalSize.hasIcon:after {
          width: ${settings.normal.size}px;
          line-height: ${settings.normal.size}px;
          font-size: ${settings.normal.fontSize}px;
        }

      .hasIcon.hasHiddenLabel,
      .hasIcon.hasDisplayModeAuto {
        padding: 0;
      }

        .isSmallSize.hasIcon.hasHiddenLabel,
        .isSmallSize.hasIcon.hasDisplayModeAuto {
          width: ${settings.small.size}px;        
        }

        .isNormalSize.hasIcon.hasHiddenLabel,
        .isNormalSize.hasIcon.hasDisplayModeAuto {
          width: ${settings.normal.size}px;        
        }

      .hasIcon.hasDisplayModeAuto:hover {
        width: auto;
      }

        .isSmallSize.hasIcon.hasDisplayModeAuto:hover {
          padding: 0 ${settings.small.padding + settings.small.size}px 0 ${settings.small.padding}px;
        }

        .isNormalSize.hasIcon.hasDisplayModeAuto:hover {
          padding: 0 ${settings.normal.padding + settings.normal.size}px 0 ${settings.normal.padding}px;
        }

      .withUppercase {
      text-transform: uppercase;
    }

    .isDisabled {
      cursor: initial;
      ${Styles.font(scheme.ui.input.disabled)};
      ${Styles.colors(scheme.ui.input.disabled)};
      border-color: ${scheme.ui.input.disabled.backcolor};
    }

    ${states()}

  `);
}
