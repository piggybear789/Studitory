'use client';
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { Button, Slider, Title, Text, Grid, Container } from '@mantine/core';
import TipTap from './RichTextEditor';
import '@mantine/tiptap/styles.css';
import classes from './PracticeTool.module.css'; 

export function PracticeTool() {
  const [opened, { toggle }] = useDisclosure();

  const getFlavorText = (value: number) => {
    if (value <= 20) return 'Very Easy - Great for beginners!';
    if (value <= 40) return 'Easy - A nice challenge.';
    if (value <= 60) return 'Medium - For those who want a bit of a test.';
    if (value <= 80) return 'Hard - A tough challenge ahead!';
    return 'Very Hard - Only the brave should attempt!';
  };

  return (
    <div className={classes.Main}>

      <div className={classes.Header}>
          <Text>Topic</Text>
          <Text>Time Elapsed: 02:33</Text>
      </div>

      <div className={classes.NonHeaderContent}>
        <div className={classes.Left}>
          <div className={classes.QuestionHeader}>
            <Text>Question #643</Text>
            <Text>Difficulty: 75%</Text>
          </div>
          <div className={classes.Question}>
            <Text>Given 50 cards with the integers 1, 2, 3, 
              ... 50 printed on them, how many ways are there
               to select 9 distinct cards, such that no two cards
                have consecutive numbers printed on them?</Text>
          </div>
        </div>

        <div className={classes.Right}>
          <div className={classes.RightTop}>
            <Text> Free Response </Text>
            <TipTap/>
          </div>
          <div className={classes.RightBottom}>
            Right bottom content
          </div>
        </div>
 
      </div>
      
    </div>
  );
}
