'use client';
import React from 'react';
import '@mantine/core/styles.css';
import { NavbarSimple } from '@/components/NavbarSimple';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'next/navigation';
import { LandingHeaderMenu } from '../../components/LandingHeader1';
import { PracticeTool } from '../../components/PracticeTool';

export default function PracticeToolPage() {
  const [opened, { toggle }] = useDisclosure();
  const searchParams = useSearchParams();

  // Extract query parameters
  const syllabus = searchParams.get('syllabus');
  const grade = searchParams.get('grade');
  const subject = searchParams.get('subject');
  const difficulty = searchParams.get('difficulty');

  return (
    <div style={{ display: 'flex' }}>
      <NavbarSimple />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LandingHeaderMenu links={homelinks} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
          <PracticeTool 
            syllabus={syllabus as string | null} 
            grade={grade as string | null} 
            subject={subject as string | null} 
            difficulty={difficulty ? parseInt(difficulty, 10) : 0}
          />
        </div>
      </div>
    </div>
  );
}

const homelinks = [
  {
    link: '#1',
    label: 'Leave Feedback',
    links: [
      { link: '/FeedbackForm', label: 'Feedback Form' },
      { link: '/Socials', label: 'Socials' },
    ],
  },
  {
    link: '#2',
    label: 'Contribute',
    links: [
      { link: '/resources', label: 'Provide Questions' },
      { link: '/forum', label: 'Discussion Forum' },
      { link: '/socials', label: 'FAQ' },
    ],
  },
  {
    link: '#3',
    label: 'For Educators',
    links: [
      { link: '/solutions', label: 'Solutions' },
      { link: '/pricing', label: 'Pricing' },
      { link: '/demo', label: 'Try a Demo' },
    ],
  },
];
