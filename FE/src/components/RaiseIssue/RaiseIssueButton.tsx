import useAxios from '@/hooks/useAxios';
import { mobileV } from '@/utils/Mixin';
import { KeyboardArrowDown } from '@mui/icons-material';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { RequestObj } from 'AxiosRequest';
import { ReportType } from 'ReportTypes';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';

function RaiseIssueButton({ report }: { report: ReportType }) {
  const userInfo = useRecoilValue(UserInfo);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmmited] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  const successHandler = () => {
    alert(`관리자에게 제출되었습니다.`);
  };

  const errorHandler = () => {
    alert(`이의 신청을 이미 하셨습니다.`);
  };

  const finalHandler = () => {
    setSubmmited(true);
    setOpen(false);
  };

  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://detecto.kr/api/',
    tryHandler: successHandler,
    catchHandler: errorHandler,
    finallyHandler: finalHandler,
  });

  const submitHandler = () => {
    const requestObj: RequestObj = {
      url: 'objection',
      method: 'post',
      body: {
        userId: userInfo.id,
        reportId: report.id,
        comment: comment,
      },
    };
    setRequestObj(requestObj);
  };

  return (
    <AccordionWrapper>
      <AccordionStyle
        open={open}
        expanded={submitted ? false : open ? true : false}
        disabled={submitted ? true : false}
      >
        <AccordionSummaryStyle
          expandIcon={<KeyboardArrowDown />}
          open={open}
          onClick={() => setOpen(!open)}
        >
          <Typography>이의 제기</Typography>
        </AccordionSummaryStyle>
        <AccordionDetails>
          <ButtonWrapper>
            <TextFieldStyle
              label="이의 제기 메시지"
              placeholder="관리자에게 전송할 메시지를 입력해주세요."
              variant="filled"
              onChange={inputHandler}
              onKeyDown={keyDownHandler}
            />
            <ButtonStyle variant="contained" onClick={submitHandler}>
              제출하기
            </ButtonStyle>
          </ButtonWrapper>
        </AccordionDetails>
      </AccordionStyle>
    </AccordionWrapper>
  );
}

export default RaiseIssueButton;

const AccordionWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;

  ${mobileV} {
    width: auto;
    margin: 1rem 1rem;
  }
`;

const AccordionStyle = styled(Accordion)<{ open: boolean }>`
  float: right;
  min-height: 0.5rem;
  width: ${props => (props.open ? '100%' : '9rem')};
`;

const AccordionSummaryStyle = styled(AccordionSummary)<{ open: boolean }>`
  p {
    font-size: ${props => (props.open ? '1.1rem' : '0.9rem')};
    font-weight: ${props => props.open && 'bold'};
  }
  svg {
    width: ${props => (props.open ? '1.5rem' : '1rem')};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  ${mobileV} {
    flex-direction: column;
  }
`;

const TextFieldStyle = styled(TextField)`
  width: 100%;
  margin-right: 0.5rem;

  label {
    font-size: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }

  ${mobileV} {
    margin-right: 0;
  }
`;

const ButtonStyle = styled(Button)`
  min-width: 6rem;
  height: 3.6rem;
  white-space: nowrap;

  ${mobileV} {
    margin-top: 1rem;
    float: right;
  }
`;
