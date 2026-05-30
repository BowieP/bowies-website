import React from 'react';

// --- Cursor Constants ---
const PIXEL_HAND = 'url("https://unpkg.com/nes.css@latest/assets/cursor-click.png"), pointer';
const PIXEL_ARROW = 'url("https://unpkg.com/nes.css@latest/assets/cursor-pointer.png"), auto';

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
            <span style={{ fontWeight: 500 }}>Hosted through Code Cosmos Pages</span>
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
          <span style={{ ...grayscaleHeaderItem, fontWeight: 500 }}>Founder's Site</span>
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
  const isDark = theme === 'dark';

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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflow: 'hidden',
      cursor: PIXEL_HAND
    }}>
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
        backgroundColor: colors.bg,
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
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
            maxWidth: '1200px',
            gap: isMobile ? '40px' : '80px',
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
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
                  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
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
                height: isMobile ? '180px' : '400px', 
                transform: 'rotate(12deg)',
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
            { label: 'My Life', path: '/life', color: '#8333FF', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s' }
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
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
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