import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .tag {
      position: relative;
      line-height: 20px;
      padding: 0 22px 0 5px;
      margin: 0 5px 5px 0;
      height: 20px;
      border-radius: 4px;
      transition: all 200ms;
      cursor: pointer;
    }

      .tag.withFollowMode {
        display: inline-block;
      }

      .tag.withLineMode {
        display: block;
      }

      .tag.isLeftAlign {
        text-align: left;
      }

      .tag.isCenterAlign {
        text-align: center;
      }

      .tag.isRightAlign {
        text-align: right;
      }
    

      .tag,
      .tag.isLocked:hover {
        ${Styles.colors(scheme.ui.tag.normal)};
        ${Styles.font(scheme.ui.tag.normal)};
        ${Styles.border(scheme.ui.tag.normal)};
      }

      .tag:hover {
        ${Styles.colors(scheme.ui.tag.hover)};
        ${Styles.font(scheme.ui.tag.hover)};
        ${Styles.border(scheme.ui.tag.hover)};
      }

      .tag.isLocked,
      .tag.isDisabled {
        padding-right: 5px;
        cursor: default;
      }
      
      .tag.isDisabled {
        margin: 0 4px 4px 0;
        line-height: 22px;
        height: 22px;
      }

      .tag.isDisabled,
      .tag.isDisabled:hover {
        ${Styles.colors(scheme.ui.tag.disabled)};
        ${Styles.font(scheme.ui.tag.disabled)};
        ${Styles.border(scheme.ui.tag.disabled)};
      }

      .tag.isSelected {
        ${Styles.colors(scheme.ui.tag.active)};
        ${Styles.font(scheme.ui.tag.active)};
        ${Styles.border(scheme.ui.tag.active)};
      }

      .tag:first-child {
        margin-left: 0;
      }

      .tag > I {
        cursor: pointer;
        position: absolute;
        line-height: 20px;
        right: 5px;
        cursor: pointer;
        z-index: 10;
      }

        .tag.isLocked > I,
        .tag.isDisabled > I {
          display: none;
        }

        .tag.isSelected > I:after {
          ${Styles.font(scheme.ui.tag.active.delete)};
          color: ${scheme.ui.tag.active.delete.forecolor};
        }

        .tag > I:after {
          content: '\\e915';
          ${Styles.font(scheme.ui.tag.normal.delete)};
          color: ${scheme.ui.tag.normal.delete.forecolor};
        }

        .tag > I:after:hover {
          ${Styles.font(scheme.ui.tag.hover.delete)};
          color: ${scheme.ui.tag.hover.delete.forecolor};
        }


  `);
}
