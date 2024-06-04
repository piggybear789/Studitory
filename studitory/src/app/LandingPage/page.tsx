import React from 'react';
import { LandingHeaderMenu } from '../../components/LandingHeader';
import { HeroContentLeft } from '@/components/HeroContentLeft';
import '@mantine/core/styles.css';

const homelinks = [
  { link: '#1',
    label: 'About Us',
    links: [
      { link: '/AboutTeam', label: 'Team'},
      { link: '/AboutMethodology', label: 'Methodology'},
    ]
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
      { link: '/demo', label: 'Book a Demo' },
    ],
  },
];

export default function LandingPage() {
  return (
    <div>
      <LandingHeaderMenu links = {homelinks}/>
      <HeroContentLeft />
    </div>
  );
}

