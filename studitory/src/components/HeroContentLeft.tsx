'use client';

import { Grid, Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';
import Link from 'next/link';

export function HeroContentLeft() {
  return (
    <div className={classes.hero}>
      <Grid mt="sm" className={classes.grid}>
        <Grid.Col span={6}>
          <Container className={classes.container} size="lg">
            <Title className={classes.title}>An organised repository of exam questions, ranked by you.</Title>
            <Text className={classes.description} size="xl" mt="xl">
              Stop practising without purpose. <br /> Find questions at any difficulty you want, on the syllabus relevant to you. <br />
              Discuss and share questions and solutions among your peers.
            </Text>
            <Link href="/Portal" passHref>
              <Button component="a" variant="gradient" size="xl" radius="xl" className={classes.control}>
                Get started
              </Button>
            </Link>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}
