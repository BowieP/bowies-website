import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Compass } from 'lucide-react';
import 'katex/dist/katex.min.css'; // This is required for LaTeX to look right!

// --- Error Boundary Component ---
// React Error Boundaries must be class components.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '50px', fontFamily: '"Comic Neue", sans-serif' }}>
          <h1 style={{ color: 'blue' }}>A Cosmic Glitch! 🌌</h1>
          <p>Something went wrong in this part of the Cosmos.</p>
          <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '8px' }}>Return to Safety</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Data Constants ---
const HOBBIES_DATA = {
  title: "Hello! I am Bowie and my favorite hobbies are:",
  icon: "https://cdn-icons-png.flaticon.com/512/10472/10472903.png",
  rotate: '12deg',
  items: [
    { label: 'Coding', text: 'I love tech and coding cool things, and I am the founder of Code Cosmos!', link: 'https://bowie.pages.codecosmos.net/blog/mycodingjourney20-04-26'  },
    { label: 'Sports', text: 'I love playing sport like swimming, football, basketball, dancing, dodgeball and more!', link: 'https://bowie.pages.codecosmos.net/sports' },
    { label: 'Gaming', text: 'I love board and video games, like Minecraft and Scrabble!', link: 'https://bowie.pages.codecosmos.net/gamesandtv' },
    { label: 'Music', text: 'I love listening to music, both accapela, instrumental and both!', link: 'https://bowie.pages.codecosmos.net/music' }
  ]
};

const GAMES_DATA = {
  icon: "https://previews.123rf.com/images/yupiramos/yupiramos1707/yupiramos170716307/82200414-tv-with-video-game-control-icon-vector-illustration-design.jpg",
  rotate: '-10deg',
  items: [
    { label: 'Minecraft', image: 'https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg?utm_source=en.wikinews.org&utm_campaign=index&utm_content=original', text: 'I love playing this game because i think its fun and blocky!' },
    { label: 'Mario Kart', image: 'https://gamegeneral.de/wp-content/uploads/2021/11/Mario-Kart-8-Deluxe-Thumbnail.jpg', text: 'I like this game because you can drive across tons of tracks!' },
    { label: 'Fall Guys', image: 'https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000042975/937afd0c84319831009b44c93369faf0a2c926a454809f73523df9bfb6cf6233', text: 'I like this game because you move a bean to complete levels!' },
    { label: 'Worms Rumble', image: 'https://upload.wikimedia.org/wikipedia/en/6/63/Worms_Rumble_cover_art.jpg', text: "I like this game, it's a shooter but it's for kids and it's about worms!" },
    { label: 'Wreck-It Ralph Breaks the Internet', image: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/dbe22eba-5cb6-4c1d-b5d2-ca1a12830131/compose?aspectRatio=1.78&format=webp&width=1200', text: "I like this movie because it's about the internet and games!" },
    { label: 'How to Train Your Dragon', image: 'https://i.ytimg.com/vi/22w7z_lT6YM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8hdcinp8PhoiHrBu5W2kV6EE8oQ', text: 'I love this movie because its about dragons and adventure!' },
    { label: 'The Bad Guys', image: 'https://www.dreamworks.com/storage/cms-uploads/the-bad-guys-share-image.jpg', text: 'I like this film because its about adventure, heist and action!' },
    { label: 'Sonic the Hedgehog', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Sonic_the_Hedgehog_film_poster.jpg/250px-Sonic_the_Hedgehog_film_poster.jpg', text: 'I like this movie because it is fast-paced and full of action!' }
  ]
};

const FOOD_DATA = {
  icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzdRPx1Rk8-UWi9uRmsrAZ7yDPaHWkTLBtxQ&s",
  rotate: '8deg',
  iconMaxHeight: '600px',
  items: [
    { label: 'Pizza', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjYuszU6cbJ054Ai-7np5PVjSDnXzg7e9Pw&s', text: 'I love Pizza because its cheesy and theres tons of toppings! And i like the unusual combination of pizza and pesto!' },
    { label: 'Apples', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7elco8p3G9LBsu2J1JBbi9aG4_bGHU9Tffw&s', text: 'I love apples because they are healthy, and juicy!' },
    { label: 'Burgers and Chips', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjl7m5jtwf9z7GdrtJwHFBb7WMwGQl6Wloqw&s', text: 'I like burgers and chips because theres iron, and they are delicious!' },
    { label: 'Broccoli and Lettuce', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp261_f9z7HcJOsbD_X08a4dA6maVFwFsehA&s', text: 'I like these because they are healthy, juicy and crunchy!' },
    { label: 'Ice cream and Chocolate', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVeBoCCrMw2eG2QtxMB235rSvo3pIlST5LPQ&s', text: 'I love these for a treat because these are sweet, and delicious!' },
    { label: 'Milk and Juice', image: 'https://thumbs.dreamstime.com/b/glass-milk-orange-juice-delicious-yogurt-fresh-icon-wiyh-tasty-dairy-sweet-fruit-drink-vector-cartoon-illustration-84333851.jpg', text: 'I like these because they are super sweet and healthy!' },
    { label: 'Pasta', image: 'https://cdn-icons-png.flaticon.com/512/4127/4127288.png', text: 'Pasta - I love eating pasta - and i like the unusual combination of pasta and pesto!' }
  ]
};

const SPORTS_DATA = {
  title: "My Favourite Sports",
  icon: "https://cdn-icons-png.flaticon.com/512/3163/3163636.png",
  rotate: '5deg',
  items: [
    { label: 'Basketball', image: 'https://cdn-icons-png.flaticon.com/512/889/889455.png', text: 'I love basketball because it is fun to dribble and shoot hoops!' },
    { label: 'Football', image: 'https://i.etsystatic.com/50930003/r/il/189b75/5941058199/il_1588xN.5941058199_h6vz.jpg', text: "I don't play much, but I love watching it!" },
    { label: 'Swimming', image: 'https://freesvg.org/img/1652857927swimmer-swimming.png', text: 'Swimming is refreshing and great for staying active!' },
    { label: 'Dancing', image: 'https://cdn-icons-png.flaticon.com/512/3048/3048398.png', text: 'Dancing is a fun way to express yourself and stay fit!' },
    { label: 'Dodgeball', image: 'https://cdn.prod.website-files.com/5b44edefca321a1e2d0c2aa6/5fbc2c593bb575208967468b_Dimensions-Sports-Dodgeball-Icon.svg', text: 'Dodgeball is an intense and exciting game where you have to be quick to avoid the balls!' }
  ]
};

const PROJECTS_DATA = {
  title: "My Coding Projects",
  icon: "https://cdn-icons-png.flaticon.com/512/1005/1005141.png",
  rotate: '-5deg',
  items: [
    { label: 'Code Cosmos', category: 'Web', image: 'https://kidvids.codecosmos.net/logo2.png', text: 'The main hub for my network of apps and sites.', link: 'https://codecosmos.net', videoModalUrl: 'https://youtube.com/embed/4kOt-SI_trw' },
    { 
      label: 'KidVids', 
      category: 'Web',
      image: 'https://kidvids.codecosmos.net/logo.png', 
      text: 'A video platform similar to YouTube. Not finished.', 
      link: 'https://kidvids.codecosmos.net', 
      hasScreenshots: true,
      screenshots: [
        'https://lh3.googleusercontent.com/d/1I-F8U2f0DcTre4rkrReeA6stwmktfip4',
        'https://lh3.googleusercontent.com/d/10MsitUCusueINW4V3nQliTNMPW6vX6vI',
        'https://lh3.googleusercontent.com/d/1RhG7HwWkDLW-rYdJNNGYGLjpGuMpxV3_',
        'https://lh3.googleusercontent.com/d/1ChI6pd__FFKrSYniK3yV6s6Npiqv-iJQ',
        'https://lh3.googleusercontent.com/d/1apgr-GYViILUSZ4x1jptfvKqZv6OKRhj',
        'https://lh3.googleusercontent.com/d/1mB2tY8bhM0Y_hQ1k6s4sk3RMh6hFX7VN'
      ]
    },
    { label: 'A Clicker Game', category: 'Game', image: 'https://cdn.makecode.com/blob/9ab4abfcdff3405e5cca8a3c38e129aec2b363e3/static/logo.png', text: 'A fun game I built to practice state management and animations. In MakeCode Arcade.', link: 'https://arcade.makecode.com/S57641-09029-27229-92314', hasScreenshots: true },
    { label: 'Personal Site', category: 'Web', image: 'https://bowie.pages.codecosmos.net/favicon.png', text: 'The site you are looking at right now! Built with React and CSS animations.', link: 'https://bowie.pages.codecosmos.net', hasScreenshots: true },
    {
      label: "Bowie's Cookie Clicker",
      category: 'Game',
      image: 'https://bowie.pages.codecosmos.net/bowiescookieclickerlogo.jpeg', 
      text: 'I tried to make a copy of Cookie Clicker in JSX. Built on Google Gemini Canvas.', 
      hasScreenshots: true,
      screenshots: [
        'https://lh3.googleusercontent.com/d/1XUFl5FFMLm3iBFgjQ3qutaMlMj1TDqsE',
        'https://lh3.googleusercontent.com/d/1S84_ffTIfyvNd2QxMfjlsl32pd2JMeWm',
        'https://lh3.googleusercontent.com/d/10SeYKuw_ITXZjtKpZppDEKdOJUoPSbb-',
        'https://lh3.googleusercontent.com/d/1HlT7fDTRcCXC-Mh0bqNMw4ahEb5y2Ayr',
        'https://lh3.googleusercontent.com/d/1WVNKr4V9k8B_9m5qKcphtAHXwexq6--I'
      ]
    },
    {
      label: 'Bean Royale',
      category: '3D Game',
      image: 'https://bowie.pages.codecosmos.net/beanroyalelogo.png',
      text: 'I made this game on Gemini AI Canvas and i used HTML and three.js!',
      videoModalUrl: 'https://youtube.com/embed/PlbVV_Ao1zM',
      hasScreenshots: true,
      screenshots: [
        'https://lh3.googleusercontent.com/d/1TZR7WkHdNTOb4MeLKPRTRoyZaBqV84SD',
        'https://lh3.googleusercontent.com/d/1zWkStI1aEN9y0JNWwg5XkzQ1esb7-wQ8',
        'https://lh3.googleusercontent.com/d/1hW2TSsT8WRPEDfYNLmEMKvXNPtQbDor0',
        'https://lh3.googleusercontent.com/d/19ifORTqpr0LWHloP-h7dIRV0t-yXlGMQ',
        'https://lh3.googleusercontent.com/d/16DvsHxQFiRGejvMFLBlYAZ5WfHbdbjWp'
      ]
    }
  ]
};

const MENU_ITEMS = [
  { label: 'Hobbies', path: '/hobbies', color: '#FF5733', image: 'https://static.thenounproject.com/png/3683675-200.png' },
  { label: 'My Projects', path: '/projects', color: '#4287f5', image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png' },
  { label: 'Favourite Food', path: '/food', color: '#FFBD33', image: 'https://i.etsystatic.com/21829091/r/il/65a572/6400668980/il_570xN.6400668980_eaf8.jpg' },
  { label: 'Favourite Sports', path: '/sports', color: '#75FF33', image: 'https://i.etsystatic.com/50930003/r/il/189b75/5941058199/il_1588xN.5941058199_h6vz.jpg' },
  { label: 'Favourite Music', path: '/music', color: '#33FFBD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJfQ_KIGekKxvEmjG-r1ymoLl2cjQpZEezuw&s' },
  { label: 'Favourite Games and TV', path: '/gamesandtv', color: '#3357FF', image: 'https://freesvg.org/img/Raseone-tv.png' },
  { label: 'My Blog', path: '/blog', color: '#8333FF', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s' }
];

// --- Cursor Constants ---
const PIXEL_HAND = 'url("https://unpkg.com/nes.css@latest/assets/cursor-click.png"), pointer';
const PIXEL_ARROW = 'url("https://unpkg.com/nes.css@latest/assets/cursor-pointer.png"), auto';
const COMIC_FONT = '"Comic Neue", "Chalkboard SE", "Comic Sans MS", "Comic Sans", cursive';

const THEME = {
  shadow: '0 12px 0 rgba(0,0,0,0.2)',
  shadowHover: '0 16px 0 rgba(0,0,0,0.15)',
  shadowActive: '0 0 0 rgba(0,0,0,0.2)',
  glass: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  glow: '0 0 20px rgba(0, 51, 204, 0.3)'
};

// --- UI Helper Components ---
const BackBtn = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    style={{
      alignSelf: isMobile ? 'center' : 'flex-start',
      padding: '10px 28px',
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#555',
      border: '4px solid rgba(255,255,255,0.3)',
      borderRadius: '40px 15px 35px 20px',
      cursor: PIXEL_HAND,
      fontFamily: COMIC_FONT,
      boxShadow: THEME.shadow,
      transition: THEME.transition,
      outline: 'none'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(-2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'}
    onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(12px)'; e.currentTarget.style.boxShadow = THEME.shadowActive; }}
    onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(-2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
  >
    Back
  </button>
);

const SubMenuListView = ({ title, items, icon, rotate, isMobile, onBack, onAction = () => {}, iconMaxHeight = '400px' }) => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  // Get unique categories from items
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: isMobile ? '100%' : '1000px',
      gap: isMobile ? '30px' : '80px',
      padding: isMobile ? '10px 0' : '0',
      fontFamily: COMIC_FONT,
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px', textAlign: isMobile ? 'center' : 'left', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <BackBtn onClick={onBack} isMobile={isMobile} />
        </div>
        {title && <h2 style={{ fontSize: isMobile ? '24px' : '32px', color: '#0033cc', marginTop: 0, marginBottom: isMobile ? '10px' : '20px', letterSpacing: '-0.02em', padding: isMobile ? '0 10px' : '0' }}>{title}</h2>}
        
        {/* Category Filter Bar */}
        {categories.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', border: '2px solid #0033cc', cursor: PIXEL_HAND,
                  backgroundColor: activeCategory === cat ? '#0033cc' : 'transparent',
                  color: activeCategory === cat ? '#fff' : '#0033cc',
                  fontSize: '14px', fontWeight: 'bold', transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '20px' }}>
          {filteredItems.map((item, idx) => (
            <div key={item.label + idx} style={{ 
            display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '12px' : '20px', fontSize: isMobile ? '16px' : '18px', lineHeight: '1.6',
            backgroundColor: 'rgba(0,51,204,0.03)', padding: isMobile ? '12px' : '15px', borderRadius: '15px', border: '1px solid rgba(0,51,204,0.1)', 
              animation: `fadeInUp 0.4s ease forwards`,
              transition: THEME.transition, cursor: PIXEL_HAND
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,51,204,0.06)';
              e.currentTarget.style.transform = 'translateX(10px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,51,204,0.03)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}>
              {item.image && <img src={item.image} alt={item.label} referrerPolicy="no-referrer" style={{ height: isMobile ? '60px' : '70px', width: isMobile ? '60px' : '70px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                  <strong>{item.label}</strong>
                  {item.category && <span style={{ fontSize: '10px', backgroundColor: '#0033cc', color: '#fff', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>{item.category}</span>}
                </div>
                <p style={{ margin: '5px 0 0 0' }}>
                  {item.text}
                  {item.link && (
                    <>
                      <br/> 
                      <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'none' }}>{item.link.replace('https://', '')}</a>
                    </>
                  )}
                  {item.videoModalUrl && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); onAction({ type: 'video', url: item.videoModalUrl, title: item.label }); }}
                      style={{ marginLeft: '10px', color: '#FF0000', cursor: PIXEL_HAND, fontWeight: 'bold', textDecoration: 'underline', fontSize: '14px' }}
                    >
                      video
                    </span>
                  )}
                  {item.hasScreenshots && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); onAction({ type: 'screenshots', title: item.label, screenshots: item.screenshots }); }}
                      style={{ marginLeft: '10px', color: '#28a745', cursor: PIXEL_HAND, fontWeight: 'bold', textDecoration: 'underline', fontSize: '14px' }}
                    >
                      screenshots
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img 
        src={icon} 
        alt="Menu Icon" 
        style={{ 
          height: 'auto',
          maxHeight: isMobile ? '120px' : iconMaxHeight,
          maxWidth: isMobile ? '80%' : '100%',
          transform: `rotate(${rotate})`,
          filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.05))',
          marginTop: isMobile ? '20px' : '0'
        }} 
      />
    </div>
  );
};

// --- Draggable Modal Component ---
const DraggableModal = ({ isOpen, onClose, title, children, isMobile }) => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [rel, setRel] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!isOpen) setPos({ x: 0, y: 0 });
  }, [isOpen]);

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.stopPropagation();
  };

  React.useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDragging) return;
      setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    };
    const onMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, rel]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'auto'
    }}>
      <div style={{
        position: 'relative', transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: isMobile ? '95%' : '700px', backgroundColor: '#fff',
        borderRadius: '20px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        border: '5px solid #0033cc', overflow: 'hidden'
      }}>
        <div onMouseDown={onMouseDown} style={{ padding: '15px 25px', backgroundColor: '#0033cc', color: '#fff', cursor: 'move', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none' }}>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: PIXEL_HAND, lineHeight: '0.8', padding: '0 5px' }}>×</button>
        </div>
        <div style={{ padding: '25px', backgroundColor: '#fff', minHeight: '300px' }}>{children}</div>
      </div>
    </div>
  );
};

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
const HeaderBrandingSnippet = ({ isMobile, colors, isDark, toggleTheme }) => {
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
            <img src="https://kidvids.codecosmos.net/logo2.png" alt="Logo" referrerPolicy="no-referrer" style={{ height: '20px', marginRight: '10px' }} />
            <span style={{ fontWeight: 500 }}>
            {isMobile ? "Home" : "Bowie's Official Site"}
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
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none', border: 'none', cursor: PIXEL_HAND, padding: '4px',
            display: 'flex', alignItems: 'center', transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2) rotate(15deg)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        >
          {isDark ? '🌙' : '☀️'}
        </button>
        
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
  const [theme, setTheme] = React.useState('light'); 
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [blogContent, setBlogContent] = React.useState('');
  const [modalData, setModalData] = React.useState(null);
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

  // Dynamic Title & Metadata Management
  React.useEffect(() => {
    let pageTitle = "Bowie's Stuff";
    
    if (currentPath === '/') {
      pageTitle = "Bowie's Stuff";
    } else if (currentStory) {
      pageTitle = `Bowie's Stuff - ${currentStory.title}`;
    } else {
      const menuItem = MENU_ITEMS.find(item => item.path === currentPath);
      if (menuItem) {
        pageTitle = `Bowie's Stuff - ${menuItem.label}`;
      } else {
        pageTitle = "Bowie's Stuff - 404 Not Found";
      }
    }

    document.title = pageTitle;
    ['title', 'og:title', 'twitter:title'].forEach(name => {
      const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (el) el.setAttribute('content', pageTitle);
    });
  }, [currentPath, currentStory]);

  // Fetch blog content when navigating to a story
  React.useEffect(() => {
    if (currentStory && storySlug) {
      setBlogContent(''); // Clear previous content while loading new story
      fetch(`/blogs/${storySlug}.md`)
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

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
      cursor: PIXEL_HAND,
      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,51,204,0.05) 1px, transparent 0)`,
      backgroundSize: '40px 40px',
      animation: 'starScroll 60s linear infinite'
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,400;0,700;1,400;1,700&display=swap');
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes cosmosFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(15deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes titleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes glint {
            0% { transform: translateX(-150%) skewX(-25deg); }
            50%, 100% { transform: translateX(150%) skewX(-25deg); }
          }
          @keyframes starScroll {
            from { background-position: 0 0; }
            to { background-position: -1000px 1000px; }
          }
          @keyframes blackHolePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
          @keyframes photonGlow {
            0%, 100% { box-shadow: 0 0 20px 2px #fff, 0 0 40px 10px #0033cc, 0 0 100px 30px #000; }
            50% { box-shadow: 0 0 30px 5px #fff, 0 0 60px 20px #0033cc, 0 0 130px 50px #000; }
          }
          @keyframes accretionSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          /* Custom Scrollbar Juice */
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: ${isDark ? '#1a1a1a' : '#f1f1f1'};
          }
          ::-webkit-scrollbar-thumb {
            background: #0033cc;
            border-radius: 6px;
            border: 3px solid ${isDark ? '#1a1a1a' : '#f1f1f1'};
            box-shadow: inset 0 0 10px rgba(255,255,255,0.2);
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #5c7cff;
          }
        `}
      </style>

      {/* Tiny Header */}
      <ErrorBoundary>
      <HeaderBrandingSnippet 
        isMobile={isMobile} 
        colors={colors} 
        isDark={isDark} 
        toggleTheme={toggleTheme}
      />
      </ErrorBoundary>

      {/* Second Header */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: isMobile ? '12px' : '32px',
        padding: isMobile ? '0 12px' : '0 24px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bg
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/favicon.png" 
            alt="Icon" 
            style={{ height: '40px', width: '40px', marginRight: '12px', objectFit: 'cover', borderRadius: '4px' }} 
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'blue', animation: 'titleFloat 4s ease-in-out infinite' }}>
            Bowie's Stuff
          </span>
        </div>

        <div style={{ display: 'flex', gap: isMobile ? '8px' : '16px' }}>
          <a 
            href="https://youtube.com/@CodeCosmos_YT" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: isMobile ? '6px 12px' : '8px 20px',
              backgroundColor: '#fff', color: '#000', borderRadius: '12px 6px 14px 8px', border: '3px solid #FF0000',
              textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', cursor: PIXEL_HAND, boxShadow: THEME.shadow, transition: THEME.transition
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(-2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'; e.currentTarget.style.boxShadow = THEME.shadow; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(12px)'; e.currentTarget.style.boxShadow = THEME.shadowActive; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(-2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YT" style={{ height: '16px' }} />
            {!isMobile && "YouTube"}
          </a>

          <a 
            href="https://github.com/The-Code-Cosmos" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: isMobile ? '6px 12px' : '8px 20px',
              backgroundColor: '#333', color: '#fff', borderRadius: '8px 14px 6px 12px', border: '3px solid rgba(255,255,255,0.3)',
              textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', cursor: PIXEL_HAND, boxShadow: THEME.shadow, transition: THEME.transition
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'; e.currentTarget.style.boxShadow = THEME.shadow; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(12px)'; e.currentTarget.style.boxShadow = THEME.shadowActive; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-6px) rotate(2deg)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" style={{ height: '18px', filter: 'invert(1)' }} />
            {!isMobile && "GitHub"}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        gap: isMobile ? '20px' : '30px',
        padding: isMobile ? '16px' : '24px',
        position: 'relative'
      }}>
        <ErrorBoundary>
        {currentPath === '/hobbies' ? (
          <SubMenuListView 
            {...HOBBIES_DATA} 
            isMobile={isMobile} 
            onBack={() => navigate('/')} 
          />
        ) : currentPath === '/gamesandtv' ? (
          <SubMenuListView 
            {...GAMES_DATA} 
            isMobile={isMobile} 
            onBack={() => navigate('/')} 
          />
        ) : currentPath === '/food' ? (
          <SubMenuListView 
            {...FOOD_DATA} 
            isMobile={isMobile} 
            onBack={() => navigate('/')} 
          />
        ) : currentPath === '/sports' ? (
          <SubMenuListView 
            {...SPORTS_DATA} 
            isMobile={isMobile} 
            onBack={() => navigate('/')} 
          />
        ) : currentPath === '/projects' ? (
          <SubMenuListView 
            {...PROJECTS_DATA} 
            isMobile={isMobile} 
            onBack={() => navigate('/')} 
            onAction={setModalData}
          />
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
            <BackBtn onClick={() => navigate('/')} isMobile={isMobile} />
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
                    backgroundColor: story.color || '#888',
                    border: '4px solid rgba(255,255,255,0.4)',
                    borderRadius: '30px 90px 40px 100px',
                    cursor: PIXEL_HAND,
                    boxShadow: THEME.shadow,
                    transition: THEME.transition,
                    minWidth: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                    outline: 'none',
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) rotate(-2deg) scale(1.02)';
                    e.currentTarget.style.boxShadow = THEME.shadowHover;
                    const img = e.currentTarget.querySelector('img');
                    if(img) img.style.transform = 'scale(1.2) rotate(10deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                    e.currentTarget.style.boxShadow = THEME.shadow;
                    const img = e.currentTarget.querySelector('img');
                    if(img) img.style.transform = 'scale(1) rotate(0deg)';
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(12px)'; e.currentTarget.style.boxShadow = THEME.shadowActive; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-10px) rotate(-2deg) scale(1.02)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
                >
                  {/* Glint effect overlay */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'glint 4s infinite ease-in-out', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <img src={story.image} alt="" style={{ height: '40px', borderRadius: '8px', transition: THEME.transition }} />
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
              <BackBtn onClick={() => navigate('/blog')} isMobile={isMobile} />
              <div style={{ fontSize: '20px', lineHeight: '1.6' }}>
                <h2 style={{ fontSize: '28px', color: isDark ? '#5c7cff' : '#0033cc', marginTop: 0, marginBottom: '16px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>
                  {currentStory.title}
                </h2>
                <div style={{ 
                  fontSize: '18px', lineHeight: '1.8', textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.02)', padding: '25px', borderRadius: '20px', border: `1px solid ${colors.border}`,
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
                }}>
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
        ) : currentPath === '/' ? (
          MENU_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: '25px 50px',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: item.color || '#888',
                border: '4px solid rgba(255,255,255,0.4)',
                borderRadius: '30px 90px 40px 100px',
                cursor: PIXEL_HAND,
                boxShadow: THEME.shadow,
                transition: THEME.transition,
                minWidth: '240px',
                position: 'relative',
                overflow: 'hidden',
                outline: 'none',
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) rotate(-3deg) scale(1.05)';
                e.currentTarget.style.boxShadow = THEME.shadowHover;
                const img = e.currentTarget.querySelector('img');
                if(img) img.style.transform = 'scale(1.2) translateY(-10px) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                e.currentTarget.style.boxShadow = THEME.shadow;
                const img = e.currentTarget.querySelector('img');
                if(img) img.style.transform = 'scale(1) translateY(0)';
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(15px)'; e.currentTarget.style.boxShadow = THEME.shadowActive; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-15px) rotate(-3deg) scale(1.05)'; e.currentTarget.style.boxShadow = THEME.shadowHover; }}
            >
              {/* Glint effect overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'glint 6s infinite ease-in-out', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                {item.image && (
                  <img src={item.image} alt="" style={{ height: '64px', borderRadius: '12px', transition: THEME.transition }} />
                )}
                <span>{item.label}</span>
              </div>
            </button>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '80px' : '120px',
              fontWeight: 'bold',
              color: 'blue'
            }}>
              <span>4</span>
              {/* Black Hole as the '0' */}
              <div style={{
                width: isMobile ? '70px' : '100px',
                height: isMobile ? '70px' : '100px',
                backgroundColor: '#000',
                borderRadius: '50%',
                position: 'relative',
                margin: isMobile ? '0 5px' : '0 15px',
                animation: 'blackHolePulse 5s ease-in-out infinite, photonGlow 4s ease-in-out infinite',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  width: '180%',
                  height: '180%',
                  top: '-40%',
                  left: '-40%',
                  background: 'conic-gradient(from 0deg, transparent, rgba(0, 51, 204, 0.8), transparent 40%, rgba(255, 255, 255, 0.4), transparent)',
                  borderRadius: '50%',
                  animation: 'accretionSpin 2s linear infinite',
                  filter: 'blur(8px)',
                  opacity: 0.7
                }} />
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #fff'
                }} />
              </div>
              <span>4</span>
            </div>

            <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Oops! 404! Click to go back</h2>
            
            <BackBtn onClick={() => navigate('/')} isMobile={isMobile} />
          </div>
        )}
        </ErrorBoundary>
      </main>

      <DraggableModal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        title={modalData?.title || ''}
        isMobile={isMobile}
      >
        {modalData?.type === 'video' ? (
          <iframe 
            width="100%" height="400" src={modalData.url} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen style={{ display: 'block', borderRadius: '12px' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0', overflowY: 'auto', maxHeight: '60vh' }}>
            {modalData?.screenshots && modalData.screenshots.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {modalData.screenshots.map((src, i) => (
                  <img key={i} src={src} alt={`Screenshot ${i + 1}`} referrerPolicy="no-referrer" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                ))}
              </div>
            ) : (
              <div style={{ opacity: 0.6, padding: '60px 0', fontSize: '24px', color: '#333' }}>
                📸 No screenshots here yet! Stay tuned for the Cosmos update.
              </div>
            )}
          </div>
        )}
      </DraggableModal>
    </div>
  );
};

export default App;