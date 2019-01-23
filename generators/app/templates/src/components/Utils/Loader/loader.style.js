import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  display: ${({ show }) => (show ? "flex" : "none")};
  background-color: rgba(255, 255, 255, 0.6);

  .sk-cube-grid {
    width: 80px;
    height: 80px;
    margin: 100px auto;

    .sk-cube {
      width: calc(100% / 3);
      height: calc(100% / 3);
      background-color: $purple;
      float: left;
      animation: ${cubeGridScaleDelay} 1.3s infinite ease-in-out;
    }

    .sk-cube1 {
      animation-delay: 0.2s;
    }

    .sk-cube2 {
      animation-delay: 0.3s;
    }

    .sk-cube3 {
      animation-delay: 0.4s;
    }

    .sk-cube4 {
      animation-delay: 0.1s;
    }

    .sk-cube5 {
      animation-delay: 0.2s;
    }

    .sk-cube6 {
      animation-delay: 0.3s;
    }

    .sk-cube7 {
      animation-delay: 0s;
    }

    .sk-cube8 {
      animation-delay: 0.1s;
    }

    .sk-cube9 {
      animation-delay: 0.2s;
    }
  }
`;

const cubeGridScaleDelay = keyframes`
	0%,
	70%,
	100% {
		transform: scale3D(1, 1, 1);
	}

	35% {
		transform: scale3D(0, 0, 1);
	}
`;
