import { Button, CircularProgress, TextField } from '@mui/material';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import DragAndDrop from './DragAndDrop';
import useAxios from '@/hooks/useAxios';
import { RequestObj } from 'AxiosRequest';
import { EquipmentType } from 'EquipmentTypes';

type EditEquipmentProps = {
  equipment?: EquipmentType | null;
  fetchEquipments: () => void;
  onClose: () => void;
  setWillEditEquipment: React.Dispatch<
    React.SetStateAction<EquipmentType | null>
  >;
};

function EditEquipment({
  equipment,
  fetchEquipments,
  onClose,
  setWillEditEquipment,
}: EditEquipmentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [equipmentName, setEquipmentName] = useState(equipment?.name ?? '');
  const [equipmentDesc, setEquipmentDesc] = useState(
    equipment?.description ?? ''
  );
  const [equipmentType, setEquipmentType] = useState(1);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://detec.store:5000/',
  });
  const [duplicatedData, isDuplicatedLoading, setDuplicatedObj] = useAxios({
    baseURL: 'https://detecto.kr/api/',
  });

  const submit = () => {
    if (selectedZip === null) {
      alert('올바른 파일을 업로드 해주세요');
      return;
    } else if (equipmentName === '') {
      alert('장비명은 필수 입력란입니다');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedZip);
    formData.append('img', selectedImage ?? '');
    formData.append('name', equipmentName);
    formData.append('description', equipmentDesc);
    formData.append('type', `${equipmentType}`);

    // requestObj 생성
    const reqeusetObj: RequestObj = {
      url: 'upload',
      method: 'post',
      body: formData,
      headerObj: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // POST 요청
    setRequestObj(reqeusetObj);
  };

  // 징비명 입력 핸들링
  const handleNameinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    if (name === '') {
      setIsErrorName(true);
      setErrorMessage('장비명을 입력해주세요');
      setIsValid(false);
    } else if (name.length > 20) {
      setIsErrorName(true);
      setErrorMessage('장비명은 20자 이하로 입력해주세요');
      setIsValid(false);
    } else {
      setIsErrorName(false);
      setErrorMessage('');
    }
    setEquipmentName(name);
    if (name !== '') {
      const requestObj: RequestObj = {
        url: `equipment/${name}`,
        method: 'get',
      };
      setDuplicatedObj(requestObj);
    }
  };

  // 장비 설명 입력 핸들링
  const handleDescinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquipmentDesc(e.target.value);
  };

  // 장비명, 학습 데이터 올바르게 입력되었는지 점검하는 watcher 역할의 effect hook
  useEffect(() => {
    if (selectedZip !== null && equipmentName.trim() !== '') {
      setIsValid(true);
    }
  }, [equipmentName, selectedZip]);

  // 장비 등록 여부 감지하여 모달창 닫히도록 하는 effect hook
  useEffect(() => {
    if (isLoading === false && data !== null) {
      // 보호구 목록 비동기 요청하기
      fetchEquipments();
      onClose();
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (
      isDuplicatedLoading === false &&
      duplicatedData !== null &&
      'data' in duplicatedData
    ) {
      if (duplicatedData.data === true) {
        setErrorMessage('');
      } else {
        setIsErrorName(true);
        setIsValid(false);
        setErrorMessage('중복된 장비명 입니다');
      }
    }
  }, [duplicatedData, isDuplicatedLoading]);

  useEffect(() => {
    return () => {
      setWillEditEquipment(null);
    };
  }, []);

  return (
    <EditEquipmentForm>
      <div>
        {equipment === null && (
          <DragAndDrop
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            selectedFile={selectedZip}
            setSelectedFile={setSelectedZip}
            type="zip"
          />
        )}
        <br />
        <DragAndDrop
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          selectedFile={selectedImage}
          setSelectedFile={setSelectedImage}
          type="image"
        />
        <TextField
          fullWidth
          label="장비 이름 (필수 - 공백 제외 최대 20자)"
          value={equipmentName}
          variant="standard"
          onChange={handleNameinput}
          margin="normal"
          error={isErrorName}
          helperText={errorMessage}
          disabled={equipment !== null}
        />
        <TextField
          fullWidth
          label="장비 설명 (선택)"
          value={equipmentDesc}
          variant="standard"
          onChange={handleDescinput}
        />
      </div>
      {equipment === null ? (
        <Button
          fullWidth
          variant="contained"
          onClick={submit}
          disabled={!isValid || isLoading}
        >
          {isLoading ? <CircularProgress size="1.7rem" /> : '등록하기'}
        </Button>
      ) : (
        <Button fullWidth variant="contained" onClick={submit}>
          {isLoading ? <CircularProgress size="1.7rem" /> : '수정하기'}
        </Button>
      )}
    </EditEquipmentForm>
  );
}

const EditEquipmentForm = styled.form`
  width: 500px;
  height: calc(100vh - 3rem);
  background-color: ${props => props.theme.palette.neutral.main};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;

  > button {
    margin-top: 1.3rem;
  }

  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${props =>
      props.theme.palette.primary.main}; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

export default EditEquipment;
