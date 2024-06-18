'use client';
import React from 'react';
import '@mantine/core/styles.css';
import { NavbarSimple } from '@/components/NavbarSimple';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { LandingHeaderMenu } from '@/components/LandingHeader1';
import { PracticeMenu } from '@/components/PracticeMenu';

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

export default function Portal() {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  const handleGenerateQuestions = ({ syllabus, grade, subject, difficulty }: { syllabus: string | null, grade: string | null, subject: string | null, difficulty: number }) => {
    const params = new URLSearchParams({
      syllabus: syllabus ?? '',
      grade: grade ?? '',
      subject: subject  ?? '',
      difficulty: String(difficulty),
    }).toString();

    router.push(`/PracticeTool?${params}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <NavbarSimple />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LandingHeaderMenu links={homelinks} />
        <div style={{ flex: 1 }}>
          <PracticeMenu onGenerateQuestions={handleGenerateQuestions} />
        </div>
      </div>
    </div>
  );
}
