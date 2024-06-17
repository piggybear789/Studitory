import React, { useState, useEffect } from 'react';
import '@mantine/core/styles.css';
import { Button, Title, Text } from '@mantine/core';
import TipTap from './RichTextEditor';
import '@mantine/tiptap/styles.css';
import Timer from './Timer';
import classes from './PracticeTool.module.css';

type PracticeToolProps = {
  syllabus: string | null;
  grade: string | null;
  subject: string | null;
  difficulty: number;
};

export function PracticeTool({ syllabus, grade, subject, difficulty }: PracticeToolProps) {
  const [startTimestamp, setStartTimestamp] = useState<number>(new Date().getTime());

  useEffect(() => {
    setStartTimestamp(new Date().getTime());
  }, []);

  return (
    <div className={classes.Main}>
      <div className={classes.Header}>
        <Text>Topic</Text>
        <Timer startTimestamp={startTimestamp} />
      </div>

      <div className={classes.NonHeaderContent}>
        <div className={classes.Left}>
          <div className={classes.QuestionHeader}>
            <Text>Question #643</Text>
            <Text>Difficulty: 75%</Text>
          </div>
          <div className={classes.Question}>
            <Text>
              Given 50 cards with the integers 1, 2, 3, ... 50 printed on them,
              how many ways are there to select 9 distinct cards, such that no two cards
              have consecutive numbers printed on them?
            </Text>
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
