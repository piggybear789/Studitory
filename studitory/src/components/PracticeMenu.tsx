'use client'
import '@mantine/core/styles.css'
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { SearchableSelect } from './SearchableSelect';
import { SelectList } from './SelectList';
import { useDisclosure } from '@mantine/hooks';
import { Button, Slider, Title, Text, Grid, Skeleton, Container } from '@mantine/core';
import classes from '../components/PracticeMenu.module.css'


export function PracticeMenu() {
    const [opened, { toggle }] = useDisclosure();
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState(50); // Initialize slider value to 50

    const getFlavorText = (value: number) => {
        if (value <= 20) return 'Very Easy - Great for beginners!';
        if (value <= 40) return 'Easy - A nice challenge.';
        if (value <= 60) return 'Medium - For those who want a bit of a test.';
        if (value <= 80) return 'Hard - A tough challenge ahead!';
        return 'Very Hard - Only the brave should attempt!';
    };

    return (
        <Container fluid bg="var(--mantine-color-white)"> 
        <Grid>
            <Grid.Col span={{ base: 3 }}>
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
            <Grid.Col span={{ base: 1 }}></Grid.Col>
            <Grid.Col span={{ base: 3 }}>
                <div style={{ paddingBlock: '1rem' }}>
                        <Title order={2}> Topics: </Title>
                </div>
                    <SelectList/>
            </Grid.Col>
            <Grid.Col span={{ base: 1 }}></Grid.Col>
            <Grid.Col span={{ base: 3 }}>
                <div style={{ paddingBlock: '1rem' }}>
                        <Title order={2}> Difficulty: </Title>
                        <Text style={{ marginTop: '1rem' }}> Choose the level of difficulty you want to attempt </Text>
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
                <Text style={{ marginTop: '2rem' }}>Current Difficulty: {difficulty}</Text>
                <Text style={{ marginTop: '1rem' }}>{getFlavorText(difficulty)}</Text>
            </Grid.Col>
        </Grid>
        <Button onClick={toggle} style={{ marginTop: '1rem' }}>Generate Questions</Button>
        </Container>
    );
}
