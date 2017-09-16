import { Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .ripple {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: transparent;
      z-index: 10;
    }

      .ripple > SPAN {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, .25);
      }
          
      .isActive {
        animation: rippleAnimation .4s ease-in;
      }

    @keyframes rippleAnimation {
      0% { 
          opacity: 0; 
      }
      25% { 
          opacity: 1; 
      }
      100% {
          width: 200%;
          padding-bottom: 200%;
          opacity: 0;
      }
    }
  `);
}
