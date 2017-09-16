import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .toolbar {
      margin-top: 40px;
    }

      .hasNormalSize {
        line-height: 36px;
        height: 36px;
      }

      .hasSmallSize {
        line-height: 19px;
        height: 19px;
      }

        .bar.isLeftAlign {
          left: 0;
        }

        .bar.isRightAlign {
          right: 0;
          float: right;
        }

        .bar > LI {
          float: left;
          margin-left: 15px;
        }

          .bar > LI:first-child {
            margin-left: 0;
          }

      .bar.onFlow {
        position: relative;
      }

      .bar.onTop {

      }

      .bar.onBottom {
        position: absolute;
        bottom: 0;
      }

  `);
}
