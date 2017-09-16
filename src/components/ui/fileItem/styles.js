import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = { };

  return Stylx.set(`
    .fileItem {
      position: relative;
    }

      .icon {
        position: relative;
        display: inline-block;
      }

      .asIcon {
        text-align: center;
        padding: 10px;
        float: left;
        cursor: pointer;
        width: 110px;
      }

        .asIcon:hover {
          ${Styles.colors(scheme.ui.input.hover)};
          ${Styles.font(scheme.ui.input.hover)};
        }

        .asIcon .fileName {
          text-overflow: ellipsis;
        }

        .asIcon .icon {
          width: 76px;
          height: 62px;
          overflow: hidden;
          text-align: center;
          color: #FFFFFF;
          ${Styles.font(scheme.ui.input.normal)};
          margin-bottom: 5px;
        }

      .asList {
        cursor: pointer;
        ${Styles.colors(scheme.ui.grid.normal)};
        ${Styles.font(scheme.ui.grid.normal)};
      }

        .asList:hover {
          ${Styles.colors(scheme.ui.grid.hover)};
          ${Styles.font(scheme.ui.grid.hover)};
        }

        .asList > TD {
          line-height: 30px;
          vertical-align: middle;
          ${Styles.border(scheme.ui.grid.normal, { top: true, right: true })};
          white-space: nowrap;
          padding: 0 10px;
        }

        .asList .icon {
          width: 30px;
          padding-top: 5px;
          text-align: center;
          border-right: none;
          padding-right: 0;
        }

        .asList .fileName {
          text-overflow: ellipsis;
        }

        .asList .size {
          width: 80px;
          text-align: right;
        }

        .asList .date {
          width: 150px;
          text-align: right;
          border-right: none;
        }

        .asList .select {
          width: 50px;
        }

        .isFile {

        }

        .isFolder {

        }

        .fileExtension {
          position: absolute;
          left: 0;
          right: 0;
          line-height: 62px;
        }
      
    .isDisabled {
      cursor: initial;
    }

  `);
}
