import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .scrollbar {

    }

    .canvas {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .content {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      overflow: scroll;
    }

    .track {
      position: absolute;
      width: 6px;
      right: 0;
      bottom: 0;
      top: 0;
      transition: opacity 300ms;
    }

      .hasAutoHide .track {
        opacity: 0;
      }

    .thumb {
      position: relative;
      display: block;
      width: 100%;
      cursor: pointer;
      border-radius: inherit;
      background-color: ${scheme.ui.scrollbar.normal.backcolor};
      height: 30px;
    }

      .thumb:hover {
        background-color: ${scheme.ui.scrollbar.hover.backcolor};
      }

      .thumb:active {
        background-color: ${scheme.ui.scrollbar.active.backcolor};
      }

  `);
}
