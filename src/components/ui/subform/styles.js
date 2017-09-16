import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = { };

  return Stylx.set(`

    .subform {

    }

      .subform > THEAD > TR {
        ${Styles.colors(scheme.ui.grid.header)};
        ${Styles.font(scheme.ui.grid.header)};
      }

      .subform > THEAD > TR > TH {
        line-height: 30px;
        text-align: left; 
        padding: 0 10px;
        white-space: nowrap;     
      }
    
      .subform > THEAD > TR > TH,
      .subform > TBODY > TR > TD {
        padding-left: 10px;
        vertical-align: top;
      }

        .subform > THEAD > TR > TH:first-child,
        .subform > TBODY > TR > TD:first-child {
          padding-left: 0;
        }

      .subform .buttonDelete {
        padding: 0;
        width: 28px;
      }

  `);
}
