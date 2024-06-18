'use client';
import React from 'react';
import '@mantine/core/styles.css';
import { NavbarSimple } from '@/components/NavbarSimple';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { LandingHeaderMenu } from '../../components/LandingHeader1';
import { PracticeTool } from '../../components/PracticeTool';

export default function PracticeToolPage() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div style={{ display: 'flex' }}>
      <NavbarSimple />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LandingHeaderMenu links={homelinks} />
        <div style={{ flex: 1, display:'flex', flexDirection:'column', marginBottom: '1rem'}}>
        <PracticeTool syllabus={null} grade={null} subject={null} difficulty={0}/>
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
