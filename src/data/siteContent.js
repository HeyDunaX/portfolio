import avatarImage from '../assets/avatar.png';
import blogCoverImage from '../assets/thumbnail1.jpg';
import { FaAward, FaMedal, FaTrophy } from 'react-icons/fa';

export const brandName = 'The AI workspace that works for you.';

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/trannhan.duy.9' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@dunadev05?_t=8oAvgxAVKxl&_r=1' },
  { label: 'Instagram', href: 'https://www.instagram.com/_duynhan_?igsh=MWRwcXFqN2Y1MW53aQ==' },
  { label: 'GitHub', href: 'https://github.com/HeyDunaX' },
];

export const heroStats = [
  { label: 'Academic status', value: 'Year 1 student', detail: 'Posts and Telecommunications Institute of Technology (PTIT)' },
  { label: 'Research appointment', value: 'Research assistant', detail: 'URA Research Group, Ho Chi Minh City University of Technology (HCMUT)' },
  { label: 'Research focus', value: 'AI researcher', detail: 'Low-resource NLP, scientific writing, and research communication' },
];

export const researchHighlights = [
  {
    title: 'Low-resource machine translation',
    copy: 'I study how data augmentation, typology, and multilingual adaptation affect translation quality in low-resource language settings.',
    label: 'NLP Research',
  },
  {
    title: 'Evidence-driven research workflow',
    copy: 'I organize work so findings move from experiments into a clear, readable, and reusable system.',
    label: 'Workflow',
  },
  {
    title: 'Scientific writing and publishing',
    copy: 'I keep the writing stack structured: markdown content, editable media, and a publication flow that is easy to maintain.',
    label: 'Publishing',
  },
];

export const publicationsSeed = [
  {
    id: 'publication-2026-typology-aware-study',
    postType: 'publication',
    status: 'published',
    featured: true,
    year: '2026',
    venue: 'AAAI 2026 Workshop LM4UC, Singapore',
    title: 'Not All Data Augmentation Works: A Typology-Aware Study for Low-Resource Neural Machine Translation in Vietnamese Ethnic Minority Languages',
    authors: 'Long Nguyen, Dat T. Truong, Nhan D. Tran, Quynh Vo, Quy Tran Nguyen, Tho Quan',
    summary: 'A typology-aware study of data augmentation for Tày–Vietnamese and Bahnar–Vietnamese machine translation, with new bilingual resources.',
    content: `## Abstract

Neural machine translation for low-resource and underserved languages remains constrained by limited parallel corpora, weak linguistic tooling, and small evaluation sets. This work studies data augmentation across two Vietnamese minority-language pairs, Tày–Vietnamese and Bahnar–Vietnamese, using a three-stage pipeline of Vietnamese-based initialization, monolingual adaptation, and supervised fine-tuning.

## Contribution

- We isolate augmentation effects with two independent encoder-decoder systems.
- We analyze how linguistic typology changes augmentation behavior.
- We release newly digitized bilingual resources and trained models to support future work.
`,
    tags: ['Low-resource NMT', 'Data augmentation', 'Typology'],
    coverImage: blogCoverImage,
    externalUrl: 'https://openreview.net/forum?id=XziOk4BTfv',
    readingMinutes: 6,
  },
  {
    id: 'publication-2026-placeholder-main-track',
    postType: 'publication',
    status: 'draft',
    featured: false,
    year: '2026',
    venue: 'Main track',
    title: 'Anonymous',
    authors: 'Anonymous',
    summary: 'Reserved draft slot for an upcoming main-track submission.',
    content: '## Abstract\n\nAbstract to be added.',
    tags: ['Low-resource NLP', 'Linguistics'],
    coverImage: avatarImage,
    externalUrl: '#',
    readingMinutes: 1,
  },
  {
    id: 'publication-2025-extra-paper-1',
    postType: 'publication',
    status: 'published',
    featured: false,
    year: '2025',
    venue: 'Research archive',
    title: 'Extra Paper 1',
    authors: 'Author A',
    summary: 'Placeholder publication card for the research feed.',
    content: 'Short note for the publication list.',
    tags: ['AI'],
    coverImage: avatarImage,
    externalUrl: '#',
    readingMinutes: 1,
  },
  {
    id: 'publication-2025-extra-paper-2',
    postType: 'publication',
    status: 'published',
    featured: false,
    year: '2025',
    venue: 'Research archive',
    title: 'Extra Paper 2',
    authors: 'Author B',
    summary: 'Second placeholder publication card used for layout validation.',
    content: 'Short note for the publication list.',
    tags: ['ML'],
    coverImage: avatarImage,
    externalUrl: '#',
    readingMinutes: 1,
  },
];

export const blogSeed = [
  {
    id: 'blog-2024-hcmc-youth-innovation-festival',
    postType: 'blog',
    status: 'published',
    featured: true,
    year: '2024',
    venue: 'Press coverage',
    title: 'Coverage: HCMC Youth Innovation Festival',
    authors: 'Duy Nhan',
    summary: 'A public-facing article card that can be edited from the private studio.',
    content: `## Event note

This post preserves the existing site content in English and keeps the same visual role as the original blog thumbnail.

### Why it matters

It demonstrates how publications and blog content can live in one editable, shareable system.
`,
    tags: ['Blog', 'Public writing'],
    coverImage: blogCoverImage,
    externalUrl: 'https://muctim.tuoitre.vn/nhieu-hoat-dong-hap-dan-tai-lien-hoan-tuoi-tre-sang-tao-tphcm-101240518132554576.htm?fbclid=IwZXh0bgNhZW0CMTAAAR0u4_D0AANlUCLW-vmc3Wm4-hEqz_MCqBVSor5JmwCCqCWpu8aj3HbSxs4_aem_51Lt27lpRbd2vrZGYEdbng',
    readingMinutes: 2,
  },
];

export const awards = [
  { year: '2025', title: 'Encouragement Prize, 31st National Youth Informatics Competition', category: 'National', color: '#1857ff', icon: FaAward },
  { year: '2025', title: 'First Prize, Southern Regional Youth Informatics Competition', category: 'Regional', color: '#0f8a5f', icon: FaTrophy },
  { year: '2025', title: 'Second Prize, City Youth Informatics Competition', category: 'City', color: '#a36d00', icon: FaMedal },
  { year: '2024–2025', title: 'Second Prize, City Scientific Research Competition, System Software Category', category: 'Research', color: '#1857ff', icon: FaMedal },
  { year: '2025', title: 'Bronze Medal, 13th Design, Fabrication, and Application Contest', category: 'Technical', color: '#a36d00', icon: FaMedal },
  { year: '2025', title: 'Second Prize, HSU Programming Challenge', category: 'Programming', color: '#1857ff', icon: FaMedal },
  { year: '2023–2024', title: 'Second Prize, City Scientific Research Competition, System Software Category', category: 'Research', color: '#1857ff', icon: FaMedal },
  { year: '2024', title: 'Encouragement Prize, City Youth Informatics Competition', category: 'City', color: '#6f6b64', icon: FaAward },
  { year: '2024', title: 'Encouragement Prize, AI Creativity Challenge at the Space Science Day', category: 'AI', color: '#6f6b64', icon: FaAward },
  { year: '2024', title: 'Encouragement Prize, Markethon Competition', category: 'Business', color: '#6f6b64', icon: FaAward },
  { year: '2023', title: 'Bronze Medal, 11th Design, Fabrication, and Application Contest', category: 'Technical', color: '#a36d00', icon: FaMedal },
  { year: '2023', title: 'Encouragement Prize, 18th Youth and Children Creativity Contest', category: 'Creative', color: '#6f6b64', icon: FaAward },
];

export const profileImage = avatarImage;