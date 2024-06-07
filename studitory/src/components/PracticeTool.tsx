'use client';
import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { SearchableSelect } from './SearchableSelect';
import { SelectList } from './SelectList';
import { Button, Slider, Title, Text, Grid, Container, MenuDivider } from '@mantine/core';
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
    <Grid>
        <Grid.Col span={{ base: 12 }} className={classes.Header}> 
        <Text>Topic</Text>
        <Text>Time Elapsed: 02:33</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 7 }}> 
        </Grid.Col>
        <Grid.Col span={{ base: 5 }}> Hello
        </Grid.Col>
        <Grid.Col span={{ base: 5 }}> Hello
        </Grid.Col>
    </Grid>
</div>
  );
}