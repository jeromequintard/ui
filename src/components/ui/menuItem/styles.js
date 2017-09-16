import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .menuitem {
      line-height: initial;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      width: 100%;
      padding: 10px 20px;
      ${Styles.colors(scheme.ui.input.normal)};
      ${Styles.font(scheme.ui.input.normal)};
    }

    .menuItem.withIcon {
      padding: 10px 20px 10px 36px;
    }

    .menuItem.withIcon:before,
    .menuItem.withIcon:after {
      margin-left: 10px;
    }

    .menuitem:hover {
      ${Styles.colors(scheme.ui.input.hover)};
      ${Styles.font(scheme.ui.input.hover)};
    }

    .menuitem.isActive {
      ${Styles.colors(scheme.ui.input.selected)};
      ${Styles.font(scheme.ui.input.selected)};
    }

    .menuitem.isDisabled,
    .menuitem.isDisabled:hover {
      pointer-events: none;
      cursor: default;
      background-color: transparent;
      color: ${scheme.ui.input.disabled.forecolor};
      ${Styles.font(scheme.ui.input.disabled)};
    }

  `);
}
