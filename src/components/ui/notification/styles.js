import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .notification {
      top: 0;
      right: 0;
      z-index: 100000;
      position: fixed;
      width: 300px;
      max-width: 90%;
      overflow: hidden;
    }

      .notification .message {
        border-radius: 2px;
        margin-top: 4px;
        line-height: 20px;
      }

        .notification .message:first-child {
          margin-top: 0;
        }

  `);
}
