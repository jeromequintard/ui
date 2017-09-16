import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .actions {
      margin-top: 80px;
    }

      .actions > LI {
        float: left;
        margin-left: 15px;
      }

        .actions > LI:first-child {
          margin-left: 0;
        }

  `);
}
