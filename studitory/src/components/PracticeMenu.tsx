'use client'
import '@mantine/core/styles.css'
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { SearchableSelect } from './SearchableSelect';
import { useDisclosure } from '@mantine/hooks';
import { Title, Text, Grid, Skeleton, Container } from '@mantine/core';
import classes from '../components/PracticeMenu.module.css'


export function PracticeMenu() {
    const [opened, { toggle }] = useDisclosure();
    const [loading, setLoading] = useState(true);

    const child = <Skeleton height={700} radius="md" animate={false}> </Skeleton> ;
    return (
        <Container fluid bg="var(--mantine-color-white)"> 
        <Grid>
            <Grid.Col span={{ base: 4, xs: 4 }}>
                {/* <Skeleton height={700} radius="md" animate={false} visible={loading}> */}
                <div style={{ paddingBlock: '1rem' }}>
                        <Title order={2}> Syllabus: </Title>
                </div>
                    <SearchableSelect/>
                <div style={{ paddingBlock: '1rem' }}>
                        <Title order={2}> Grade: </Title>
                </div>
                    <SearchableSelect/>
                <div style={{ paddingBlock: '1rem' }}>
                        <Title order={2}> Subject: </Title>
                </div>
                    <SearchableSelect/>    
                {/* </Skeleton>  */}
            </Grid.Col>
            <Grid.Col span={{ base: 4, xs: 4 }}>{child}</Grid.Col>
            <Grid.Col span={{ base: 4, xs: 4 }}>{child}</Grid.Col>
        </Grid>
          <button onClick={toggle}>Click me</button>
        </Container>
    );
  }
  