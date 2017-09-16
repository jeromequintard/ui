import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
    spriteSize: 80,
  };

  return Stylx.set(`

    .tabs {
      display: flex;
      flex-flow: row nowrap;
      align-items: stretch;
      position: relative;
    }  

    .nav {
      ${Styles.border(scheme.ui.tabs.normal, { right: true })};
      flex: 0;
    }

      .isShifted .nav {
        padding-top: 80px;
      }

      .nav > UL {
        margin-right: -1px;
        background-color: ${scheme.ui.tabs.normal.backcolor};
        ${Styles.border(scheme.ui.tabs.normal, { right: true })};
        transition: all 200ms;
        position: relative;
      }

    .container {
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden; 
      padding: 60px;
    }

    .hasToggleModeAuto .nav > UL {
      width: ${settings.spriteSize}px;
    }

      .hasToggleModeAuto .nav > UL:hover {
        width: 200px;
        transition: all 500ms;
      }

      .hasToggleModeAuto .nav .tab SPAN {
        opacity: 0;
        transform: translate3d(-10px, 0, 0);
        margin-left: 0;
      }

      .hasToggleModeAuto .nav > UL:hover .tab SPAN {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 500ms;
      }

    .isDisabled {
      pointer-events: none;
    }
    
      .isDisabled .nav > UL {
        ${Styles.border(scheme.ui.tabs.disabled, { right: true })};
      }

  `);
}
