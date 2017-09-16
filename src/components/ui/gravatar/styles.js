import { Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`
    .gravatar {
      display: inline-block;
      position: relative;
      overflow: hidden;
    }

      .defaultImage {
        height: 100%;
        width: 100%;
      }

      .gravatar > IMG {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
      }

      .gravatar.isLoaded > IMG {
        animation: fadein ease-in 200ms;
        animation-fill-mode: forwards;
      }

      @keyframes fadein {
        from { opacity: 0; }
        to { opacity: 1; }
      }

  `);
}
