import styled, { keyframes } from "styled-components";

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

export const LoaderWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
`;

export const CubeGrid = styled.div`
  width: 80px;
  height: 80px;
  margin: 100px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

export const Cube = styled.span`
  background-color: #7c4dff;
  animation: ${cubeGridScaleDelay} 1.3s infinite ease-in-out;
  animation-delay: ${({ delay }) => (delay ? delay : 0)}s;
`;
