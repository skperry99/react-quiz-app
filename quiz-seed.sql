-- Question 1
INSERT INTO question (text, category, difficulty) VALUES ('What is the capital of France?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'London', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Paris', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Rome', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Berlin', 0, @question_id);

-- Question 2
INSERT INTO question (text, category, difficulty) VALUES ('Which planet is known as the "Red Planet"? ', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Earth', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Mars', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Venus', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Jupiter', 0, @question_id);

-- Question 3
INSERT INTO question (text, category, difficulty) VALUES ('What is the chemical symbol for water?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'H2O', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'CO2', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'NaCl', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'O2', 0, @question_id);

-- Question 4
INSERT INTO question (text, category, difficulty) VALUES ('In what year did World War II begin?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, '1914', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, '1939', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, '1941', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, '1945', 0, @question_id);

-- Question 5
INSERT INTO question (text, category, difficulty) VALUES ('Who wrote "Hamlet"?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'William Shakespeare', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Charles Dickens', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Jane Austen', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Leo Tolstoy', 0, @question_id);

-- Question 6
INSERT INTO question (text, category, difficulty) VALUES ('What is the largest ocean on Earth?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Atlantic Ocean', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Pacific Ocean', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Indian Ocean', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Arctic Ocean', 0, @question_id);

-- Question 7
INSERT INTO question (text, category, difficulty) VALUES ('What is the name of the first person to step on the moon?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Neil Armstrong', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Buzz Aldrin', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Yuri Gagarin', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Alan Shepard', 0, @question_id);

-- Question 8
INSERT INTO question (text, category, difficulty) VALUES ('Which gas is necessary for life and is released during photosynthesis?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Carbon Dioxide', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Oxygen', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Nitrogen', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Hydrogen', 0, @question_id);

-- Question 9
INSERT INTO question (text, category, difficulty) VALUES ('What is the name of the longest river in the world?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Amazon', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Nile', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Mississippi', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Yangtze', 0, @question_id);

-- Question 10
INSERT INTO question (text, category, difficulty) VALUES ('What is the currency of Japan?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Euro', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Yen', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Dollar', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Pound', 0, @question_id);

-- Question 11
INSERT INTO question (text, category, difficulty) VALUES ('What is the chemical symbol for gold?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Ag', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Au', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Fe', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Cu', 0, @question_id);

-- Question 12
INSERT INTO question (text, category, difficulty) VALUES ('Who painted the Mona Lisa?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Vincent van Gogh', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Pablo Picasso', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Leonardo da Vinci', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Claude Monet', 0, @question_id);

-- Question 13
INSERT INTO question (text, category, difficulty) VALUES ('Which country is known as the "Land of the Rising Sun"?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'China', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'South Korea', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Japan', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Vietnam ', 0, @question_id);

-- Question 14
INSERT INTO question (text, category, difficulty) VALUES ('What is the name of the smallest country in the world?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Monaco', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Vatican City', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'San Marino', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Nauru', 0, @question_id);

-- Question 15
INSERT INTO question (text, category, difficulty) VALUES ('What is the largest planet in our solar system?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Mars', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Jupiter', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Saturn', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Uranus', 0, @question_id);

-- Question 16
INSERT INTO question (text, category, difficulty) VALUES ('Which of these is NOT a primary color?', NULL, 'EASY');
SET @question_id = LAST_INSERT_ID();
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (0, 'Red', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (1, 'Blue', 0, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (2, 'Green', 1, @question_id);
INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (3, 'Yellow', 0, @question_id);

