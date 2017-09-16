import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    spriteSize: 80,
  };

  return Stylx.set(`

    .tab {
      line-height: 40px;
      height: 40px;
      ${Styles.border(scheme.ui.tab.normal, { top: true, bottom: true })};
      background-color: ${scheme.ui.tab.normal.backcolor};
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
    }

      .tab:first-child,
      .tab:first-child:hover,
      .tab.isActive:first-child,
      .tab.isActive:first-child:hover {
        border-top: ${scheme.ui.tab.normal.border.size}px ${scheme.ui.tab.normal.border.style} transparent;
      }

      .tab.isActive.isShifted:first-child,
      .tab.isActive.isShifted:first-child:hover {
        ${Styles.border(scheme.ui.tab.active, { top: true })};
      }

      .tab:hover {
        ${Styles.border(scheme.ui.tab.hover, { top: true, bottom: true })};
        background-color: ${scheme.ui.tab.hover.backcolor};
      }

        .tab:hover > SPAN {
          color: ${scheme.ui.tab.hover.forecolor};
          ${Styles.font(scheme.ui.tab.hover)};
        }

        .tab:hover > I {
          opacity: ${scheme.ui.tab.hover.opacity};
        }

      .tab.isActive,
      .tab:hover.isActive {
        ${Styles.border(scheme.ui.tab.active, { top: true, bottom: true })};
        margin-right: -${scheme.ui.tab.active.border.size}px;
        padding-right: ${scheme.ui.tab.active.border.size}px;
        background-color: ${scheme.ui.tab.active.backcolor};
      }

        .tab.isActive.isDisabled {
          ${Styles.border(scheme.ui.tab.disabled, { top: true, bottom: true })};
        }

        .tab.isActive > SPAN,
        .tab:hover.isActive > SPAN {
          ${Styles.font(scheme.ui.tab.active)};
          color: ${scheme.ui.tab.active.forecolor};
        }

          .tab.isActive.isDisabled > SPAN {
            ${Styles.font(scheme.ui.tab.disabled)};
            color: ${scheme.ui.tab.disabled.forecolor};
          }

        .tab.isActive > I,
        .tab:hover.isActive > I {
          opacity: ${scheme.ui.tab.active.opacity};
        }

      .tab > SPAN {
        transition: all 200ms;
        display: inline-block;
        color: ${scheme.ui.tab.normal.forecolor};
        ${Styles.font(scheme.ui.tab.normal)};
        margin: 0 10px;
      }

      .hasSprite {   
        line-height: ${settings.spriteSize}px;
        height: ${settings.spriteSize}px;
      }

        .hasSprite > I {
          width: ${settings.spriteSize}px;
          height: ${settings.spriteSize}px;
          line-height: ${settings.spriteSize}px;
          display: inline-block;
          text-align: center;
          float: left;
          padding-right: ${scheme.ui.tab.normal.border.size}px;
          opacity: ${scheme.ui.tab.normal.opacity};
        }

          .hasSprite > I:after {
            margin-top: 20px;
          }


      .isDisabled {
        pointer-events: none;
        background-color: ${scheme.ui.tab.disabled.backcolor};
      }

        .isDisabled > SPAN {
          color: ${scheme.ui.tab.disabled.forecolor};
          ${Styles.font(scheme.ui.tab.disabled)};
        }

        .isDisabled > I {
          opacity: ${scheme.ui.tab.disabled.opacity};
        }

  `);
}
