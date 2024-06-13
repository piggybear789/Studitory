'use client';
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { Button, Slider, Title, Text, Grid, Container } from '@mantine/core';
import classes from './PracticeTool.module.css'; // Import CSS module for styling

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
      <Grid className={classes.Grid} styles={{
      inner: { height: '100%'}
        }}>
        <Grid.Col span={12} className={classes.Header}>
          <Text>Topic</Text>
          <Text>Time Elapsed: 02:33</Text>
        </Grid.Col>

        <Grid.Col span={6} className={classes.Left}>
          {/* Content for the left grid */}
          Left content
        </Grid.Col>

        <Grid.Col span={6} className={classes.RightTop}>
          {/* Content for the right-top grid */}
          Right top content
        </Grid.Col>

        <Grid.Col span={6} className={classes.RightBottom}>
          {/* Content for the right-bottom grid */}
          Right bottom content
        </Grid.Col>
      </Grid>
    </div>
  );
}
