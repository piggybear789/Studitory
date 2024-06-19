'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Button, Slider, Title, Text, Notification } from '@mantine/core';
import { SearchableSelect } from './SearchableSelect';
import classes from './PracticeMenu.module.css';
import { supabase } from '../utils/supabase/client';
import { SelectList } from './SelectList';

type PracticeMenuProps = {};

export function PracticeMenu({}: PracticeMenuProps) {
  const [syllabusOptions, setSyllabusOptions] = useState<string[]>([]);
  const [gradeOptions, setGradeOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);

  const [syllabus, setSyllabus] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(50);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSyllabusOptions = async () => {
      try {
        const { data, error } = await supabase.from("DIM_PRIMARY_QUESTION").select("SYLLABUS");
        if (error) throw error;
        const uniqueSyllabus = Array.from(new Set(data?.map((item) => item.SYLLABUS) ?? []));
        setSyllabusOptions(uniqueSyllabus);
      } catch (error) {
        console.error('Error fetching syllabus options:', error);
        setError('Failed to fetch syllabus options from Supabase');
      }
    };

    fetchSyllabusOptions();
  }, []);

  useEffect(() => {
    if (!syllabus) return;

    const fetchGradeOptions = async () => {
      try {
        const { data, error } = await supabase
          .from("DIM_PRIMARY_QUESTION")
          .select("GRADE")
          .eq("SYLLABUS", syllabus);
        if (error) throw error;
        const uniqueGrades = Array.from(new Set(data?.map((item) => item.GRADE) ?? []));
        setGradeOptions(uniqueGrades);
      } catch (error) {
        console.error('Error fetching grade options:', error);
        setError('Failed to fetch grade options from Supabase');
      }
    };

    fetchGradeOptions();
  }, [syllabus]);

  useEffect(() => {
    if (!syllabus || !grade) return;

    const fetchSubjectOptions = async () => {
      try {
        const { data, error } = await supabase
          .from("DIM_PRIMARY_QUESTION")
          .select("SUBJECT")
          .eq("SYLLABUS", syllabus)
          .eq("GRADE", grade);
        if (error) throw error;
        const uniqueSubjects = Array.from(new Set(data?.map((item) => item.SUBJECT) ?? []));
        setSubjectOptions(uniqueSubjects);
      } catch (error) {
        console.error('Error fetching subject options:', error);
        setError('Failed to fetch subject options from Supabase');
      }
    };

    fetchSubjectOptions();
  }, [syllabus, grade]);

  useEffect(() => {
    if (!syllabus || !grade || !subject) return;

    const fetchTopicOptions = async () => {
      try {
        const { data, error } = await supabase
          .from("DIM_PRIMARY_QUESTION")
          .select("TOPIC")
          .eq("SYLLABUS", syllabus)
          .eq("GRADE", grade)
          .eq("SUBJECT", subject);
        if (error) throw error;
        const uniqueTopics = Array.from(new Set(data?.map((item) => item.TOPIC) ?? []));
        setTopicOptions(uniqueTopics);
      } catch (error) {
        console.error('Error fetching topic options:', error);
        setError('Failed to fetch topic options from Supabase');
      }
    };

    fetchTopicOptions();
  }, [syllabus, grade, subject]);

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
      difficulty: String(difficulty),
    });

    if (topics.length > 0) {
      topics.forEach(topic => {
        params.append('topic', topic);
      });
    }

    window.location.href = `/PracticeTool?${params.toString()}`;
  };

  return (
    <div className={classes.Main}>
      <Grid gutter= '2rem' >
        <Grid.Col span={4}>
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

        <Grid.Col span={4}>
          <div style={{ paddingBlock: '1rem' }}>
            <Title order={2}>Topics:</Title>
          </div>
          <SelectList value={topics} onChange={setTopics} data={topicOptions} multiple />
        </Grid.Col>

        <Grid.Col span={4}>
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
