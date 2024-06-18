'use client';
import React, { useEffect, useState }  from 'react';
import '@mantine/core/styles.css';
import { NavbarSimple } from '@/components/NavbarSimple';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { LandingHeaderMenu } from '@/components/LandingHeader1';
import { PracticeMenu } from '@/components/PracticeMenu';
import { createClient } from '@/utils/supabase/client';

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

export default async function Portal() {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const [syllabusOptions, setSyllabusOptions] = useState<string[]>([]);
  const [gradeOptions, setGradeOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);


  useEffect(() => {
    const fetchOptions = async () => {
      const supabase = await createClient();
      const { data: syllabusData } = await supabase.from("DIM_PRIMARY_QUESTIONS").select("SYLLABUS");
      const { data: gradeData } = await supabase.from("DIM_PRIMARY_QUESTIONS").select("GRADE");
      const { data: subjectData } = await supabase.from("DIM_PRIMARY_QUESTIONS").select("SUBJECT");
      const { data: topicData } = await supabase.from("DIM_PRIMARY_QUESTIONS").select("TOPIC");

      setSyllabusOptions(syllabusData?.map((item: any) => item.name) || []);
      setGradeOptions(gradeData?.map((item: any) => item.name) || []);
      setSubjectOptions(subjectData?.map((item: any) => item.name) || []);
      setTopicOptions(subjectData?.map((item: any) => item.name) || []);
    };

  fetchOptions();
}, []);

  // const {
  //   data: {user},
  // } = await supabase.auth.getUser();


  const handleGenerateQuestions = ({ syllabus, grade, subject, difficulty, topic}: { syllabus: string | null, grade: string | null, subject: string | null, topic: string | null, difficulty: number }) => {
    const params = new URLSearchParams({
      syllabus: syllabus ?? '',
      grade: grade ?? '',
      subject: subject  ?? '',
      topic: topic ?? '',
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
          <PracticeMenu 
          onGenerateQuestions={handleGenerateQuestions} 
          syllabusOptions={syllabusOptions}
          gradeOptions={gradeOptions}
          subjectOptions={subjectOptions}
          topicOptions={topicOptions}
          
          />
        </div>
      </div>
    </div>
  );
}
