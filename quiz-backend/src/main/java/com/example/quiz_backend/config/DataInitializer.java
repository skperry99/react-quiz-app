package com.example.quiz_backend.config;

import java.util.List;

import com.example.quiz_backend.model.Difficulty;
import com.example.quiz_backend.model.Option;
import com.example.quiz_backend.model.Question;
import com.example.quiz_backend.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initQuestions(QuestionRepository questionRepository) {
        return args -> {
            if (questionRepository.count() > 0) {
                return; // Data already initialized
            }

            //Question 1
            Question q1 = new Question();
            q1.setText("What is the capital of France?");
            q1.setDifficulty(Difficulty.EASY);

            Option q1o1 = new Option();
            q1o1.setOptionIndex(0);
            q1o1.setText("Paris");
            q1o1.setCorrect(true);

            Option q1o2 = new Option();
            q1o2.setOptionIndex(1);
            q1o2.setText("London");

            Option q1o3 = new Option();
            q1o3.setOptionIndex(2);
            q1o3.setText("Rome");

            Option q1o4 = new Option();
            q1o4.setOptionIndex(3);
            q1o4.setText("Berlin");

            q1.addOption(q1o1);
            q1.addOption(q1o2);
            q1.addOption(q1o3);
            q1.addOption(q1o4);

            // Question 2
            Question q2 = new Question();
            q2.setText("Which planet is known as the Red Planet?");
            q2.setDifficulty(Difficulty.EASY);

            Option q2o1 = new Option();
            q2o1.setOptionIndex(0);
            q2o1.setText("Venus");

            Option q2o2 = new Option();
            q2o2.setOptionIndex(1);
            q2o2.setText("Mars");
            q2o2.setCorrect(true);

            Option q2o3 = new Option();
            q2o3.setOptionIndex(2);
            q2o3.setText("Jupiter");

            Option q2o4 = new Option();
            q2o4.setOptionIndex(3);
            q2o4.setText("Mercury");

            q2.addOption(q2o1);
            q2.addOption(q2o2);
            q2.addOption(q2o3);
            q2.addOption(q2o4);

            questionRepository.saveAll(List.of(q1, q2));
        };
    }
}
