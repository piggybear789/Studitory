'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Button, Slider, Title, Text, Notification } from '@mantine/core';
import { SearchableSelect } from './SearchableSelect';
import classes from './PracticeMenu.module.css';
import { supabase } from '../utils/supabase/client';

type PracticeMenuProps = {};

export function PracticeMenu({}: PracticeMenuProps) {
  const [syllabusOptions, setSyllabusOptions] = useState<string[]>([]);
  const [gradeOptions, setGradeOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);

  const [syllabus, setSyllabus] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState(50);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data: syllabusData, error: syllabusError } = await supabase.from("DIM_PRIMARY_QUESTION").select("SYLLABUS");
        const { data: gradeData, error: gradeError } = await supabase.from("DIM_PRIMARY_QUESTION").select("GRADE");
        const { data: subjectData, error: subjectError } = await supabase.from("DIM_PRIMARY_QUESTION").select("SUBJECT");
        const { data: topicData, error: topicError } = await supabase.from("DIM_PRIMARY_QUESTION").select("TOPIC");

        if (syllabusError || gradeError || subjectError || topicError) {
          throw new Error('Error fetching options from Supabase');
        }

        setSyllabusOptions(syllabusData?.map((item) => item.SYLLABUS) ?? []);
        setGradeOptions(gradeData?.map((item) => item.GRADE) ?? []);
        setSubjectOptions(subjectData?.map((item) => item.SUBJECT) ?? []);
        setTopicOptions(topicData?.map((item) => item.TOPIC) ?? []);
      } catch (error) {
        console.error('Error fetching options:', error);
        setError('Failed to fetch options from Supabase');
      }
    };

    fetchOptions();
  }, []);

  const getFlavorText = (value: number) => {
    if (value <= 20) return 'Very Easy - Great for beginners!';
    if (value <= 40) return 'Easy - A nice challenge.';
    if (value <= 60) return 'Medium - For those who want a bit of a test.';
    if (value <= 80) return 'Hard - A tough challenge ahead!';
    return 'Very Hard - Only the brave should attempt!';
  };

  const handleGenerateQuestions = () => {
    if (!syllabus || !grade || !subject) {
      setError('Please fill out all fields before generating questions.');
      return;
    }
    setError(null);

    const params = new URLSearchParams({
      syllabus: syllabus ?? '',
      grade: grade ?? '',
      subject: subject ?? '',
      topic: topic ?? '',
      difficulty: String(difficulty),
    }).toString();

    // Navigate to the client-side route
    window.location.href = `/PracticeTool?${params}`;
  };

  return (
    <div className={classes.Main}>
      <Grid gutter={{ base: '2rem' }}>
        <Grid.Col span={{ base: 3.5 }}>
          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Syllabus:</Title>
          </div>
          <SearchableSelect value={syllabus} onChange={setSyllabus} data={syllabusOptions} />

          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Grade:</Title>
          </div>
          <SearchableSelect value={grade} onChange={setGrade} data={gradeOptions} />

          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Subject:</Title>
          </div>
          <SearchableSelect value={subject} onChange={setSubject} data={subjectOptions} />
        </Grid.Col>
        <Grid.Col span={{ base: 3.5 }}>
          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Topics:</Title>
          </div>
          <SearchableSelect value={topic} onChange={setTopic} data={topicOptions} />
        </Grid.Col>
        <Grid.Col span={{ base: 3.5 }}>
          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Difficulty:</Title>
          </div>
          <div style={{ paddingBlock: '0.5rem 2rem' }}>
            <Text>Choose the level of difficulty you want to attempt</Text>
          </div>
          <Slider
            color="blue"
            value={difficulty}
            onChange={setDifficulty}
            marks={[
              { value: 20, label: '20' },
              { value: 40, label: '40' },
              { value: 60, label: '60' },
              { value: 80, label: '80' },
            ]}
          />
          <Text style={{ paddingBlock: '3rem 1rem' }}>Current Difficulty: {difficulty}</Text>
          <Text>{getFlavorText(difficulty)}</Text>
        </Grid.Col>
      </Grid>
      {error && (
        <Notification color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}
      <Button onClick={handleGenerateQuestions} style={{ marginTop: '1rem' }}>
        Generate Questions
      </Button>
    </div>
  );
}
