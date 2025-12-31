import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useOneWallet } from '../hooks/useOneWallet';
import { useMusic } from '../contexts/MusicContext';
import WalletWarningModal from './WalletWarningModal';

interface MainMenuProps {
  onPlay: () => void;
  onInventory: () => void;
  onDailyChest: () => void;
  onAchievements: () => void;
  onGuide: () => void;
}

const MainMenu = ({ onPlay, onInventory, onDailyChest, onAchievements, onGuide }: MainMenuProps) => {
  const { t, i18n } = useTranslation();
  const { connected, address, connect, disconnect, installWallet, isWalletInstalled, isCorrectChain, chainId, checkChain } = useOneWallet();
  const { isMusicEnabled, toggleMusic, isSfxEnabled, toggleSfx } = useMusic();
  
  // Trigger music on any button interaction
  const handleButtonInteraction = () => {
    if (isMusicEnabled) {
      // Music will start playing on user interaction (handled by MusicContext)
      // This just ensures the interaction is registered
    }
  };
  const [showWalletWarning, setShowWalletWarning] = useState(false);
  const [showChainWarning, setShowChainWarning] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showNews, setShowNews] = useState(false);
  
  // News entries
  const newsEntries = [
    {
      id: 'ui_theme_update', 
      title: t('mainMenu.news.ui_theme_update.title'),
      date: t('mainMenu.news.ui_theme_update.date'),
      image: '/assets/sprites/image copy 3.png',
      description: t('mainMenu.news.ui_theme_update.description')
    },
    {
      id: 'mysterious_lazer_enemy',
      title: t('mainMenu.news.mysterious_lazer_enemy.title'),
      date: t('mainMenu.news.mysterious_lazer_enemy.date'),
      image: '/assets/sprites/enemy_lazer.png',
      description: t('mainMenu.news.mysterious_lazer_enemy.description')
    },
    {
      id: 'legendary_machine_gun',
      title: t('mainMenu.news.legendary_machine_gun.title'),
      date: t('mainMenu.news.legendary_machine_gun.date'),
      image: '/assets/pngegg (2).png',
      description: t('mainMenu.news.legendary_machine_gun.description')
    },
    {
      id: 'vest_system',
      title: t('mainMenu.news.vest_system.title'),
      date: t('mainMenu.news.vest_system.date'),
      image: '/assets/vest.png',
      description: t('mainMenu.news.vest_system.description')
    },
    {
      id: 'ammo_system',
      title: t('mainMenu.news.ammo_system.title'),
      date: t('mainMenu.news.ammo_system.date'),
      image: '/assets/ammo.png',
      description: t('mainMenu.news.ammo_system.description')
    },
    {
      id: 'encyclopedia_nov25_2025',
      title: t('mainMenu.news.encyclopedia_nov25_2025.title'),
      date: t('mainMenu.news.encyclopedia_nov25_2025.date'),
      image: '/assets/guide/encyclopedia_preview.png',
      description: t('mainMenu.news.encyclopedia_nov25_2025.description')
    }
  ];

  // Track if user has seen the latest news (stored in localStorage)
  const LATEST_NEWS_ID = 'ui_theme_update';
  const [hasUnreadNews, setHasUnreadNews] = useState(() => {
    if (typeof window === 'undefined') return true;
    const lastSeenNews = localStorage.getItem('lastSeenNewsId');
    // Check if user has seen the latest news entry
    return lastSeenNews !== LATEST_NEWS_ID;
  });

  const handleOpenNews = () => {
    handleButtonInteraction();
    setShowNews(true);
    // Mark news as read
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSeenNewsId', LATEST_NEWS_ID);
    }
    setHasUnreadNews(false);
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleMenuClick = (action: () => void) => {
    handleButtonInteraction(); // Register interaction for music
    if (!connected) {
      setShowWalletWarning(true);
    } else if (!isCorrectChain) {
      setShowChainWarning(true);
    } else {
      action();
    }
  };

  const handleConnectWallet = () => {
    if (isWalletInstalled()) {
      connect();
    } else {
      installWallet();
    }
  };

  return (
    <>
      <style>{`
        .menu-button {
          transition: all 0.2s ease;
        }
        .menu-button:hover {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
      >
      {/* Background image covering full screen */}
      <img
        src="/assets/sprites/image copy 3.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          imageRendering: 'pixelated',
          filter: 'brightness(0.7) contrast(1.15)',
          opacity: 0.9
        }}
      />
      
      {/* Strong enemy image on the right side */}
      <img
        src="/assets/sprites/image (1) (1).png"
        alt="Strong Enemy"
        className="absolute right-52 top-[55%] -translate-y-1/2 z-10 pointer-events-none"
        style={{ 
          imageRendering: 'pixelated',
          width: '700px',
          height: 'auto'
        }}
      />
      
      {/* Audio controls and Guide - top left */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
        {/* Music Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleButtonInteraction(); // Register interaction
              toggleMusic();
            }}
            className="hud-button w-12 h-12 flex items-center justify-center"
            style={{ 
              fontSize: '24px',
              imageRendering: 'pixelated',
              opacity: isMusicEnabled ? 1 : 0.5,
              borderColor: 'rgba(0, 200, 255, 0.5)'
            }}
            title={t('musicOnTitle')}
          >
            {isMusicEnabled ? '🎵' : '🔇'}
          </button>
          <span className="hud-panel px-2 py-1 relative" style={{ imageRendering: 'pixelated' }}>
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="hud-text font-bold text-sm">{t('music')} {isMusicEnabled ? t('on') : t('off')}</span>
          </span>
        </div>

        {/* SFX Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleButtonInteraction(); // Register interaction
              toggleSfx();
            }}
            className="hud-button w-12 h-12 flex items-center justify-center"
            style={{ 
              fontSize: '24px',
              imageRendering: 'pixelated',
              opacity: isSfxEnabled ? 1 : 0.5,
              borderColor: 'rgba(0, 200, 255, 0.5)'
            }}
             title={t('sfxOnTitle')}
          >
            {isSfxEnabled ? '🔊' : '🔈'}
          </button>
          <span className="hud-panel px-2 py-1 relative" style={{ imageRendering: 'pixelated' }}>
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="hud-text font-bold text-sm">{t('sfx')} {isSfxEnabled ? t('on') : t('off')}</span>
          </span>
        </div>

        {/* Guide Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handleButtonInteraction();
              onGuide();
            }}
            className="hud-button w-12 h-12 flex items-center justify-center"
            style={{ 
              fontSize: '24px',
              imageRendering: 'pixelated',
              borderColor: 'rgba(0, 200, 255, 0.5)'
            }}
            title="Encyclopedia / Guide"
          >
            📖
          </button>
          <span className="hud-panel px-2 py-1 relative" style={{ imageRendering: 'pixelated' }}>
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="hud-text font-bold text-sm">{t('guide')}</span>
          </span>
        </div>

        {/* News Button */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={handleOpenNews}
              className="hud-button w-12 h-12 flex items-center justify-center"
              style={{ 
                fontSize: '24px',
                imageRendering: 'pixelated',
                borderColor: 'rgba(0, 200, 255, 0.5)'
              }}
              title={t('newsTitle')}
            >
              📰
            </button>
            {/* Red dot for unread news */}
            {hasUnreadNews && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"
                style={{ boxShadow: '0 0 8px rgba(255, 0, 0, 0.8)' }}
              />
            )}
          </div>
          <span className="hud-panel px-2 py-1 relative" style={{ imageRendering: 'pixelated' }}>
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <span className="hud-text font-bold text-sm">{t('news')}</span>
          </span>
        </div>
      </div>

      {/* Language switcher - top right */}
      <div className="absolute top-8 right-80 z-20">
        <button
          onClick={() => {
            const newLang = i18n.language === 'en' ? 'zh' : 'en';
            i18n.changeLanguage(newLang);
          }}
          className="wallet-button border-2 border-white/50 py-2 px-4 text-white text-sm font-bold transition-all rounded"
          style={{ fontSize: '14px', imageRendering: 'pixelated' }}
        >
          {i18n.language === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* Wallet connection button - top right */}
      <div className="absolute top-8 right-8 z-20">
        {connected ? (
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <div className="hud-panel px-3 py-2 relative">
                <div className="hud-corner hud-corner-tl"></div>
                <div className="hud-corner hud-corner-tr"></div>
                <div className="hud-corner hud-corner-bl"></div>
                <div className="hud-corner hud-corner-br"></div>
                <div className="hud-text text-sm font-bold flex items-center gap-2">
                {formatAddress(address)}
                {!isCorrectChain && (
                    <span className="hud-text-danger text-xs font-bold" title="Wrong network">!</span>
                )}
                </div>
              </div>
              <button
                onClick={disconnect}
                className="hud-button py-2 px-4 text-sm font-bold"
                style={{ fontSize: '14px', imageRendering: 'pixelated', borderColor: 'rgba(0, 255, 136, 0.5)' }}
              >
                <span className="hud-text-success"> {t('disconnect')}</span>
              </button>
            </div>
            {!isCorrectChain && (
              <div className="hud-panel px-2 py-1 relative">
                <div className="hud-corner hud-corner-tl"></div>
                <div className="hud-corner hud-corner-tr"></div>
                <div className="hud-corner hud-corner-bl"></div>
                <div className="hud-corner hud-corner-br"></div>
                <div className="hud-text-danger text-xs font-bold">WRONG NETWORK - SWITCH TO ONECHAIN TESTNET</div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={isWalletInstalled() ? connect : installWallet}
            className="hud-button py-2 px-4 text-sm font-bold"
            style={{ fontSize: '14px', imageRendering: 'pixelated', borderColor: 'rgba(0, 200, 255, 0.5)' }}
          >
            <span className="hud-text">{isWalletInstalled() ? t('connectWallet') : t('installWallet')}</span>
          </button>
        )}
      </div>
      
      {/* Game title at the top */}
      <div className="absolute top-12 left-0 right-0 text-center z-10 pointer-events-none">
        <h1 
          className="font-bold hud-text-accent"
          style={{ 
            fontSize: '96px',
            imageRendering: 'pixelated',
            letterSpacing: '12px',
            lineHeight: '1.2',
            fontWeight: '900',
            WebkitTextStroke: '4px #000000',
            textShadow: 
              '4px 4px 0px rgba(0, 0, 0, 1), ' +
              '-4px -4px 0px rgba(0, 0, 0, 1), ' +
              '4px -4px 0px rgba(0, 0, 0, 1), ' +
              '-4px 4px 0px rgba(0, 0, 0, 1), ' +
              '0 0 15px rgba(0, 200, 255, 0.9), ' +
              '0 0 30px rgba(0, 200, 255, 0.7), ' +
              '0 0 45px rgba(0, 200, 255, 0.5)'
          } as React.CSSProperties}
        >
           {t('gameTitle')}
        </h1>
      </div>
      
      {/* Menu buttons on the left side */}
      <div className="absolute left-48 top-6 bottom-0 flex flex-col gap-6 justify-center px-12 z-10">
        <div className="relative">
          <button
            onClick={() => handleMenuClick(onPlay)}
            className="menu-main-button py-6 px-12 w-80 font-bold"
            style={{ 
              fontSize: '24px',
              imageRendering: 'pixelated'
            }}
          >
            <span className="hud-text-accent relative z-10">{t('play')}</span>
          </button>
          
          {/* Trophy icon button - positioned to the right, slightly upward */}
          <button
            onClick={onAchievements}
            className="absolute -right-20 -top-4 hud-text-warning hover:scale-110 transition-all p-2 text-6xl cursor-pointer"
            style={{ 
              background: 'transparent',
              border: 'none',
              fontSize: '60px',
              lineHeight: '1',
              transform: 'scale(1)',
              filter: 'drop-shadow(0 0 3px rgba(255, 170, 0, 0.6))'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(255, 170, 0, 0.9)) brightness(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 3px rgba(255, 170, 0, 0.6))';
            }}
            title={t('achievements')}
          >
            🏆
          </button>
        </div>

        <button
          onClick={() => handleMenuClick(onInventory)}
          className="menu-main-button py-6 px-12 w-80 font-bold"
          style={{ 
            fontSize: '24px',
            imageRendering: 'pixelated'
          }}
        >
          <span className="hud-text relative z-10"> {t('inventory')}</span>
        </button>

        <button
          onClick={() => handleMenuClick(onDailyChest)}
          className="menu-main-button py-6 px-12 w-80 font-bold"
          style={{ 
            fontSize: '24px',
            imageRendering: 'pixelated'
          }}
        >
          <span className="hud-text relative z-10"> {t('dailyChest')}</span>
        </button>

        <button
          onClick={() => setShowComingSoon(true)}
          className="menu-main-button py-6 px-12 w-80 font-bold"
          style={{ 
            fontSize: '24px',
            imageRendering: 'pixelated'
          }}
        >
          <span className="hud-text relative z-10">{t('marketplace')}</span>
        </button>
      </div>

      {/* Controls Info - Bottom Center */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
        <div className="hud-panel p-4 relative inline-block">
          <div className="hud-corner hud-corner-tl"></div>
          <div className="hud-corner hud-corner-tr"></div>
          <div className="hud-corner hud-corner-bl"></div>
          <div className="hud-corner hud-corner-br"></div>
          <p className="hud-text-warning text-sm font-bold mb-2">{t('controls')}</p>
          <div className="flex gap-8 text-xs">
            <div className="flex flex-col items-center">
              <span className="hud-text font-bold">WASD</span>
              <span className="hud-text-accent">{t('move')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="hud-text font-bold">MOUSE</span>
              <span className="hud-text-accent">{t('aim')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="hud-text font-bold">L-CLICK</span>
              <span className="hud-text-accent">{t('shoot')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="hud-text font-bold">1 - 5</span>
              <span className="hud-text-accent">{t('abilities')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="hud-text font-bold">E</span>
              <span className="hud-text-accent">{t('interact')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Warning Modal */}
      <WalletWarningModal
        isOpen={showWalletWarning}
        onClose={() => setShowWalletWarning(false)}
        onConnect={handleConnectWallet}
      />

      {/* Chain Warning Modal */}
      {showChainWarning && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowChainWarning(false)}
        >
          <div 
            className="hud-panel p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Pixelify Sans', sans-serif', borderColor: 'rgba(255, 68, 68, 0.6)" }}
          >
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <h2 
              className="hud-text-danger text-2xl font-bold mb-4 text-center"
              style={{ imageRendering: 'pixelated' }}
            >
              {t('wrongNetworkTitle')}
            </h2>
            
            <p className="hud-text text-lg mb-4 text-center">
              {t('wrongNetworkMessage')}
            </p>
            
            <p className="text-yellow-300 text-base mb-6 text-center font-bold">
                            <Trans i18nKey="switchToTestnet">
                Please switch to <span className="text-cyan-300">OneChain Testnet</span> in your wallet settings.
              </Trans>
            </p>

            {chainId && (
              <p className="hud-text-accent text-sm mb-6 text-center">
                 {t('currentNetwork', { chainId })}
              </p>
            )}
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowChainWarning(false);
                  checkChain();
                }}
                className="hud-button py-2 px-6 font-bold"
                style={{ fontSize: '16px', imageRendering: 'pixelated', borderColor: 'rgba(0, 200, 255, 0.5)' }}
              >
                <span className="hud-text">{t('checkAgain')}</span>
              </button>
              <button
                onClick={() => setShowChainWarning(false)}
                className="hud-button py-2 px-6 font-bold"
                style={{ fontSize: '16px', imageRendering: 'pixelated', borderColor: 'rgba(255, 68, 68, 0.5)' }}
              >
                <span className="hud-text-danger"> {t('close')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Modal */}
      {showNews && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setShowNews(false)}
        >
          <div 
            className="hud-panel max-w-xl w-full mx-4 relative max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Pixelify Sans', sans-serif", overflow: 'hidden' }}
          >
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            {/* Close button */}
            <button
              onClick={() => setShowNews(false)}
              className="absolute top-4 right-4 hud-text hover:hud-text-danger transition-colors font-bold z-10"
              style={{ fontSize: '24px', imageRendering: 'pixelated' }}
            >
              ✕
            </button>

            <div className="p-6 pb-4 flex-shrink-0">
            <h2 
                className="hud-text-accent text-2xl font-bold mb-6 text-center border-b-2 border-cyan-500/50 pb-4"
              style={{ imageRendering: 'pixelated' }}
            >
              {t('latestNews')}
            </h2>
            </div>
            
            {/* News Entries - Scrollable area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ minHeight: 0 }}>
            <div className="space-y-4">
              {newsEntries.map((news) => (
                <div key={news.id} className="hud-panel p-4 relative">
                  <div className="hud-corner hud-corner-tl"></div>
                  <div className="hud-corner hud-corner-tr"></div>
                  <div className="hud-corner hud-corner-bl"></div>
                  <div className="hud-corner hud-corner-br"></div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="hud-text-warning font-bold" style={{ fontSize: '18px' }}>{news.title}</span>
                    <span className="hud-text-accent text-sm font-bold">{news.date}</span>
                  </div>
                  
                  {/* News Image */}
                  {news.image && (
                    <div className="mb-4 hud-panel p-2 relative overflow-hidden">
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-48 object-cover"
                        style={{ 
                          imageRendering: 'pixelated',
                          filter: news.id === 'mysterious_lazer_enemy' ? 'brightness(0) contrast(1.5)' : 'none'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <p className="hud-text leading-relaxed" style={{ fontSize: '14px' }}>
                    {news.description}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowComingSoon(false)}
        >
          <div 
            className="hud-panel p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Pixelify Sans', sans-serif', borderColor: 'rgba(255, 170, 0, 0.6)" }}
          >
            <div className="hud-corner hud-corner-tl"></div>
            <div className="hud-corner hud-corner-tr"></div>
            <div className="hud-corner hud-corner-bl"></div>
            <div className="hud-corner hud-corner-br"></div>
            <h2 
              className="hud-text-warning text-2xl font-bold mb-4 text-center"
              style={{ imageRendering: 'pixelated' }}
            >
              {t('marketplace')}
            </h2>
            
            <p className="hud-text text-lg mb-6 text-center font-bold">
              {t('comingSoon')}
            </p>
            
            <p className="hud-text-accent text-base mb-6 text-center">
              {t('marketplaceComingSoon')}
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowComingSoon(false)}
                className="hud-button py-2 px-8 font-bold"
                style={{ fontSize: '16px', imageRendering: 'pixelated', borderColor: 'rgba(0, 200, 255, 0.5)' }}
              >
                <span className="hud-text">{t('close')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MainMenu;

