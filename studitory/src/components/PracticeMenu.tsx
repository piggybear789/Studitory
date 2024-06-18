import React, { useState } from 'react';
import { Grid, Button, Slider, Title, Text, Notification } from '@mantine/core';
import { SearchableSelect } from './SearchableSelect';
import { SelectList } from './SelectList';
import classes from './PracticeMenu.module.css';


type PracticeMenuProps = {
  onGenerateQuestions: ({ syllabus, grade, subject, difficulty }: { syllabus: string | null, grade: string | null, subject: string | null, difficulty: number }) => void;
  syllabusOptions: string[];
  gradeOptions: string[];
  subjectOptions: string[];
  topicOptions: string[];
};

export function PracticeMenu({ onGenerateQuestions, syllabusOptions, gradeOptions, subjectOptions, topicOptions }: PracticeMenuProps) {
  const [syllabus, setSyllabus] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState(50);
  const [error, setError] = useState<string | null>(null);

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
    onGenerateQuestions({ syllabus, grade, subject, difficulty });
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
          <SelectList />
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
            onChange={setDifficulty} // Update slider value
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
