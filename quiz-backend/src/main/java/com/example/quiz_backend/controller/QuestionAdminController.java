package com.example.quiz_backend.controller;

import com.example.quiz_backend.dto.QuestionDto;
import com.example.quiz_backend.dto.QuestionRequest;
import com.example.quiz_backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
public class QuestionAdminController {

    private final QuestionService questionService;

    public QuestionAdminController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // CREATE
    @PostMapping
    public QuestionDto createQuestion(@RequestBody QuestionRequest request) {
        return questionService.createQuestion(request);
    }

    // READ (for the admin table)
    @GetMapping
    public List<QuestionDto> listAll() {
        return questionService.getAllQuestions();
    }

    // UPDATE
    @PutMapping("/{id}")
    public QuestionDto updateQuestion(@PathVariable Long id,
                                      @RequestBody QuestionRequest request) {
        return questionService.updateQuestion(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
