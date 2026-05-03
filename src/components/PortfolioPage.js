import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Container, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import {
  FaArrowRight,
  FaBars,
  FaBookOpen,
  FaClipboard,
  FaCopy,
  FaEdit,
  FaExternalLinkAlt,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMoon,
  FaPlus,
  FaRegStar,
  FaShareAlt,
  FaSun,
  FaSyncAlt,
  FaTiktok,
  FaTrash,
  FaUnlock,
  FaUserLock,
} from 'react-icons/fa';
import {
  awards,
  blogSeed,
  brandName,
  heroStats,
  profileImage,
  publicationsSeed,
  researchHighlights,
  socialLinks,
} from '../data/siteContent';

const LOCAL_STORAGE_THEME = 'portfolio-theme';
const LOCAL_STORAGE_POSTS = 'portfolio-posts';
const LOCAL_STORAGE_UNLOCKED = 'portfolio-admin-unlocked';

const defaultFormState = {
  id: '',
  postType: 'publication',
  status: 'draft',
  featured: false,
  year: new Date().getFullYear().toString(),
  venue: '',
  title: '',
  authors: '',
  summary: '',
  content: '',
  tags: '',
  coverImage: '',
  externalUrl: '',
  readingMinutes: 1,
};

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL?.trim();
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY?.trim();
const supabaseTable = process.env.REACT_APP_SUPABASE_TABLE?.trim() || 'portfolio_posts';
const adminAccessKey = process.env.REACT_APP_ADMIN_ACCESS_KEY?.trim() || '';
const supabaseReady = Boolean(supabaseUrl && supabaseKey);

const cloneSeedPosts = () => [...publicationsSeed, ...blogSeed].map((post) => ({ ...post }));

const normalizeTags = (tagValue) =>
  String(tagValue || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

const slugify = (input) =>
  String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `post-${Date.now()}`;

const asTagString = (tags) => (Array.isArray(tags) ? tags.join(', ') : String(tags || ''));

const safeMarkdownText = (value) => String(value || '').trim();

function renderInline(text) {
  const tokens = [];
  const pattern = /(!?\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      tokens.push(text.slice(lastIndex, start));
    }

    const token = match[0];
    if (token.startsWith('![')) {
      const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        tokens.push(<img key={`${start}-${token}`} src={imageMatch[2]} alt={imageMatch[1] || ''} />);
      }
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        tokens.push(
          <a key={`${start}-${token}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>,
        );
      }
    } else if (token.startsWith('**')) {
      tokens.push(<strong key={`${start}-${token}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      tokens.push(<code key={`${start}-${token}`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('*')) {
      tokens.push(<em key={`${start}-${token}`}>{token.slice(1, -1)}</em>);
    }

    lastIndex = start + token.length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

function MarkdownRenderer({ markdown }) {
  const blocks = [];
  const lines = safeMarkdownText(markdown).replace(/\r\n/g, '\n').split('\n');
  let index = 0;

  while (index < lines.length) {
    const currentLine = lines[index];
    const trimmedLine = currentLine.trim();

    if (!trimmedLine) {
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith('```')) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <pre key={`code-${index}`}>
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    if (/^#{1,3}\s/.test(trimmedLine)) {
      const headingLevel = Math.min(trimmedLine.match(/^#+/)?.[0].length || 1, 3);
      const headingText = trimmedLine.replace(/^#{1,3}\s/, '');
      const HeadingTag = `h${headingLevel}`;
      blocks.push(<HeadingTag key={`heading-${index}`}>{renderInline(headingText)}</HeadingTag>);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmedLine)) {
      const quoteLines = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={`quote-${index}`}>{renderInline(quoteLines.join(' '))}</blockquote>);
      continue;
    }

    if (/^\d+\.\s/.test(trimmedLine)) {
      const orderedItems = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        orderedItems.push(lines[index].trim().replace(/^\d+\.\s/, ''));
        index += 1;
      }
      blocks.push(
        <ol key={`ordered-${index}`}>
          {orderedItems.map((item, orderedIndex) => (
            <li key={`ordered-item-${orderedIndex}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^(-|\*)\s+/.test(trimmedLine)) {
      const items = [];
      while (index < lines.length && /^(-|\*)\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^(-|\*)\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={`list-${index}`}>
          {items.map((item, listIndex) => (
            <li key={`list-item-${listIndex}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^---+$/.test(trimmedLine)) {
      blocks.push(<hr key={`rule-${index}`} />);
      index += 1;
      continue;
    }

    if (/^!\[[^\]]*\]\([^)]+\)$/.test(trimmedLine)) {
      const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        blocks.push(<img key={`image-${index}`} src={imageMatch[2]} alt={imageMatch[1] || ''} />);
      }
      index += 1;
      continue;
    }

    const paragraphLines = [trimmedLine];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,3}\s/.test(lines[index].trim()) &&
      !/^>\s?/.test(lines[index].trim()) &&
      !/^\d+\.\s/.test(lines[index].trim()) &&
      !/^(-|\*)\s+/.test(lines[index].trim()) &&
      !/^---+$/.test(lines[index].trim()) &&
      !/^```/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={`paragraph-${index}`}>{renderInline(paragraphLines.join(' '))}</p>);
  }

  if (blocks.length === 0) {
    return <p className="mb-0">No content yet.</p>;
  }

  return <div className="markdown-render">{blocks}</div>;
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button type="button" className="theme-toggle" onClick={onToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
      <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

function PublicationCard({ post, onOpen, onEdit, onRemove, onCopy, adminUnlocked }) {
  const tagList = Array.isArray(post.tags) ? post.tags : normalizeTags(post.tags);

  return (
    <article className="publication-card" id={`post-${post.slug}`}>
      <div className="publication-year">
        <span className="year-pill">{post.year}</span>
        <span className="status-pill">{post.postType === 'publication' ? 'Research' : 'Note'}</span>
      </div>
      <div className="publication-body">
        <div className="publication-toolbar">
          <div>
            <h3 className="publication-title">{post.title}</h3>
            <p className="publication-venue">{post.venue}</p>
          </div>
          <div className="card-footer-row">
            {post.externalUrl && post.externalUrl !== '#' ? (
              <a href={post.externalUrl} className="muted-link" target="_blank" rel="noreferrer">
                <FaExternalLinkAlt />
                <span className="visually-hidden">Open source</span>
              </a>
            ) : null}
            <button type="button" className="icon-button" onClick={() => onCopy(post)} aria-label="Copy share link">
              <FaShareAlt />
            </button>
            <button type="button" className="text-button" onClick={() => onOpen(post)}>
              Read <FaArrowRight />
            </button>
          </div>
        </div>
        <p className="publication-summary">{post.summary}</p>
        <div className="publication-footer">
          <div className="post-meta-row">
            <span className="meta-pill"><strong>{post.authors}</strong></span>
            <span className="meta-pill">{post.readingMinutes} min read</span>
          </div>
          <div className="tag-list">
            {tagList.map((tag) => (
              <Badge key={tag} className="tag-pill" bg="transparent">
                {tag}
              </Badge>
            ))}
          </div>
          {adminUnlocked ? (
            <div className="card-footer-row ms-auto">
              <button type="button" className="editor-action" onClick={() => onEdit(post)}>
                <FaEdit /> Edit
              </button>
              <button type="button" className="editor-action" onClick={() => onRemove(post.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ReaderModal({ post, show, onHide, onCopy }) {
  if (!post) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="reader-modal">
      <Modal.Header closeButton>
        <Modal.Title>{post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="reader-card p-0 border-0 shadow-none">
          <div className="reader-meta">
            <span className="year-pill">{post.year}</span>
            <span className="status-pill"><strong>{post.postType}</strong></span>
            {post.readingMinutes ? <span className="status-pill">{post.readingMinutes} min read</span> : null}
          </div>
          {post.coverImage ? (
            <div className="reader-cover">
              <img src={post.coverImage} alt={post.title} />
            </div>
          ) : null}
          <div className="reader-toolbar">
            <div>
              <h3 className="mb-1">{post.venue}</h3>
              <p className="mb-0">{post.authors}</p>
            </div>
            <div className="reader-footer">
              <button type="button" className="reader-share" onClick={() => onCopy(post)}>
                <FaCopy /> Share
              </button>
              {post.externalUrl && post.externalUrl !== '#' ? (
                <a href={post.externalUrl} target="_blank" rel="noreferrer" className="reader-share">
                  <FaExternalLinkAlt /> Open link
                </a>
              ) : null}
            </div>
          </div>
          <MarkdownRenderer markdown={post.content} />
        </div>
      </Modal.Body>
    </Modal>
  );
}

function PrivateLoginModal({ show, onHide, onSubmit, secretValue, onSecretChange, errorMessage, configured }) {
  return (
    <Modal show={show} onHide={onHide} centered className="reader-modal">
      <Modal.Header closeButton>
        <Modal.Title>Private studio login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="studio-locked">
          <p className="editor-note mb-0">
            {configured
              ? 'Enter the private access key to unlock editing. Production deployments should pair this with Supabase Auth and RLS.'
              : 'Define REACT_APP_ADMIN_ACCESS_KEY to enable the private editor flow.'}
          </p>
          <Form className="auth-row" onSubmit={onSubmit}>
            <Form.Control
              type="password"
              placeholder="Access key"
              value={secretValue}
              onChange={(event) => onSecretChange(event.target.value)}
              autoComplete="current-password"
            />
            <button type="submit" className="solid-button">
              <FaUnlock /> Unlock studio
            </button>
          </Form>
          {errorMessage ? <p className="mb-0" role="alert">{errorMessage}</p> : null}
        </div>
      </Modal.Body>
    </Modal>
  );
}

function PortfolioPage() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem(LOCAL_STORAGE_THEME) || 'light');
  const [adminUnlocked, setAdminUnlocked] = useState(() => window.localStorage.getItem(LOCAL_STORAGE_UNLOCKED) === 'true');
  const [unlockValue, setUnlockValue] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [posts, setPosts] = useState(() => {
    const storedPosts = window.localStorage.getItem(LOCAL_STORAGE_POSTS);
    return storedPosts ? JSON.parse(storedPosts) : cloneSeedPosts();
  });
  const [activeFeed, setActiveFeed] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [formState, setFormState] = useState(defaultFormState);
  const [statusMessage, setStatusMessage] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(LOCAL_STORAGE_THEME, theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${brandName} | Duy Nhan`;
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_UNLOCKED, String(adminUnlocked));
  }, [adminUnlocked]);

  useEffect(() => {
    if (!window.location.hash) {
      return undefined;
    }

    const slugFromHash = window.location.hash.replace('#post-', '');
    const match = posts.find((post) => post.slug === slugFromHash || post.id === slugFromHash);
    if (match) {
      setSelectedPost(match);
    }

    return undefined;
  }, [posts]);

  useEffect(() => {
    const remoteLoader = async () => {
      if (!supabaseReady) {
        return;
      }

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/${supabaseTable}?select=*&order=published_at.desc`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          return;
        }

        const remotePosts = await response.json();
        if (Array.isArray(remotePosts) && remotePosts.length > 0) {
          setPosts(
            remotePosts.map((post) => ({
              ...post,
              tags: Array.isArray(post.tags) ? post.tags : normalizeTags(post.tags),
              coverImage: post.coverImage || post.cover_image || '',
              postType: post.postType || post.post_type || 'blog',
              readingMinutes: post.readingMinutes || post.reading_minutes || 1,
              summary: post.summary || post.excerpt || '',
              externalUrl: post.externalUrl || post.external_url || '',
              title: post.title || 'Untitled post',
              id: post.id || post.slug || slugify(post.title),
              slug: post.slug || slugify(post.title),
            })),
          );
        }
      } catch {
        return undefined;
      }
    };

    void remoteLoader();
  }, []);

  const visiblePosts = useMemo(() => {
    return posts
      .filter((post) => activeFeed === 'all' || post.postType === activeFeed)
      .filter((post) => adminUnlocked || post.status === 'published')
      .sort((left, right) => Number(right.year) - Number(left.year));
  }, [posts, activeFeed, adminUnlocked]);

  const featuredPublication = visiblePosts.find((post) => post.featured && post.postType === 'publication') || visiblePosts[0] || null;

  const handleThemeToggle = () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));

  const handleUnlock = () => {
    if (adminAccessKey && unlockValue.trim() !== adminAccessKey) {
      setLoginError('Access code is not valid.');
      return;
    }

    setAdminUnlocked(true);
    setShowLoginModal(false);
    setLoginError('');
    setStatusMessage('Private studio unlocked.');
  };

  const handleLogout = () => {
    setAdminUnlocked(false);
    setUnlockValue('');
    setShowLoginModal(false);
    setStatusMessage('Private studio locked.');
  };

  const handleCopyLink = async (post) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#post-${post.slug || slugify(post.title)}`;

    try {
      await window.navigator.clipboard.writeText(shareUrl);
      setStatusMessage('Share link copied to clipboard.');
    } catch {
      setStatusMessage('Unable to copy link automatically.');
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setFormState(defaultFormState);
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setFormState({
      id: post.id,
      postType: post.postType || 'publication',
      status: post.status || 'draft',
      featured: Boolean(post.featured),
      year: post.year || new Date().getFullYear().toString(),
      venue: post.venue || '',
      title: post.title || '',
      authors: post.authors || '',
      summary: post.summary || '',
      content: post.content || '',
      tags: asTagString(post.tags),
      coverImage: post.coverImage || '',
      externalUrl: post.externalUrl || '',
      readingMinutes: post.readingMinutes || 1,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormState((currentForm) => ({ ...currentForm, coverImage: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const persistToSupabase = async (payload) => {
    if (!supabaseReady) {
      return;
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/${supabaseTable}?on_conflict=id`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify([payload]),
    });

    if (!response.ok) {
      throw new Error('Supabase save failed');
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const normalizedPost = {
      id: editingPostId || formState.id || window.crypto?.randomUUID?.() || slugify(formState.title || `post-${Date.now()}`),
      slug: slugify(formState.title),
      postType: formState.postType,
      status: formState.status,
      featured: formState.featured,
      year: String(formState.year || new Date().getFullYear()),
      venue: formState.venue.trim(),
      title: formState.title.trim(),
      authors: formState.authors.trim(),
      summary: formState.summary.trim(),
      content: formState.content,
      tags: normalizeTags(formState.tags),
      coverImage: formState.coverImage,
      externalUrl: formState.externalUrl.trim(),
      readingMinutes: Number(formState.readingMinutes) || 1,
      updatedAt: new Date().toISOString(),
      publishedAt: formState.status === 'published' ? new Date().toISOString() : null,
    };

    const nextPosts = editingPostId
      ? posts.map((post) => (post.id === editingPostId ? normalizedPost : post))
      : [normalizedPost, ...posts];

    setPosts(nextPosts);

    try {
      await persistToSupabase(normalizedPost);
      setStatusMessage('Post saved locally and sent to Supabase when configured.');
    } catch {
      setStatusMessage('Post saved locally. Configure Supabase to persist remotely.');
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    const nextPosts = posts.filter((post) => post.id !== id);
    setPosts(nextPosts);

    if (supabaseReady) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/${supabaseTable}?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        });
      } catch {
        setStatusMessage('Post removed locally. Remote delete can be retried later.');
      }
    }

    if (editingPostId === id) {
      resetForm();
    }
  };

  const handleOpenPost = (post) => setSelectedPost(post);

  const openLogin = () => {
    setLoginError('');
    setShowLoginModal(true);
  };

  const filteredCounts = {
    all: posts.length,
    publication: posts.filter((post) => post.postType === 'publication').length,
    blog: posts.filter((post) => post.postType === 'blog').length,
  };

  return (
    <div className="App page-shell">
      <header className="site-header">
        <Navbar expand="lg" className="site-navbar" collapseOnSelect>
          <Container fluid="lg">
            <Navbar.Brand href="#home" className="site-brand">
              <span className="brand-mark brand-logo-shell">
                <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Portfolio logo" className="brand-logo" />
              </span>
              <span className="brand-copy">
                <strong>Duy Nhan</strong>
                <span>AI researcher portfolio</span>
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="portfolio-nav" className="border-0 shadow-none" children={<FaBars />} />
            <Navbar.Collapse id="portfolio-nav">
              <Nav className="ms-auto align-items-lg-center site-nav">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#research">Research</Nav.Link>
                <Nav.Link href="#publications">Publications</Nav.Link>
                <Nav.Link href="#studio">Studio</Nav.Link>
                <Nav.Link href="#awards">Awards</Nav.Link>
              </Nav>
              <div className="d-flex gap-2 align-items-center ms-lg-3 mt-3 mt-lg-0">
                <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
                {adminUnlocked ? (
                  <button type="button" className="studio-unlock" onClick={handleLogout}>
                    <FaUserLock />
                    <span>Sign out</span>
                  </button>
                ) : (
                  <button type="button" className="studio-unlock" onClick={openLogin}>
                    <FaUserLock />
                    <span>Private login</span>
                  </button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <section id="home" className="hero-section">
          <Container fluid="lg">
            <div className="hero-grid">
              <div>
                <span className="eyebrow">Academic portfolio</span>
                <h1 className="hero-title">
                  AI research,
                  <br />
                  written clearly.
                </h1>
                <p className="hero-lead">
                  I am Duy Nhan, a first-year student at PTIT and a research assistant in the URA Research Group at HCMUT. This portfolio keeps the original site information intact, translates the experience into English, and reorganizes it into a clean, Notion-like research workspace.
                </p>
                <div className="hero-meta">
                  {heroStats.map((stat) => (
                    <div className="meta-pill" key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.detail}</span>
                    </div>
                  ))}
                </div>
                <div className="hero-actions">
                  <a href="#publications" className="solid-button">
                    Explore publications <FaArrowRight />
                  </a>
                  <a href="#studio" className="outline-button">
                    Open private studio <FaClipboard />
                  </a>
                </div>
                <div className="social-links">
                  {socialLinks.map((social) => {
                    const Icon =
                      social.label === 'Facebook' ? FaFacebook :
                      social.label === 'TikTok' ? FaTiktok :
                      social.label === 'Instagram' ? FaInstagram : FaGithub;
                    return (
                      <a href={social.href} key={social.label} target="_blank" rel="noreferrer" aria-label={social.label}>
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="portrait-shell">
                <div className="portrait-frame">
                  <img src={profileImage} alt="Duy Nhan portrait" />
                </div>
                <div className="floating-note">
                  <strong>Focus</strong>
                  <p>Low-resource NLP, publication workflows, and a responsive research-first web presence.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="research" className="content-section">
          <Container fluid="lg">
            <SectionHeading
              eyebrow="Research profile"
              title="Built for AI researcher highlights"
              copy="The previous skills section is removed. The new structure emphasizes what matters most for an academic and research portfolio: focus, context, and visible output."
            />
            <div className="section-grid">
              {researchHighlights.map((item, index) => (
                <div className="grid-span-4" key={item.title}>
                  <article className="research-card">
                    <div className="research-icon">0{index + 1}</div>
                    <span className="card-label">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p className="card-copy">{item.copy}</p>
                  </article>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section id="publications" className="content-section">
          <Container fluid="lg">
            <SectionHeading
              eyebrow="Selected output"
              title="Publications, drafts, and public notes"
              copy="This feed is optimized for reading, sharing, and direct editing. When Supabase credentials are configured, the same content can be persisted remotely for private studio updates."
            />
            <div className="publication-toolbar">
              <div className="filter-group" role="tablist" aria-label="Publication filters">
                {[
                  { key: 'all', label: `All (${filteredCounts.all})` },
                  { key: 'publication', label: `Publications (${filteredCounts.publication})` },
                  { key: 'blog', label: `Blog notes (${filteredCounts.blog})` },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`pill-button ${activeFeed === filter.key ? 'active' : ''}`}
                    onClick={() => setActiveFeed(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span className="kbd-hint">Share via hash link</span>
                <span className="kbd-hint">Markdown ready</span>
              </div>
            </div>
            <div className="publication-list">
              {featuredPublication ? (
                <article className="post-spotlight">
                  <div className="d-flex flex-wrap justify-content-between gap-3 align-items-start">
                    <div>
                      <span className="eyebrow">
                        <FaRegStar />
                        <span>Featured research</span>
                      </span>
                      <h3 className="mt-3 publication-title">{featuredPublication.title}</h3>
                      <p className="mb-2 publication-summary">{featuredPublication.summary}</p>
                    </div>
                    <div className="card-footer-row">
                      <button type="button" className="icon-button" onClick={() => handleCopyLink(featuredPublication)} aria-label="Copy featured share link">
                        <FaShareAlt />
                      </button>
                      <button type="button" className="outline-button" onClick={() => handleOpenPost(featuredPublication)}>
                        Read <FaArrowRight />
                      </button>
                    </div>
                  </div>
                  <div className="tag-list">
                    {(Array.isArray(featuredPublication.tags) ? featuredPublication.tags : normalizeTags(featuredPublication.tags)).map((tag) => (
                      <Badge key={tag} className="tag-pill" bg="transparent" text="dark">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              ) : null}
              {visiblePosts.map((post) => (
                <PublicationCard
                  key={post.id}
                  post={post}
                  onOpen={handleOpenPost}
                  onEdit={handleEdit}
                  onRemove={handleDelete}
                  onCopy={handleCopyLink}
                  adminUnlocked={adminUnlocked}
                />
              ))}
            </div>
          </Container>
        </section>

        <section id="studio" className="content-section">
          <Container fluid="lg">
            <SectionHeading
              eyebrow="Private studio"
              title="Edit publications and blog entries directly on the site"
              copy="Use this section to draft posts, attach images, and write in markdown. In production, pair this interface with Supabase Auth and row-level security so only you can access the editor."
            />
            <div className="studio-grid">
              <div className="panel-card studio-feed-panel border-0 shadow-none">
                <div className="publication-toolbar">
                  <div>
                    <h3 className="mb-1">Live feed</h3>
                    <p className="mb-0">Published content appears here with shareable hashes.</p>
                  </div>
                  <button type="button" className="editor-action" onClick={() => setSelectedPost(null)}>
                    <FaSyncAlt /> Clear reader
                  </button>
                </div>
                <div className="post-list">
                  {visiblePosts.map((post) => (
                    <article key={`feed-${post.id}`} className="post-card">
                      {post.coverImage ? (
                        <button type="button" className="post-cover border-0 p-0" onClick={() => handleOpenPost(post)}>
                          <img src={post.coverImage} alt={post.title} />
                        </button>
                      ) : null}
                      <div className="post-meta-row">
                        <span className="year-pill">{post.year}</span>
                        <span className="status-pill">{post.postType === 'publication' ? 'Research' : 'Note'}</span>
                        <span className="status-pill">{post.status}</span>
                      </div>
                      <h3 className="publication-title">{post.title}</h3>
                      <p className="post-excerpt publication-summary">{post.summary}</p>
                      <div className="post-footer">
                        <button type="button" className="icon-button" onClick={() => handleCopyLink(post)} aria-label="Copy share link">
                          <FaShareAlt />
                        </button>
                        <button type="button" className="outline-button" onClick={() => handleOpenPost(post)}>
                          Read article <FaBookOpen />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="editor-card">
                <div className="studio-toolbar">
                  <div>
                    <h3 className="mb-1">Private editor</h3>
                    <p className="mb-0">{supabaseReady ? 'Supabase is configured.' : 'Supabase is not configured yet.'}</p>
                  </div>
                  {adminUnlocked ? (
                    <button type="button" className="editor-action" onClick={resetForm}>
                      <FaPlus /> New post
                    </button>
                  ) : null}
                </div>
                <p className="studio-note">
                  {supabaseReady
                    ? 'The app will sync through Supabase REST when the required environment variables are present.'
                    : 'Add REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, and REACT_APP_SUPABASE_TABLE to enable remote sync.'}
                </p>

                {!adminUnlocked ? (
                  <div className="studio-locked">
                    <p className="editor-note mb-0">Unlock the private editor with the access key to edit posts, images, and markdown content.</p>
                    <Form
                      className="auth-row"
                      onSubmit={(event) => {
                        event.preventDefault();
                        handleUnlock();
                      }}
                    >
                      <Form.Control
                        type="password"
                        placeholder="Access key"
                        value={unlockValue}
                        onChange={(event) => setUnlockValue(event.target.value)}
                      />
                      <button type="submit" className="solid-button">
                        <FaUnlock /> Unlock studio
                      </button>
                    </Form>
                    {statusMessage ? <p className="mb-0">{statusMessage}</p> : null}
                  </div>
                ) : (
                  <div className="empty-state text-start">
                    <h4>Private editor locked</h4>
                    <p className="mb-3">Unlock the studio to add images, edit markdown, and publish content directly to Supabase-backed storage.</p>
                    <button type="button" className="solid-button" onClick={openLogin}>
                      <FaUnlock /> Open login
                    </button>
                  </div>
                )}

                {adminUnlocked ? (
                  <Form onSubmit={handleSave} className="studio-form mt-4">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <Form.Label>Post type</Form.Label>
                        <Form.Select
                          value={formState.postType}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, postType: event.target.value }))}
                        >
                          <option value="publication">Publication</option>
                          <option value="blog">Blog</option>
                        </Form.Select>
                      </div>
                      <div className="col-12 col-md-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={formState.status}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, status: event.target.value }))}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </Form.Select>
                      </div>
                      <div className="col-12 col-md-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type="text"
                          value={formState.year}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, year: event.target.value }))}
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={formState.title}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, title: event.target.value }))}
                          placeholder="Article title"
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Venue / source</Form.Label>
                        <Form.Control
                          type="text"
                          value={formState.venue}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, venue: event.target.value }))}
                          placeholder="Conference, workshop, or article source"
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Authors / byline</Form.Label>
                        <Form.Control
                          type="text"
                          value={formState.authors}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, authors: event.target.value }))}
                          placeholder="Author list or byline"
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={formState.summary}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, summary: event.target.value }))}
                          placeholder="Short abstract or summary"
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Markdown content</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={12}
                          value={formState.content}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, content: event.target.value }))}
                          placeholder="Write in markdown"
                          className="markdown-input"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                          type="text"
                          value={formState.tags}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, tags: event.target.value }))}
                          placeholder="Comma-separated tags"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <Form.Label>Reading time</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          value={formState.readingMinutes}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, readingMinutes: event.target.value }))}
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>External link</Form.Label>
                        <Form.Control
                          type="url"
                          value={formState.externalUrl}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, externalUrl: event.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="col-12">
                        <Form.Label>Cover image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                      </div>
                      <div className="col-12">
                        {formState.coverImage ? (
                          <div className="editor-preview">
                            <img src={formState.coverImage} alt="Preview cover" className="mb-3" />
                            <div className="d-flex justify-content-between gap-2 flex-wrap">
                              <span className="kbd-hint">Image attached</span>
                              <button type="button" className="editor-action" onClick={() => setFormState((currentForm) => ({ ...currentForm, coverImage: '' }))}>
                                Remove image
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-12 d-flex flex-wrap gap-2">
                        <Form.Check
                          type="checkbox"
                          id="featured-toggle"
                          label="Mark as featured"
                          checked={formState.featured}
                          onChange={(event) => setFormState((currentForm) => ({ ...currentForm, featured: event.target.checked }))}
                        />
                      </div>
                    </div>

                    <div className="editor-preview mt-4">
                      <div className="preview-title">
                        <h4>{formState.title || 'Live preview'}</h4>
                        <div className="reader-meta">
                          <span className="year-pill">{formState.year}</span>
                          <span className="status-pill">{formState.postType}</span>
                          <span className="status-pill">{formState.status}</span>
                        </div>
                      </div>
                      {formState.coverImage ? (
                        <div className="reader-cover mb-3">
                          <img src={formState.coverImage} alt="Preview cover" />
                        </div>
                      ) : null}
                      <MarkdownRenderer markdown={formState.content} />
                    </div>

                    <div className="editor-footer mt-4">
                      <button type="submit" className="solid-button">
                        <FaEdit /> {editingPostId ? 'Update post' : 'Publish post'}
                      </button>
                      <button type="button" className="outline-button" onClick={resetForm}>
                        Cancel
                      </button>
                    </div>
                    {statusMessage ? <p className="mb-0 mt-3">{statusMessage}</p> : null}
                  </Form>
                ) : null}
              </div>
            </div>
          </Container>
        </section>

        <section id="awards" className="content-section">
          <Container fluid="lg">
            <SectionHeading
              eyebrow="Recognition"
              title="Awards and competitive results"
              copy="The structure keeps the original achievements while presenting them in a cleaner, English-first format that fits the new portfolio tone."
            />
            <div className="achievement-grid">
              {awards.map((award) => (
                <div className="grid-span-6" key={`${award.year}-${award.title}`}>
                  <article className="award-card">
                    {(() => {
                      const AwardIcon = award.icon;

                      return (
                        <div className="award-icon" style={{ color: award.color, borderColor: award.color }}>
                          <AwardIcon />
                        </div>
                      );
                    })()}
                    <div>
                      <span className="year-pill">{award.year}</span>
                      <h3 className="mt-3 publication-title">{award.title}</h3>
                      <p className="mb-0 publication-summary">{award.category}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <footer className="footer-bar">
        <Container fluid="lg">
          <span>Built as a responsive, English-first research portfolio.</span>
          <span>Theme, studio, and publication flow are ready for Supabase integration.</span>
        </Container>
      </footer>

      <ReaderModal post={selectedPost} show={Boolean(selectedPost)} onHide={() => setSelectedPost(null)} onCopy={handleCopyLink} />
      <PrivateLoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSubmit={(event) => {
          event.preventDefault();
          handleUnlock();
        }}
        secretValue={unlockValue}
        onSecretChange={setUnlockValue}
        errorMessage={loginError}
        configured={Boolean(adminAccessKey)}
      />
    </div>
  );
}

export default PortfolioPage;