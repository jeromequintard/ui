import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .formfield {
      margin-bottom: 15px;
    }

      .formField > LABEL {
        font-weight: bold;
        text-transform: uppercase;
        display: block;
        margin-bottom: 5px;
      }

  `);
}
