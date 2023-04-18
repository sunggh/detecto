import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react'

type CenterModal = {
  children: React.ReactNode,
  onClose: () => void
}

function CenterModal({ children, onClose}: CenterModal) {
  const centerModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 모달창 외부를 클릭하였을 때 모달창 닫히도록 함
    const handleClickOutside = (e: MouseEvent) => {
      if (centerModalRef.current && !centerModalRef.current.contains(e.target as Node)) {
        const isCloseModal = confirm("편집을 종료하시겠습니까??\n(지금 닫으시면 수정한 내용은 반영되지 않습니다)");
        if (isCloseModal) {
          onClose();
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [])

  return (
    <>
      <BackgroundDiv></BackgroundDiv>
      <div css={modalContainer} ref={centerModalRef}>
        {children}
      </div>
    </>
  )
}

const scaleUp = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
 
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  overflow-y: auto;
  z-index: 1002;
  background-color: ${props => props.theme.palette.neutral.opposite + "20"};
`

const modalContainer = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  animation: ${scaleUp} 0.3s ease;
`

export default CenterModal