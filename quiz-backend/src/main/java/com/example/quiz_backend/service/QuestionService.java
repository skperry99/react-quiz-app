package com.example.quiz_backend.service;

import com.example.quiz_backend.dto.QuestionDto;
import com.example.quiz_backend.dto.QuestionRequest;
import com.example.quiz_backend.model.Difficulty;
import com.example.quiz_backend.model.Option;
import com.example.quiz_backend.model.Question;
import com.example.quiz_backend.repository.QuestionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // ===== Read methods =====

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public QuestionDto getQuestionById(Long id) {
        Question q = questionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Question not found"
                ));
        return toDto(q);
    }

    // ===== Create / Update / Delete =====

    public QuestionDto createQuestion(QuestionRequest request) {
        validateRequest(request);

        Question question = new Question();
        applyRequestToEntity(request, question);

        Question saved = questionRepository.save(question);
        return toDto(saved);
    }

    public QuestionDto updateQuestion(Long id, QuestionRequest request) {
        validateRequest(request);

        Question existing = questionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Question not found"
                ));

        // Clear existing options (orphanRemoval=true should handle delete)
        existing.getOptions().clear();

        applyRequestToEntity(request, existing);

        Question saved = questionRepository.save(existing);
        return toDto(saved);
    }

    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Question not found"
            );
        }
        questionRepository.deleteById(id);
    }

    // ===== Helpers =====

    private void validateRequest(QuestionRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
        }
        if (request.text() == null || request.text().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Question text is required");
        }
        if (request.options() == null || request.options().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one option is required");
        }
        if (request.correctAnswer() == null || request.correctAnswer().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "correctAnswer is required");
        }
        if (!request.options().contains(request.correctAnswer())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "correctAnswer must match one of the options");
        }
    }

    private void applyRequestToEntity(QuestionRequest request, Question question) {
        question.setText(request.text());
        question.setCategory(request.category());

        Difficulty difficulty = request.difficulty() != null
                ? request.difficulty()
                : Difficulty.EASY;
        question.setDifficulty(difficulty);

        List<Option> newOptions = new ArrayList<>();
        List<String> optionTexts = request.options();

        for (int i = 0; i < optionTexts.size(); i++) {
            String optionText = optionTexts.get(i);

            Option o = new Option();
            o.setOptionIndex(i);
            o.setText(optionText);
            o.setCorrect(optionText.equals(request.correctAnswer()));

            // Use helper on Question to keep relationship consistent
            question.addOption(o);
            newOptions.add(o);
        }
    }

    private QuestionDto toDto(Question question) {
        List<String> options = question.getOptions().stream()
                .sorted((o1, o2) -> Integer.compare(o1.getOptionIndex(), o2.getOptionIndex()))
                .map(Option::getText)
                .toList();

        String correctAnswer = question.getOptions().stream()
                .filter(Option::isCorrect)
                .findFirst()
                .map(Option::getText)
                .orElse(null);

        return new QuestionDto(
                question.getId(),
                question.getText(),
                options,
                correctAnswer
        );
    }
}
