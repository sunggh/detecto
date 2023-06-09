package com.example.detecto.exception.handler;

import com.example.detecto.data.RespData;
import com.example.detecto.entity.enums.ErrorEnum;
import com.example.detecto.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(DoesNotExistData.class)
    public ResponseEntity<?> doesNotExistData(Exception e) {
        return createErrorResponse(ErrorEnum.DOES_NOT_EXIST_DATA_ERROR, e);
    }

    @ExceptionHandler(AlreadyExistData.class)
    public ResponseEntity<?> alreadyBoundException(Exception e) {
        return createErrorResponse(ErrorEnum.ALREADY_EXIST_DATA_ERROR, e);
    }

    @ExceptionHandler(DoesNotExistServer.class)
    public ResponseEntity<?> doesNotExistServer(Exception e){
        return createErrorResponse(ErrorEnum.DOES_NOT_EXIST_SERVER_ERROR, e);
    }

    @ExceptionHandler(InvalidData.class)
    public ResponseEntity<?> invalidData(Exception e){
        return createErrorResponse(ErrorEnum.INVALID_DATA_ERROR, e);
    }

    @ExceptionHandler(DatabaseFetchException.class)
    public ResponseEntity<?> databaseFetchException(Exception e){
        return createErrorResponse(ErrorEnum.FETCH_EXCEPTION_ERROR, e);
    }

    @ExceptionHandler(AuthFailException.class)
    public ResponseEntity<?> authFailException(Exception e){
        return createErrorResponse(ErrorEnum.AUTH_FAIL_ERROR, e);
    }

    @ExceptionHandler(ObjectionException.class)
    public ResponseEntity<?> objectionException(Exception e){
        return createErrorResponse(ErrorEnum.OBJECTION_ERROR, e);
    }

    @ExceptionHandler(MessageException.class)
    public ResponseEntity<?> messageException(Exception e){
        return createErrorResponse(ErrorEnum.MESSAGE_ERROR, e);
    }


    private ResponseEntity<?> createErrorResponse(ErrorEnum errorEnum, Exception e) {

        RespData<Void> data = new RespData(errorEnum);
        data.setMsg(e.getMessage());

        return data.exceptionBuilder();
    }
}
