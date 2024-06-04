'use client';

import { Grid, Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';
import Head from 'next/head'

export function HeroContentLeft() {
  return (
    <div className={classes.hero}>
      {/* <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      /> */}
      <Grid mt="sm" className={classes.grid}>
         <Grid.Col span={6}>
           <Container className={classes.container} size="lg">
             <Title className={classes.title}>An organised repository of exam questions, ranked by you.</Title>
             <Text className={classes.description} size="xl" mt="xl">
               Stop practising without purpose. <br/> Find questions at any difficulty you want,  on the syllabus relevant to you. <br/>
               Discuss and share questions and solutions among your peers. 
             </Text>
             <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
             Get started
             </Button>
           </Container>
         </Grid.Col>
       </Grid>
    </div>
  );
}