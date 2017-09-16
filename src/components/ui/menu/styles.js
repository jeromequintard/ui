import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .menu {
      line-height: 20px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      text-align: left;
    }

      .withGridTemplate {
        width: 100%;
        height: 100%;
      }

      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: text-indent 0.3s, opacity 0.3s;
        color: ${scheme.ui.input.placeholder.forecolor};
        ${Styles.font(scheme.ui.input.placeholder)};
        cursor: pointer;
        position: relative;
      }

        .withDefaultTemplate {

        }
        
        .withGridTemplate .title {
          height: 100%;
          display: flex;
          align-items: center;
        }

          .gridHandle {
            margin: 0 auto;
            display: block;
          }

            .gridHandle > PATH {
              fill: ${scheme.ui.button.normal.forecolor}
            }

        .withAdornment .title:after {
          font-family: 'osiki';
          speak: none;
          content: '\\e903';
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${scheme.ui.input.tooltip.forecolor};
          backface-visibility: hidden;
          position: absolute;
          transition: all 200ms;
          top: 0;
        }

        .withAdornment.withLabelOrientationLeft .title {
          padding-left: 20px;
        }

          .withLabelOrientationLeft .title:after {
            left: 0;
          }

        .withAdornment.withLabelOrientationRight .title {
          padding-right: 20px;
        }

          .withLabelOrientationRight .title:after {
            right: 0;
          }

      .menuitems {
        background-color: ${scheme.ui.input.normal.backcolor};
        box-shadow: ${scheme.ui.input.normal.border.color} 0px 1px 4px, ${scheme.ui.input.normal.border.color} 0px 1px 4px;
        padding: 0;
        position: absolute;
        width: auto;
        visibility: hidden;
        z-index: 10000;
        transition: all 0.2s;
        overflow: hidden;
        top: 100%;
        transform: translate3d(0,5%,0);        
      }

    .withOrientationLeft .menuitems {
      left: 0;
    }

    .withOrientationRight .menuitems {
      right: 0;
    }

    .isOpened.withAdornment .title:after {
      transform: rotate(180deg);
    }

    .isOpened .menuitems {
      visibility: visible;
      transform: translate3d(0,0,0);        
    }

    .isDisabled {
      pointer-events: none;
      cursor: default;
    }

    .isDisabled .title {
      color: ${scheme.ui.input.disabled.forecolor};
    }

    .isDisabled .title:after {
      color: ${scheme.ui.input.disabled.forecolor};
    }

  `);
}
