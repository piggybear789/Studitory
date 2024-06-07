'use client';
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { SearchableSelect } from './SearchableSelect';
import { SelectList } from './SelectList';
import { Button, Slider, Title, Text, Grid, Container, MenuDivider } from '@mantine/core';
import classes from './PracticeMenu.module.css'; // Import CSS module for styling

export function PracticeMenu() {
  const [opened, { toggle }] = useDisclosure();
  const [difficulty, setDifficulty] = useState(50); // Initialize slider value to 50

  const getFlavorText = (value: number) => {
    if (value <= 20) return 'Very Easy - Great for beginners!';
    if (value <= 40) return 'Easy - A nice challenge.';
    if (value <= 60) return 'Medium - For those who want a bit of a test.';
    if (value <= 80) return 'Hard - A tough challenge ahead!';
    return 'Very Hard - Only the brave should attempt!';
  };

  return (
    <div className={classes.Main}>
        <Grid gutter={{ base: '2rem' }}>
          <Grid.Col span={{ base: 3.5 }}>
            <div style={{ paddingBlock: '1rem' }}>
              <Title order={2}>Syllabus:</Title>
            </div>
            <SearchableSelect />
            <div style={{ paddingBlock: '1rem' }}>
              <Title order={2}>Grade:</Title>
            </div>
            <SearchableSelect />
            <div style={{ paddingBlock: '1rem' }}>
              <Title order={2}>Subject:</Title>
            </div>
            <SearchableSelect />
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
            <div style={{ paddingBlock: '0.5rem 2rem'} }>
              <Text>
                Choose the level of difficulty you want to attempt
              </Text>
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
        <Button onClick={toggle} style={{ marginTop: '1rem' }}>Generate Questions</Button>
    </div>
  );
}
