import { Styles, Stylx } from 'osiki-core';

export default function styles(scheme) {

  const settings = {
  };

  return Stylx.set(`

    .status {
      z-index: 100000;
      padding: 10px;
    }

    .status.isOpening.withOpenScaleAnim,
    .status.isOpening.withOpenBounceAnim,
    .status.isClosing.withCloseFadeAnim {
      animation-timing-function: linear;
    }
          
      .status.isOpening.withOpenScaleAnim {
        animation-fill-mode: forwards;
        animation-duration: 200ms;
        animation-name: openScale;
      }

      .status.isOpening.withOpenBounceAnim {
        animation-fill-mode: both;
        animation-duration: 1s;
        animation-name: openBounce;
      }

      .status.isClosing.withCloseSlideAnim {
        animation-fill-mode: forwards;
        animation-duration: 200ms;
        animation-name: closeSlide;
      }

      .withInfo {
        background-color: ${scheme.palette.accents.info.color.N};
        color: ${scheme.palette.accents.info.alt.N};
      }

      .withPrimary {
        background-color: ${scheme.palette.accents.primary.color.N};
        color: ${scheme.palette.accents.primary.alt.N};
      }

      .withSuccess {
        background-color: ${scheme.palette.accents.success.color.N};
        color: ${scheme.palette.accents.success.alt.N};
      }

      .withWarning {
        background-color: ${scheme.palette.accents.warning.color.N};
        color: ${scheme.palette.accents.warning.alt.N};
      }

      .withCritical {
        background-color: ${scheme.palette.accents.critical.color.N};
        color: ${scheme.palette.accents.critical.alt.N};
      }

      .status > SPAN {
        margin-right: 5px;
      }

      .status > SPAN > STRONG {
        font-weight: ${scheme.font.weight.bold};
      }

      .forNone {
        line-height: 36px;
      }

      .forComponent,
      .forApp {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .forComponent {
        position: absolute;
      }

      .forApp {
        position: fixed;
      }

      @keyframes openScale {
        0%   { transform: scale3d(1.1, 1.1, 1); opacity: 0; }
        100% { transform: scale3d(1, 1, 1); opacity: 1; }
      }

      @keyframes openBounce {
        0%     { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 450, 0, 0, 1); }
        3.03%  { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 267.159, 0, 0, 1); }
        6.06%  { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 117.431, 0, 0, 1); }
        9.09%  { transform: matrix3d(1.2, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 1, 0, 20.824, 0, 0, 1); }
        12.12% { transform: matrix3d(1.138, 0, 0, 0, 0, 1.121, 0, 0, 0, 0, 1, 0, -27.409, 0, 0, 1); }
        15.15% { transform: matrix3d(1.071, 0, 0, 0, 0, 1.025, 0, 0, 0, 0, 1, 0, -41.791, 0, 0, 1); }
        18.18% { transform: matrix3d(1.015, 0, 0, 0, 0, 0.958, 0, 0, 0, 0, 1, 0, -37.452, 0, 0, 1); }
        21.21% { transform: matrix3d(0.978, 0, 0, 0, 0, 0.934, 0, 0, 0, 0, 1, 0, -25.916, 0, 0, 1); }
        24.24% { transform: matrix3d(0.96, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, -14.144, 0, 0, 1); }
        27.27% { transform: matrix3d(0.958, 0, 0, 0, 0, 0.974, 0, 0, 0, 0, 1, 0, -5.289, 0, 0, 1); }
        30.3%  { transform: matrix3d(0.966, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
        33.33% { transform: matrix3d(0.979, 0, 0, 0, 0, 1.018, 0, 0, 0, 0, 1, 0, 2.348, 0, 0, 1); }
        36.36% { transform: matrix3d(0.991, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 1, 0, 2.788, 0, 0, 1); }
        39.39% { transform: matrix3d(1, 0, 0, 0, 0, 1.014, 0, 0, 0, 0, 1, 0, 2.268, 0, 0, 1); }
        42.42% { transform: matrix3d(1.006, 0, 0, 0, 0, 1.004, 0, 0, 0, 0, 1, 0, 1.455, 0, 0, 1); }
        45.45% { transform: matrix3d(1.008, 0, 0, 0, 0, 0.997, 0, 0, 0, 0, 1, 0, 0.721, 0, 0, 1); }
        48.48% { transform: matrix3d(1.007, 0, 0, 0, 0, 0.994, 0, 0, 0, 0, 1, 0, 0.21, 0, 0, 1); }
        51.52% { transform: matrix3d(1.005, 0, 0, 0, 0, 0.994, 0, 0, 0, 0, 1, 0, -0.071, 0, 0, 1); }
        54.55% { transform: matrix3d(1.003, 0, 0, 0, 0, 0.997, 0, 0, 0, 0, 1, 0, -0.177, 0, 0, 1); }
        57.58% { transform: matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.179, 0, 0, 1); }
        60.61% { transform: matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, -0.134, 0, 0, 1); }
        63.64% { transform: matrix3d(0.999, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, -0.079, 0, 0, 1); }
        66.67% { transform: matrix3d(0.999, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, -0.035, 0, 0, 1); }
        69.7%  { transform: matrix3d(0.999, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, -0.006, 0, 0, 1); }
        72.73% { transform: matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.008, 0, 0, 1); }
        75.76% { transform: matrix3d(1, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0.012, 0, 0, 1); }
        78.79% { transform: matrix3d(1, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0.011, 0, 0, 1); }
        81.82% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.008, 0, 0, 1); }
        84.85% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.004, 0, 0, 1); }
        87.88% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0.002, 0, 0, 1); }
        100%   { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
      }

      @keyframes closeSlide {
        0%   { margin-top: 0; opacity: 1; }
        100% { margin-top: -40px; opacity: 0; }
      }

  `);
}
