package com.example.quiz_backend.dto;

import com.example.quiz_backend.model.Difficulty;

import java.util.List;

public record QuestionRequest(
        String text,
        String category,
        Difficulty difficulty,
        List<String> options,
        String correctAnswer
) {}
