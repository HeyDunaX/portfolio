import avatarImage from '../assets/avatar.png';
import blogCoverImage from '../assets/thumbnail1.jpg';

export const brandName = 'The AI workspace that works for you.';

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/trannhan.duy.9' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@dunadev05?_t=8oAvgxAVKxl&_r=1' },
  { label: 'Instagram', href: 'https://www.instagram.com/_duynhan_?igsh=MWRwcXFqN2Y1MW53aQ==' },
  { label: 'GitHub', href: 'https://github.com/HeyDunaX' },
];

export const heroStats = [
  { label: 'Current status', value: 'First-year student', detail: 'Posts and Telecommunications Institute of Technology (PTIT)' },
  { label: 'Research role', value: 'Research assistant', detail: 'URA Research Group, Ho Chi Minh City University of Technology (HCMUT)' },
  { label: 'Focus area', value: 'AI researcher', detail: 'Low-resource NLP, writing, and research communication' },
];

export const researchHighlights = [
  {
    title: 'Low-resource neural machine translation',
    copy: 'I study how data augmentation, typology, and multilingual adaptation affect translation quality in under-resourced languages.',
    label: 'NLP',
  },
  {
    title: 'Research-first product thinking',
    copy: 'I organize work so findings can move from experiments into a clear, readable, and reusable system.',
    label: 'Workflow',
  },
  {
    title: 'Writing and publication support',
    copy: 'I keep the writing stack simple: structured markdown, editable media, and a publication flow that is easy to maintain.',
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
    summary: 'A systematic study of data augmentation for Tày–Vietnamese and Bahnar–Vietnamese machine translation, with typology-aware analysis and new bilingual resources.',
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
    summary: 'Draft slot reserved for an upcoming main-track submission.',
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
    summary: 'Research placeholder card for the publication feed.',
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
    summary: 'Second placeholder card for layout testing.',
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
    title: 'HCMC Youth Innovation Festival',
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
  { year: '2025', title: 'Encouragement Prize, 31st National Youth Informatics Competition', category: 'National', color: '#1857ff' },
  { year: '2025', title: 'First Prize, Southern Regional Youth Informatics Competition', category: 'Regional', color: '#0f8a5f' },
  { year: '2025', title: 'Second Prize, City Youth Informatics Competition', category: 'City', color: '#a36d00' },
  { year: '2024–2025', title: 'Second Prize, City Scientific Research Competition, system software category', category: 'Research', color: '#1857ff' },
  { year: '2025', title: 'Bronze Medal, 13th Design, Fabrication, and Application Contest', category: 'Technical', color: '#a36d00' },
  { year: '2025', title: 'Second Prize, HSU Programming Challenge', category: 'Programming', color: '#1857ff' },
  { year: '2023–2024', title: 'Second Prize, City Scientific Research Competition, system software category', category: 'Research', color: '#1857ff' },
  { year: '2024', title: 'Encouragement Prize, City Youth Informatics Competition', category: 'City', color: '#6f6b64' },
  { year: '2024', title: 'Encouragement Prize, AI Creativity Challenge at the Space Science Day', category: 'AI', color: '#6f6b64' },
  { year: '2024', title: 'Encouragement Prize, Markethon Competition', category: 'Business', color: '#6f6b64' },
  { year: '2023', title: 'Bronze Medal, 11th Design, Fabrication, and Application Contest', category: 'Technical', color: '#a36d00' },
  { year: '2023', title: 'Encouragement Prize, 18th Youth and Children Creativity Contest', category: 'Creative', color: '#6f6b64' },
];

export const profileImage = avatarImage;