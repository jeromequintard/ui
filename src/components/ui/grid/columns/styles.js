import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .footer {
      margin-top: 40px;
      overflow: hidden;
      line-height: 20px;
      margin-top: 30px;
      flex: 0 1 auto;
      align-self: stretch;
    }

      .controls {
        float: left;
      }

        .previous,
        .next {
          display: inline-block;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          width: 20px;
          height: 20px; 
          font-size: 0;
          background-color: ${scheme.ui.input.tooltip.forecolor};
          border-radius: 5px;
          text-align: center;
          margin-right: 5px;
          outline: none;
          border: none;
          padding: 0;
        }

          .previous:hover,
          .next:hover {
            background-color: ${scheme.ui.input.tooltipHover.forecolor};
          }

          .previous:after,
          .next:after {
            font-family: 'osiki';
            font-size: 10px;
            speak: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: ${scheme.ui.input.tooltip.backcolor};
          }

          .previous:after {
            content: "\\e901";
          }

          .next:after {
            content: "\\e902";
          }

          .isDisabled .previous,
          .isDisabled .next {
            background-color: ${scheme.ui.input.disabled.backcolor};
          }

            .isDisabled .previous:after,
            .isDisabled .next:after {
              color: ${scheme.ui.input.disabled.forecolor};
            }

      .pager {
        float: left;
      }

        .page {
          outline: none;
          border: none;
          background: none;
          border-radius: 5px;
          width: 20px;
          height: 20px; 
          line-height: 20px; 
          text-align: center;
          ${Styles.font(scheme.ui.input.normal)};
          ${Styles.colors(scheme.ui.input.normal)};
          cursor: pointer;
          width: 30px;
          padding: 0;
          text-align: center;          
        }

          .page:hover {
            ${Styles.font(scheme.ui.input.hover)};
            ${Styles.colors(scheme.ui.input.hover)};
          }

        .isCurrentPage,
        .isCurrentPage.page:hover {
          ${Styles.font(scheme.ui.input.selected)};
          ${Styles.colors(scheme.ui.input.selected)};
        }


      .stats {
        float: right;
        ${Styles.font(scheme.ui.input.normal)};
        ${Styles.colors(scheme.ui.input.normal)};
      }

        .isDisabled .page,
        .isDisabled .stats {
          ${Styles.font(scheme.ui.input.disabled)};
          color: ${scheme.ui.input.disabled.forecolor};
          background-color: transparent;
        }

  `);
}
