'use client';
import React, { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { Text } from '@mantine/core';
import TipTap from './RichTextEditor';
import Timer from './Timer';
import classes from './PracticeTool.module.css';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../utils/supabase/client';

export function PracticeTool() {
  const [startTimestamp, setStartTimestamp] = useState<number>(new Date().getTime());
  const [question, setQuestion] = useState<string | null>(null);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState<number | null>(null);
  const searchParams = useSearchParams();

  const syllabus = searchParams.get('syllabus');
  const grade = searchParams.get('grade');
  const subject = searchParams.get('subject');
  const topic = searchParams.get('topic');
  const difficultyString = searchParams.get('difficulty');
  const difficulty = difficultyString ? parseInt(difficultyString, 10) : 50;

  useEffect(() => {
    setStartTimestamp(new Date().getTime());
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      console.log('Fetching questions with:', { syllabus, grade, subject, topic, difficulty });
      try {
        const { data: questionData, error: questionError } = await supabase.rpc('get_random_question', {
          p_syllabus: syllabus || null,
          p_grade: grade || null,
          p_subject: subject || null,
          p_topic: topic || null,
          p_difficulty_min: difficulty - 5,
          p_difficulty_max: difficulty + 5,
        });

        if (questionError) {
          throw questionError;
        }

        if (questionData && questionData.length > 0) {
          const questionDisplayed = questionData[0];
          setQuestion(questionDisplayed.question);
          setQuestionId(questionDisplayed.id);
          setDifficultyLevel(questionDisplayed.difficulty);
        } else {
          setQuestion('No question found for the given parameters.');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
        setQuestion('Error fetching question. Please try again.');
      }
    };

    if (syllabus && grade && subject && topic) {
      fetchQuestion();
    }
  }, [syllabus, grade, subject, topic, difficulty]);

  return (
    <div className={classes.Main}>
      <div className={classes.Header}>
        <Text>{syllabus} {'>'} {grade} {'>'} {subject} {'>'} {topic}</Text>
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
            <TipTap/>
          </div>
          <div className={classes.RightBottom}>
            <Text>Discussion Section</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
