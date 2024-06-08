import styled from "styled-components";

export const WindowFrameStyle = styled.div<{
    close: boolean;
    isDragging: boolean;
}>`
    z-index: 11;
    position: absolute;
    resize: both;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
    background-color: ${(props) => props.theme.colorBG10};
    border: 1px solid ${(props) => props.theme.colorBG2};
    max-width: 100vw;
    min-width: 400px;
    max-height: calc(100% - 39px);
    min-height: 300px;
    transition: width 50ms, height 50ms;
    animation: ${(props) =>
        props.close ? "frame-disappear 1s ease" : "frame-appear 300ms ease"};
    /* hack to make it work, forwards need to be re set */
    animation-fill-mode: ${(props) => (props.close ? "forwards" : "forwards")};
  
    @keyframes frame-disappear {
      0% {
        opacity: 1;
      }
  
      50% {
        transform: translateY(1000px) scale(0.5);
        opacity: 0.5;
      }
  
      100% {
        transform: translateY(2000px) scale(0);
        opacity: 0;
      }
    }
  
    @keyframes frame-appear {
      0% {
        transform: translateY(2000px) scale(0);
        opacity: 0;
      }
  
      50% {
        transform: translateY(1000px) scale(0.5);
        opacity: 0.5;
      }
      0% {
        opacity: 1;
      }
    }
  `;