import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import SummaryItem from './Summary/SummaryItem';
import useAxios from '@/hooks/useAxios';
import { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import { mobileV } from '@/utils/Mixin';

type summaryResponse = {
  day: number;
  week: number;
  month: number;
};

function Summary() {
  const userInfo = useRecoilValue(UserInfo);
  const [summary, setSummary] = useState<summaryResponse>();

  const summaryTryHandler = (response: AxiosResponse) => {
    setSummary(response.data.data);
  };

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: summaryTryHandler,
    baseURL: 'https://detecto.kr/api/',
  });

  useEffect(() => {
    setRequestObj({
      method: 'get',
      url: `report/count/${userInfo.id}`,
    });
  }, []);

  return (
    <SummaryPaper elevation={1}>
      <SummaryItem title="24시간 내 위반사항" count={summary?.day || 0} />
      <SummaryItem title="일주일 내 위반사항" count={summary?.week || 0} />
      <SummaryItem title="한 달 내 위반사항" count={summary?.month || 0} />
    </SummaryPaper>
  );
}

export default Summary;

const SummaryPaper = styled(Paper)`
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;

  ${mobileV} {
    padding: 1rem;
  }
`;
