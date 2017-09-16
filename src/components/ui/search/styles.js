import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .search:after {
      content: '\\e91d';
      color: ${scheme.ui.input.placeholder.forecolor};
      font-family: 'osiki';
      position: absolute;
      display: block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      backface-visibility: hidden;
      padding-right: 10px;
      right: 0;
      top: 0;
      line-height: 30px;
      z-index: 100;
    }

      .search > INPUT[type=search] {
        outline: none;
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        padding: 5px 35px 5px 10px;
        ${Styles.colors(scheme.ui.input.normal)};
        ${Styles.font(scheme.ui.input.normal)};
      }

  `);
}
