package com.example.quiz_backend.controller;

import java.util.List;

import com.example.quiz_backend.dto.QuestionDto;
import com.example.quiz_backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Service;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionDto> getQuestions() {
        return questionService.getAllQuestions();
    }
}
