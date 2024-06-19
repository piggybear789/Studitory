import React from 'react';
import '@mantine/core/styles.css';
import { NavbarSimple } from '@/components/NavbarSimple';
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
  return (
    <div style={{ display: 'flex' }}>
      <NavbarSimple />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LandingHeaderMenu links={homelinks} />
        <div style={{ flex: 1 }}>
          <PracticeMenu />
        </div>
      </div>
    </div>
  );
}
