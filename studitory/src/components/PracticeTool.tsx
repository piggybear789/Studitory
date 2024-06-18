import React, { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { Button, Title, Text } from '@mantine/core';
import TipTap from './RichTextEditor';
import '@mantine/tiptap/styles.css';
import Timer from './Timer';
import classes from './PracticeTool.module.css';
import { createClient } from '../utils/supabase/client';

type PracticeToolProps = {
  syllabus: string | null;
  grade: string | null;
  subject: string | null;
  difficulty: number;
};

export function PracticeTool({ syllabus, grade, subject, difficulty }: PracticeToolProps) {
  const [startTimestamp, setStartTimestamp] = useState<number>(new Date().getTime());
  const [question, setQuestion] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<number | null>(null); 
  const [difficultyLevel, setDifficultyLevel] = useState<number | null>(null);

  useEffect(() => {
    setStartTimestamp(new Date().getTime());
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const fetchQuestion = async () => {
      console.log('Fetching questions with:', { syllabus, grade, subject, difficulty });
    
      const { data, error } = await supabase
        .rpc('get_question', {
          syllabus_input: syllabus,
          grade_input: grade,
          subject_input: subject,
          difficulty_input: difficulty,
        });

      if (error) {
        console.error('Error fetching question:', error);
        setQuestion('Error fetching question. Please try again.');
        return;
      }

      if (data && data.length > 0) {
        const questionData = data[0];
        setQuestion(questionData.question);
        setQuestionId(questionData.id); // Set the question ID
        setDifficultyLevel(questionData.difficulty); // Set the difficulty level
      } else {
        setQuestion('No question found for the given parameters.');
      }
    };

    if (syllabus && grade && subject) {
      fetchQuestion();
    }
  }, [syllabus, grade, subject, difficulty]);

  return (
    <div className={classes.Main}>
      <div className={classes.Header}>
        <Text>Topic</Text>
        <Timer startTimestamp={startTimestamp} />
      </div>

      <div className={classes.NonHeaderContent}>
        <div className={classes.Left}>
          <div className={classes.QuestionHeader}>
            <Text>Question #{questionId}</Text>
            <Text>Difficulty: {difficultyLevel}</Text>
          </div>
          <div className={classes.Question}>
            <Text>{question}</Text>
          </div>
        </div>

        <div className={classes.Right}>
          <div className={classes.RightTop}>
            <Text>Free Response</Text>
            <TipTap />
          </div>
          <div className={classes.RightBottom}>
            <Text>Discussion Section</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
