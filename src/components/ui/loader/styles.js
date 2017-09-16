import { Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  const polygons = () => {
    const ret = [];
    for (let i = 1; i <= 6; i++) {
      ret.push(`
        .logo > POLYGON:nth-child(${i}) {
          animation-delay: 0.${i}s;
        }
      `);
    }
    return ret.join('\n');
  };

  return Stylx.set(`

    .loader {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 200000;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

      .isHide {
        animation: loaderFade ease-out 1;
        animation-fill-mode: forwards;
        animation-duration: 1.5s;
      }

      .forApp {
        position: fixed;
        background-color: ${scheme.ui.loader.app.backcolor}; 
      }

        .forApp.isShow .logo > POLYGON {
          animation: loaderLogo ease-in 1;
          animation-fill-mode: forwards;
          animation-duration: 1s;
          opacity: 0;
        }

        .forApp .logo > POLYGON {
          fill: ${scheme.ui.loader.app.forecolor};
          stroke: ${scheme.ui.loader.app.forecolor};       
          stroke-linejoin:round;
        }

      .forComponent {
        position: absolute;
        background-color: ${scheme.ui.loader.component.backcolor};
      }

        .forComponent .dots > CIRCLE {
          fill: ${scheme.ui.loader.component.forecolor};
        }

        .forComponent.isHide {
            animation-duration: .5s;
        }    

      .logo {
        transform: translate(65px, 65px);
      }

      ${polygons()}

      .dots > CIRCLE {
        fill: ${scheme.ui.loader.app.forecolor};
      }

      @keyframes loaderLogo {
          0% {
              transform: scale(1.2);
              opacity: 0;
          }
          50%,100% {
              transform: scale(1.0);
              opacity: 1;
          }
      }

      @keyframes loaderFade {
          0%, 50% {
              opacity: 1;
          }
          100% {
              opacity: 0;
              visibility: hidden;
          }
      }
  `);
}
