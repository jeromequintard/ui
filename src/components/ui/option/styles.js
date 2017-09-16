import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .option {
      cursor: pointer;
      ${Styles.colors(scheme.ui.input.normal)};
      ${Styles.font(scheme.ui.input.normal)};
      line-height: initial;
      padding: 10px 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

      .option:hover {
        ${Styles.colors(scheme.ui.input.hover)};
        ${Styles.font(scheme.ui.input.hover)};
      }

  `);
}
