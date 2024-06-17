'use client';
import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import Link from 'next/link';
import classes from './NavbarSimple.module.css';

const data = [
  { link: '/PracticeTool', label: 'Practice Tool', icon: IconBellRinging },
  { link: '', label: 'Question History', icon: IconReceipt2 },
  { link: '', label: 'Discussion', icon: IconFingerprint },
  { link: '', label: 'Notes', icon: IconKey },
  { link: '', label: 'Puzzles', icon: IconDatabaseImport },
  { link: '', label: 'Analytics', icon: Icon2fa },
  { link: '', label: 'Settings', icon: IconSettings },
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link href={item.link} key={item.label} passHref>
      <a
        className={classes.link}
        data-active={item.label === active || undefined}
        onClick={(event) => {
          if (!item.link) {
            event.preventDefault();
          }
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
