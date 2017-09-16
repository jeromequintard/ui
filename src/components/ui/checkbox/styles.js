import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    size: 16,
    padding: 2,
  };

  return Stylx.set(`

    .checkbox {
      overflow: hidden;
      display: inline-block;
    }

      .checkbox:hover .label {
        background-color: ${scheme.ui.input.hover.backcolor};
      }

      .checkbox:active .label {
        background-color: ${scheme.ui.input.active.backcolor};
      }

      .checkbox > INPUT {
        position: absolute;
        margin-left: -999px;
        visibility: hidden;
      }

      .checkbox > INPUT:checked + .label:after {
        background-color: ${scheme.ui.input.selected.forecolor};
      }

      .label {
        position: relative;
        width: ${settings.size}px;
        height: ${settings.size}px;
        cursor: pointer;
        background-color: ${scheme.ui.input.normal.backcolor};
        ${Styles.border(scheme.ui.input.normal)};
        padding: ${settings.padding}px;
        transition:all 200ms ease;
        display: inline-block;
      }

        .label:after {
          content : '';
          left: 0;
          top: 0;
          width: ${settings.size - ((1 + settings.padding) * 2)}px;
          height: ${settings.size - ((1 + settings.padding) * 2)}px;
          transition: all 200ms ease;
          display: block;
        }

      .isDisabled {
        pointer-events: none;
        cursor: default;
      }

        .isDisabled .label {
          ${Styles.border(scheme.ui.input.disabled)};
          background-color: ${scheme.ui.input.disabled.backcolor};
        }

          .isDisabled .label:before {
            color: ${scheme.ui.input.disabled.forecolor};   
          }
  `);
}
