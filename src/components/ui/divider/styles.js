import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .divider {
      background-color: ${scheme.ui.input.normal.border.color};
    }

      .divider.isVertical {
        width: 1px;
        display: block;
        height: 100%;
      }

      .divider.isHorizontal {
        height: ${scheme.ui.input.normal.border.size}px;
        border: none;
        margin: 0;
      }

  `);
}
