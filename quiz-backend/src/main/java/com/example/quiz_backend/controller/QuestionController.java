package com.example.quiz_backend.controller;

import com.example.quiz_backend.dto.QuestionDto;
import com.example.quiz_backend.dto.QuestionRequest;
import com.example.quiz_backend.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // ===== Read =====

    @GetMapping
    public List<QuestionDto> getQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{id}")
    public QuestionDto getQuestion(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    // ===== Create =====

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionDto createQuestion(@RequestBody QuestionRequest request) {
        return questionService.createQuestion(request);
    }

    // ===== Update =====

    @PutMapping("/{id}")
    public QuestionDto updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionRequest request
    ) {
        return questionService.updateQuestion(id, request);
    }

    // ===== Delete =====

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
