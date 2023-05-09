package com.example.detecto.api;


import com.example.detecto.data.RespData;
import com.example.detecto.dto.ReportSearchDto;
import com.example.detecto.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<?> search(@ModelAttribute ReportSearchDto reportSearchDto){
        RespData result = reportService.search(reportSearchDto);
        return result.get();
    }
}
