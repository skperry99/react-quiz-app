package com.example.quiz_backend.service;

import com.example.quiz_backend.dto.QuestionDto;
import com.example.quiz_backend.model.Option;
import com.example.quiz_backend.model.Question;
import com.example.quiz_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private QuestionDto toDto(Question question) {
        List<String> options = question.getOptions().stream()
                .sorted((o1, o2) -> Integer.compare(o1.getOptionIndex(), o2.getOptionIndex()))
                .map(Option::getText)
                .toList();
        String correctAnswer = question.getOptions().stream().filter(Option::isCorrect).findFirst().
                map(Option::getText)
                .orElse(null);
        return new QuestionDto(
                question.getId(),
                question.getText(),
                options,
                correctAnswer
        );
    }
}
