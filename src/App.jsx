import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // This is required for LaTeX to look right!

// --- Cursor Constants ---
const PIXEL_HAND = 'url("https://unpkg.com/nes.css@latest/assets/cursor-click.png"), pointer';
const PIXEL_ARROW = 'url("https://unpkg.com/nes.css@latest/assets/cursor-pointer.png"), auto';
const COMIC_FONT = '"Comic Neue", "Chalkboard SE", "Comic Sans MS", "Comic Sans", cursive';

const STORIES = {
  'howiknowfootball30-05-26': {
    title: 'How I know what football is :)',
    image: 'https://i.etsystatic.com/50930003/r/il/189b75/5941058199/il_1588xN.5941058199_h6vz.jpg',
    color: '#75FF33'
  },
  'astayatcraigtara29-05-26': {
    title: 'A stay at Craig Tara',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHvMLI81SqSiu_eFRwkIkqpQ0hcwtbwIPj5w&s',
    color: '#FFBD33',
    video: 'https://youtube.com/embed/ZoGWgSsQIEE'
  },
  'mycodingjourney20-04-26': {
    title: 'My Coding Journey',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgvMCVYTdUQTP6AqDlkfHPcURHPQ8coDLWrA&s',
    color: '#3357FF',
    video: 'https://youtube.com/embed/4kOt-SI_trw'
  },
  'whyimadethis30-05-26': {
    title: 'Why i coded this site',
    image: 'https://cdn-icons-png.flaticon.com/512/2920/2920244.png',
    color: '#FF33E9'
  }
};

// --- Shared InfoBubble Component ---
const InfoBubble = ({ isVisible, children, isMobile, colors, top = '30px', side = 'right', width = '400px', style = {} }) => {
  if (!isVisible) return null;
  
  const positionStyles = isMobile ? {
    position: 'fixed',
    top: '50px',
    left: '12px',
    right: '12px',
    width: 'auto'
  } : {
    position: 'absolute',
    top,
    [side]: '0',
    width
  };

  return (
    <div style={{
      ...positionStyles,
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 2000,
      fontSize: '12px',
      lineHeight: '1.5',
      color: colors.text,
      textAlign: 'left',
      maxHeight: isMobile ? '70vh' : '80vh',
      overflowY: 'auto',
      ...style
    }}>
      {children}
    </div>
  );
};

// --- Header Component ---
const HeaderBrandingSnippet = ({ isMobile, colors, isDark }) => {
  // Hover states for the different branding items
  const [codeCosmosHover, setCodeCosmosHover] = React.useState(false);
  const [youtubeHover, setYoutubeHover] = React.useState(false);
  const [githubHover, setGithubHover] = React.useState(false);
  const [firebaseHover, setFirebaseHover] = React.useState(false);
  const [founderHover, setFounderHover] = React.useState(false);

  const grayscaleHeaderItem = {
    filter: 'grayscale(100%)',
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: isDark ? '#bbb' : '#333',
    transition: 'opacity 0.2s',
    cursor: PIXEL_HAND,
  };

  return (
    <header style={{
      height: '44px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 12px' : '0 24px',
      borderBottom: `1px solid ${colors.border}`,
      fontSize: '13px',
      position: 'relative',
      zIndex: 60,
      backgroundColor: colors.bg,
      cursor: PIXEL_ARROW
    }}>
      {/* Left Side: Branding & Founder Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '24px' }}>
        {/* Host Branding */}
        <div 
          onMouseEnter={() => setCodeCosmosHover(true)}
          onMouseLeave={() => setCodeCosmosHover(false)}
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <a href="https://codecosmos.net" style={grayscaleHeaderItem}>
            <img src="https://kidvids.codecosmos.net/logo2.png" alt="Logo" style={{ height: '20px', marginRight: '10px' }} />
            <span style={{ fontWeight: 500 }}>
              {isMobile ? "Pages" : "Hosted through Code Cosmos Pages"}
            </span>
          </a>
          <InfoBubble isVisible={codeCosmosHover} side="left" isMobile={isMobile} colors={colors}>
            <p style={{ margin: '0 0 8px 0' }}>Code Cosmos is a network of apps and websites, some connecting to each other, some not. Users sign in to access a variety of services, similar to Google or Apple.</p>
            <p style={{ margin: 0 }}>Pages are Code Cosmos' service for people that reach out to them, get built websites based on their needs.</p>
          </InfoBubble>
        </div>

        {/* Founder's Site Tag */}
        <div 
          onMouseEnter={() => setFounderHover(true)}
          onMouseLeave={() => setFounderHover(false)}
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <span style={{ ...grayscaleHeaderItem, fontWeight: 500 }}>
            {isMobile ? "Founder" : "Founder's Site"}
          </span>
          <InfoBubble isVisible={founderHover} side="left" isMobile={isMobile} colors={colors} width="300px">
            <p style={{ margin: 0 }}>This website is Bowie's, the creator of Code Cosmos, personal website showcasing his personality and hobbies.</p>
          </InfoBubble>
        </div>
      </div>

      {/* Right Side: Socials & External Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px', position: 'relative' }}>
        
        {/* YouTube */}
        <div onMouseEnter={() => setYoutubeHover(true)} onMouseLeave={() => setYoutubeHover(false)} style={{ position: 'relative' }}>
          <a href="https://youtube.com/@CodeCosmos_YT" style={grayscaleHeaderItem}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YT" style={{ height: '14px' }} />
          </a>
          <InfoBubble isVisible={youtubeHover} isMobile={isMobile} colors={colors}>
            <p style={{ margin: '0 0 8px 0' }}>Click to view the Code Cosmos' YouTube channel. We post content about our updates, funny stuff, gaming and all there is to know! Like and subscribe if you enjoyed it!</p>
            <p style={{ margin: 0 }}>YouTube is the world’s largest online video-sharing platform. Owned by Google, it allows billions of users to watch, upload, share, comment on, and interact with videos. It functions as both a social network and the internet's second-largest search engine.</p>
          </InfoBubble>
        </div>

        {/* GitHub */}
        <div onMouseEnter={() => setGithubHover(true)} onMouseLeave={() => setGithubHover(false)} style={{ position: 'relative' }}>
          <a href="https://github.com/The-Code-Cosmos" style={grayscaleHeaderItem}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" style={{ height: '16px' }} />
          </a>
          <InfoBubble isVisible={githubHover} isMobile={isMobile} colors={colors}>
            <p style={{ margin: '0 0 8px 0' }}>Click to view the Code Cosmos' GitHub profile where we showcase our code, repositories, and gists. Star and follow if you enjoyed it!</p>
            <p style={{ margin: 0 }}>GitHub is a cloud-based platform and hosting service where developers store, manage, and collaborate on software code. It acts like Google Drive for code, but is uniquely built to track file changes and help multiple people work on the same project at the same time without overwriting each other's work.</p>
          </InfoBubble>
        </div>

        {/* Firebase */}
        <div onMouseEnter={() => setFirebaseHover(true)} onMouseLeave={() => setFirebaseHover(false)} style={{ position: 'relative' }}>
          <a href="https://firebase.google.com" style={grayscaleHeaderItem}>
            {!isMobile && <span style={{ marginRight: '6px' }}>Hosted by Google Firebase</span>}
            <img src="https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png" alt="Firebase" style={{ height: '18px' }} />
          </a>
          <InfoBubble isVisible={firebaseHover} isMobile={isMobile} colors={colors}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Make your app the best it can be with Firebase and generative AI</p>
            <p style={{ margin: '0 0 8px 0' }}>Firebase is a platform of services to help you and AI agents build and run intelligent apps with more speed, security, and scalability.</p>
            <p style={{ margin: 0 }}>Designed for the complete app development lifecycle, backed by Google, and trusted by millions of businesses around the world.</p>
          </InfoBubble>
        </div>
      </div>
    </header>
  );
};

// --- Main App Component ---
const App = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [theme] = React.useState('light'); // Can be toggled to 'dark'
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [blogContent, setBlogContent] = React.useState('');
  const isDark = theme === 'dark';
  const storySlug = currentPath.startsWith('/blog/') ? currentPath.split('/').pop() : null;
  const currentStory = STORIES[storySlug];

  // Handle window resizing and navigation
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('resize', handleResize);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Fetch blog content when navigating to a story
  React.useEffect(() => {
    if (currentStory && storySlug) {
      fetch(`/blogs/${storySlug}.md`, { cache: 'no-cache' })
        .then(res => {
          if (!res.ok) throw new Error("File not found");
          return res.text();
        })
        .then(data => {
          // Safety check: If we accidentally fetched the main website (HTML), don't show it
          if (data.trim().startsWith('<!doctype html>')) {
            throw new Error("Fetched HTML instead of Markdown");
          }
          setBlogContent(data);
        })
        .catch(() => setBlogContent("Sorry, I couldn't load the story right now. Please check if the file exists in your public/blogs/ folder!"));
    }
  }, [currentPath]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const colors = {
    bg: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#e0e0e0' : '#1a1a1a',
    border: isDark ? '#333' : '#eaeaea',
    cardBg: isDark ? '#1e1e1e' : '#fff'
  };

  return (
    <div style={{
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: COMIC_FONT,
      overflowX: 'hidden',
      overflowY: 'auto',
      cursor: PIXEL_HAND
    }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,400;0,700;1,400;1,700&display=swap');`}
      </style>

      {/* Tiny Header */}
      <HeaderBrandingSnippet 
        isMobile={isMobile} 
        colors={colors} 
        isDark={isDark} 
      />

      {/* Second Header */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '0 12px' : '0 24px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bg
      }}>
        <img 
          src="/favicon.jpeg" 
          alt="Icon" 
          style={{ height: '40px', width: '40px', marginRight: '12px', objectFit: 'cover', borderRadius: '4px' }} 
        />
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue' }}>
          Bowie's Stuff
        </span>
      </div>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        padding: '24px',
        position: 'relative'
      }}>
        {currentPath === '/hobbies' ? (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: isMobile ? '100%' : '1000px',
            gap: isMobile ? '30px' : '80px',
            padding: isMobile ? '20px' : '0',
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', textAlign: isMobile ? 'center' : 'left' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  padding: '10px 30px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#555',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: '40px 15px 35px 20px',
                  cursor: PIXEL_HAND,
                  boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                Back
              </button>

              <div style={{ fontSize: '20px', lineHeight: '1.6', overflowWrap: 'anywhere' }}>
                <h2 style={{ fontSize: '32px', color: 'blue', marginTop: 0, marginBottom: '20px' }}>
                  Hello! I am Bowie and my favorite hobbies are:
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ margin: 0 }}><strong>Coding</strong> - I love tech and coding cool things, and I am the founder of Code Cosmos!</p>
                  <p style={{ margin: 0 }}><strong>Sports</strong> - I love playing sport like swimming, football, basketball, dancing and more! <br/> <a href="https://bowie.pages.codecosmos.net/sports" style={{ color: 'blue', textDecoration: 'none' }}>bowie.pages.codecosmos.net/sports</a></p>
                  <p style={{ margin: 0 }}><strong>Gaming</strong> - I love board and video games, like Minecraft and Mario! <br/> <a href="https://bowie.pages.codecosmos.net/gamesandtv" style={{ color: 'blue', textDecoration: 'none' }}>bowie.pages.codecosmos.net/gamesandtv</a></p>
                  <p style={{ margin: 0 }}><strong>Music</strong> - I love listening to music, both accapela, instrumental and both! <br/> <a href="https://bowie.pages.codecosmos.net/music" style={{ color: 'blue', textDecoration: 'none' }}>bowie.pages.codecosmos.net/music</a></p>
                </div>
              </div>
            </div>

            <img 
              src="https://cdn-icons-png.flaticon.com/512/10472/10472903.png" 
              alt="Hobbies Menu Icon" 
              style={{ 
                height: 'auto',
                maxHeight: isMobile ? '200px' : '400px',
                maxWidth: isMobile ? '80%' : '100%',
                transform: 'rotate(12deg)',
                filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.05))'
              }} 
            />
          </div>
        ) : currentPath === '/gamesandtv' ? (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: isMobile ? '100%' : '1000px',
            gap: isMobile ? '30px' : '80px',
            padding: isMobile ? '20px' : '0',
            fontFamily: COMIC_FONT,
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', textAlign: isMobile ? 'center' : 'left' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  padding: '10px 30px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#555',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: '40px 15px 35px 20px',
                  cursor: PIXEL_HAND,
                  boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                Back
              </button>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg?utm_source=en.wikinews.org&utm_campaign=index&utm_content=original" 
                  alt="Minecraft" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Minecraft</strong> - I love playing this game because i think its fun and blocky!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://gamegeneral.de/wp-content/uploads/2021/11/Mario-Kart-8-Deluxe-Thumbnail.jpg" 
                  alt="Mario Kart" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Mario Kart</strong> - I like this game because you can drive across tons of tracks!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOi2K4344dLe_LRseE3HaN8NN5AnNNZX2H3Q&s" 
                  alt="The Emoji Movie" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>The Emoji Movie</strong> - I like this film because it fits the tech aesthetic and is about emojis and hacking!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/6/63/Worms_Rumble_cover_art.jpg" 
                  alt="Worms Rumble" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Worms Rumble</strong> - I like this game, it's a shooter but it's for kids and it's about worms!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/dbe22eba-5cb6-4c1d-b5d2-ca1a12830131/compose?aspectRatio=1.78&format=webp&width=1200" 
                  alt="Wreck-It Ralph" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Wreck-It Ralph Breaks the Internet</strong> - I like this movie because it's about the internet and games!
                </p>
              </div>
            </div>

            <img 
              src="https://previews.123rf.com/images/yupiramos/yupiramos1707/yupiramos170716307/82200414-tv-with-video-game-control-icon-vector-illustration-design.jpg" 
              alt="Games and TV Menu Icon" 
              style={{ 
                height: 'auto',
                maxHeight: isMobile ? '200px' : '400px',
                maxWidth: isMobile ? '80%' : '100%',
                transform: 'rotate(-10deg)',
                filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.05))'
              }} 
            />
          </div>
        ) : currentPath === '/food' ? (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: isMobile ? '100%' : '1000px',
            gap: isMobile ? '30px' : '80px',
            padding: isMobile ? '20px' : '0',
            fontFamily: COMIC_FONT,
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', textAlign: isMobile ? 'center' : 'left' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  padding: '10px 30px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#555',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: '40px 15px 35px 20px',
                  cursor: PIXEL_HAND,
                  boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                Back
              </button>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjYuszU6cbJ054Ai-7np5PVjSDnXzg7e9Pw&s" 
                  alt="Pizza" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Pizza</strong> - I love Pizza because its cheesy and theres tons of toppings!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7elco8p3G9LBsu2J1JBbi9aG4_bGHU9Tffw&s" 
                  alt="Apples" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Apples</strong> - I love apples because they are healthy, and juicy!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl7m5jtwf9z7GdrtJwHFBb7WMwGQl6Wloqw&s" 
                  alt="Burgers and Chips" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Burgers and Chips</strong> - I like burgers and chips because theres iron, and they are delicious!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp261_f9z7HcJOsbD_X08a4dA6maVFwFsehA&s" 
                  alt="Broccoli and Lettuce" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Broccoli and Lettuce</strong> - I like these because they are healthy, juicy and crunchy!
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: '16px', fontSize: '20px', lineHeight: '1.6' }}>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVeBoCCrMw2eG2QtxMB235rSvo3pIlST5LPQ&s" 
                  alt="Ice cream and Chocolate" 
                  style={{ height: '80px', borderRadius: '8px', flexShrink: 0 }} 
                />
                <p style={{ margin: 0 }}>
                  <strong>Ice cream and Chocolate</strong> - I love these for a treat because these are sweet, and delicious!
                </p>
              </div>
            </div>

            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdRPx1Rk8-UWi9uRmsrAZ7yDPaHWkTLBtxQ&s" 
              alt="Favourite Food Menu Icon" 
              style={{ 
                height: 'auto',
                maxHeight: isMobile ? '320px' : '600px',
                maxWidth: isMobile ? '80%' : '100%',
                transform: 'rotate(8deg)',
                filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.05))'
              }} 
            />
          </div>
        ) : currentPath === '/blog' ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            gap: '20px',
            padding: isMobile ? '0' : '20px'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '10px 30px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#555',
                border: '4px solid rgba(255,255,255,0.3)',
                borderRadius: '40px 15px 35px 20px',
                cursor: PIXEL_HAND,
                boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              Back
            </button>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
              {Object.entries(STORIES).map(([slug, story]) => (
                <button
                  key={slug}
                  onClick={() => navigate(`/blog/${slug}`)}
                  style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: story.color,
                    border: '4px solid rgba(255,255,255,0.4)',
                    borderRadius: '30px 90px 40px 100px',
                    cursor: PIXEL_HAND,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15), inset 0 -5px 0 rgba(0,0,0,0.2)',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    minWidth: '180px',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(-3deg) scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <img src={story.image} alt="" style={{ height: '40px', borderRadius: '8px' }} />
                    <span style={{ fontSize: '16px' }}>{story.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : currentStory ? (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: isMobile ? '100%' : '1000px',
            gap: isMobile ? '30px' : '80px',
            padding: isMobile ? '20px' : '0',
            fontFamily: COMIC_FONT,
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', textAlign: isMobile ? 'center' : 'left' }}>
              <button
                onClick={() => navigate('/blog')}
                style={{
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  padding: '10px 30px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#555',
                  border: '4px solid rgba(255,255,255,0.3)',
                  borderRadius: '40px 15px 35px 20px',
                  cursor: PIXEL_HAND,
                  boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                Back
              </button>
              <div style={{ fontSize: '20px', lineHeight: '1.6' }}>
                <h2 style={{ fontSize: '28px', color: isDark ? '#5c7cff' : '#0033cc', marginTop: 0, marginBottom: '16px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                  {currentStory.title}
                </h2>
                <div style={{ fontSize: '18px', lineHeight: '1.7', textAlign: 'left', opacity: 0.9 }}>
                  {blogContent ? (
                    <>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]} 
                        rehypePlugins={[rehypeKatex]}
                      >
                        {blogContent}
                      </ReactMarkdown>
                      {currentStory.video && (
                        <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                          <iframe 
                            width="100%" 
                            height="315" 
                            src={currentStory.video} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            style={{ display: 'block' }}
                          ></iframe>
                        </div>
                      )}
                    </>
                  ) : (
                    "Loading story..."
                  )}
                </div>
              </div>
            </div>
            <img 
              src={currentStory.image} 
              alt={currentStory.title} 
              style={{ 
                height: 'auto',
                maxHeight: isMobile ? '200px' : '400px',
                maxWidth: isMobile ? '80%' : '100%',
                transform: 'rotate(5deg)',
                filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.05))'
              }} 
            />
          </div>
        ) : (
          [
            { label: 'Hobbies', path: '/hobbies', color: '#FF5733', image: 'https://static.thenounproject.com/png/3683675-200.png' },
            { label: 'Favourite Food', path: '/food', color: '#FFBD33', image: 'https://i.etsystatic.com/21829091/r/il/65a572/6400668980/il_570xN.6400668980_eaf8.jpg' },
            { label: 'Favourite Sports', path: '/sports', color: '#75FF33', image: 'https://i.etsystatic.com/50930003/r/il/189b75/5941058199/il_1588xN.5941058199_h6vz.jpg' },
            { label: 'Favourite Music', path: '/music', color: '#33FFBD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfQ_KIGekKxvEmjG-r1ymoLl2cjQpZEezuw&s' },
            { label: 'Favourite Games and TV', path: '/gamesandtv', color: '#3357FF', image: 'https://freesvg.org/img/Raseone-tv.png' },
            { label: 'My Blog', path: '/blog', color: '#8333FF', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s' }
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: '25px 50px',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: item.color,
                border: '4px solid rgba(255,255,255,0.4)',
                borderRadius: '30px 90px 40px 100px',
                cursor: PIXEL_HAND,
                boxShadow: '0 10px 20px rgba(0,0,0,0.15), inset 0 -5px 0 rgba(0,0,0,0.2)',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                minWidth: '240px',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(-3deg) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                {item.image && (
                  <img src={item.image} alt="" style={{ height: '64px', borderRadius: '12px' }} />
                )}
                <span>{item.label}</span>
              </div>
            </button>
          ))
        )}
      </main>
    </div>
  );
};

export default App;