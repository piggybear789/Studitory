'use client';
import React from 'react';
import '@mantine/core/styles.css'
import { NavbarSimple } from '@/components/NavbarSimple';
import { useDisclosure } from '@mantine/hooks';
import { LandingHeaderMenu } from '../../components/LandingHeader'


export default function Portal() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div> <LandingHeaderMenu links = {homelinks}/> <NavbarSimple/> 
    </div>
  );
}

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