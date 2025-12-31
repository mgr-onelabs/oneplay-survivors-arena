import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ACTIVE_ABILITIES } from '../data/activeAbilities';
import { PixelIcon } from '../utils/pixelIcons';

interface GuideProps {
  onBack: () => void;
}

type GuideCategory = 'enemies' | 'hero' | 'abilities' | 'lore';

interface EnemyAbility {
  name: string;
  description: string;
  details: string;
  image: string;
}

interface EnemyData {
  id: string;
  name: string;
  title: string;
  type: 'weak' | 'normal' | 'strong' | 'lazer';
  image: string;
  hp: string;
  speed: string;
  damage: string;
  description: string;
  lore: string;
  abilities: EnemyAbility[];
}

const Guide = ({ onBack }: GuideProps) => {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>('enemies');
  const [selectedEnemy, setSelectedEnemy] = useState<string>('swarmer');
  const [selectedAbility, setSelectedAbility] = useState<string>('shield');
  const { t } = useTranslation();
  const enemies: EnemyData[] = [
    {
      id: 'swarmer',
      name: t('guide.enemies.swarmer.name'),
      title: t('guide.enemies.swarmer.title'),
      type: 'weak',
      image: '/assets/sprites/enemy_weak.png',
      hp: t('guide.enemies.swarmer.hp'),
      speed: t('guide.enemies.swarmer.speed'),
      damage: t('guide.enemies.swarmer.damage'),
      description: t('guide.enemies.swarmer.description'),
      lore: t('guide.enemies.swarmer.lore'),
      abilities: [
        {
          name: t('guide.enemies.swarmer.abilities.0.name'),
          description: t('guide.enemies.swarmer.abilities.0.description'),
          details: t('guide.enemies.swarmer.abilities.0.details'),
          image: '/assets/guide/swarmer_explosion.png'
        },
        {
          name: t('guide.enemies.swarmer.abilities.1.name'),
          description: t('guide.enemies.swarmer.abilities.1.description'),
          details: t('guide.enemies.swarmer.abilities.1.details'),
          image: '/assets/guide/swarmer_pursuit.png'
        },
        {
          name: t('guide.enemies.swarmer.abilities.2.name'),
          description: t('guide.enemies.swarmer.abilities.2.description'),
          details: t('guide.enemies.swarmer.abilities.2.details'),
          image: '/assets/guide/swarmer_swarm.png'
        }
      ]
    },
    {
      id: 'soldier',
      name: t('guide.enemies.soldier.name'),
      title: t('guide.enemies.soldier.title'),
      type: 'normal',
      image: '/assets/sprites/enemy_normal.png',
      hp: t('guide.enemies.soldier.hp'),
      speed: t('guide.enemies.soldier.speed'),
      damage: t('guide.enemies.soldier.damage'),
      description: t('guide.enemies.soldier.description'),
      lore: t('guide.enemies.soldier.lore'),
      abilities: [
        {
          name: t('guide.enemies.soldier.abilities.0.name'),
          description: t('guide.enemies.soldier.abilities.0.description'),
          details: t('guide.enemies.soldier.abilities.0.details'),
          image: '/assets/guide/hunter_homing.png'
        },
        {
          name: t('guide.enemies.soldier.abilities.1.name'),
          description: t('guide.enemies.soldier.abilities.1.description'),
          details: t('guide.enemies.soldier.abilities.1.details'),
          image: '/assets/guide/hunter_projectile.png'
        },
        {
          name: t('guide.enemies.soldier.abilities.2.name'),
          description: t('guide.enemies.soldier.abilities.2.description'),
          details: t('guide.enemies.soldier.abilities.2.details'),
          image: '/assets/guide/hunter_movement.png'
        }
      ]
    },
    {
      id: 'commander',
      name: t('guide.enemies.commander.name'),
      title: t('guide.enemies.commander.title'),
      type: 'strong',
      image: '/assets/sprites/enemy_strong.png',
      hp: t('guide.enemies.commander.hp'),
      speed: t('guide.enemies.commander.speed'),
      damage: t('guide.enemies.commander.damage'),
      description: t('guide.enemies.commander.description'),
      lore: t('guide.enemies.commander.lore'),
      abilities: [
        {
          name: t('guide.enemies.commander.abilities.0.name'),
          description: t('guide.enemies.commander.abilities.0.description'),
          details: t('guide.enemies.commander.abilities.0.details'),
          image: '/assets/guide/overlord_shield.png'
        },
        {
          name: t('guide.enemies.commander.abilities.1.name'),
          description: t('guide.enemies.commander.abilities.1.description'),
          details: t('guide.enemies.commander.abilities.1.details'),
          image: '/assets/guide/overlord_laser.png'
        },
        {
          name: t('guide.enemies.commander.abilities.2.name'),
          description: t('guide.enemies.commander.abilities.2.description'),
          details: t('guide.enemies.commander.abilities.2.details'),
          image: '/assets/guide/overlord_berserk.png'
        }
      ]
    },
    {
      id: 'lazer',
      name: t('guide.enemies.lazer.name'),
      title: t('guide.enemies.lazer.title'),
      type: 'lazer',
      image: '/assets/sprites/enemy_lazer.png',
      hp: '???',
      speed: '???',
      damage: '???',
      description: t('guide.enemies.lazer.description'),
      lore: t('guide.enemies.lazer.lore'),
      abilities: [
        {
          name: t('guide.enemies.lazer.abilities.0.name'),
          description: t('guide.enemies.lazer.abilities.0.description'),
          details: t('guide.enemies.lazer.abilities.0.details'),
          image: '/assets/sprites/enemy_lazer.png'
        }
      ]
    }
  ];

  const loreEntries = [
    {
      id: 'arena',
      title: t('guide.loreEntries.arena.title'),
      content: t('guide.loreEntries.arena.content')
    },
    {
      id: 'corruption',
      title: t('guide.loreEntries.corruption.title'),
      content: t('guide.loreEntries.corruption.content')
    },
    {
      id: 'survivor',
      title: t('guide.loreEntries.survivor.title'),
      content: t('guide.loreEntries.survivor.content')
    }
  ];

  const selectedEnemyData = enemies.find(e => e.id === selectedEnemy);
  const selectedAbilityData = ACTIVE_ABILITIES.find(a => a.type === selectedAbility);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weak': return { bg: '#5a3000', border: '#ff8c00', text: '#ffaa00' };
      case 'normal': return { bg: '#003a00', border: '#00aa00', text: '#00ff00' };
      case 'strong': return { bg: '#5a0000', border: '#ff0000', text: '#ff4444' };
      case 'lazer': return { bg: '#1a1a1a', border: '#000000', text: '#666666' };
      default: return { bg: '#3a3a3a', border: '#888888', text: '#cccccc' };
    }
  };

  return (
    <>
      <style>{`
        .guide-sidebar::-webkit-scrollbar {
          width: 14px;
        }
        .guide-sidebar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 200, 255, 0.2);
        }
        .guide-sidebar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.4) 0%, rgba(0, 150, 200, 0.5) 100%);
          border: 1px solid rgba(0, 200, 255, 0.6);
          box-shadow: inset 0 0 4px rgba(0, 200, 255, 0.3);
        }
        .guide-sidebar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.6) 0%, rgba(0, 150, 200, 0.7) 100%);
          border-color: rgba(0, 200, 255, 0.9);
          box-shadow: inset 0 0 6px rgba(0, 200, 255, 0.5);
        }
        .guide-content::-webkit-scrollbar {
          width: 14px;
        }
        .guide-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(0, 200, 255, 0.2);
        }
        .guide-content::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.4) 0%, rgba(0, 150, 200, 0.5) 100%);
          border: 1px solid rgba(0, 200, 255, 0.6);
          box-shadow: inset 0 0 4px rgba(0, 200, 255, 0.3);
        }
        .guide-content::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(0, 200, 255, 0.6) 0%, rgba(0, 150, 200, 0.7) 100%);
          border-color: rgba(0, 200, 255, 0.9);
          box-shadow: inset 0 0 6px rgba(0, 200, 255, 0.5);
        }
        .tab-button {
          background-color: #3a0000;
        }
        .tab-button:hover {
          background-color: #5a0000;
        }
        .tab-button.active {
          background-color: #8b0000;
        }
        .list-item {
          background-color: #3a0000;
        }
        .list-item:hover {
          background-color: #5a0000;
        }
        .list-item.selected {
          background-color: #5a0000;
          border-left-width: 8px;
        }
      `}</style>

      <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden relative" style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>
        {/* Background image */}
        <img
          src="/assets/sprites/image copy 3.png"
          alt="Background"
          className="absolute inset-0 w-screen h-screen object-cover pointer-events-none"
          style={{
            imageRendering: 'pixelated',
            zIndex: 0,
            filter: 'brightness(0.9) contrast(1.1)',
            opacity: 0.90
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center p-4 border-b-2 border-cyan-500/30 hud-panel" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="hud-button py-3 px-8 font-bold"
              style={{ fontSize: '18px', borderColor: 'rgba(0, 200, 255, 0.5)' }}
            >
              <span className="hud-text">{t('back')}</span>
            </button>
            <h1 className="hud-text-accent font-bold" style={{ fontSize: '32px' }}>
              {t('guide.encyclopedia')}
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {(['enemies', 'hero', 'abilities', 'lore'] as GuideCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`hud-button px-5 py-2 font-bold transition-all ${activeCategory === cat ? '' : ''}`}
                style={{
                  fontSize: '16px',
                  borderColor: activeCategory === cat ? 'rgba(0, 200, 255, 0.9)' : 'rgba(0, 200, 255, 0.5)',
                  backgroundColor: activeCategory === cat ? 'rgba(0, 200, 255, 0.1)' : 'rgba(0, 0, 0, 0.85)'
                }}
              >
                <span className={activeCategory === cat ? 'hud-text-accent' : 'hud-text'}>{t(`guide.tabs.${cat}`)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative z-10">

          {/* ENEMIES TAB */}
          {activeCategory === 'enemies' && (
            <>
              {/* Left Sidebar */}
              <div className="w-80 border-r-2 border-cyan-500/30 overflow-y-auto guide-sidebar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                <div className="p-4">
                  <h2 className="hud-text-accent font-bold mb-4 pb-2 border-b-2 border-cyan-500/30" style={{ fontSize: '16px' }}>{t('guide.selectEnemy')}</h2>
                  {enemies.map((enemy) => {
                    const colors = getTypeColor(enemy.type);
                    return (
                      <button
                        key={enemy.id}
                        onClick={() => setSelectedEnemy(enemy.id)}
                        className={`w-full flex items-center gap-4 p-4 mb-2 hud-panel transition-all relative hover:scale-105 ${selectedEnemy === enemy.id ? 'selected' : ''}`}
                        style={{
                          borderColor: selectedEnemy === enemy.id ? colors.border : 'rgba(0, 200, 255, 0.5)',
                          backgroundColor: selectedEnemy === enemy.id ? colors.bg : 'rgba(0, 0, 0, 0.85)'
                        }}
                      >
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <img
                          src={enemy.image}
                          alt={enemy.name}
                          className="w-14 h-14 object-contain"
                          style={{
                            imageRendering: 'pixelated'
                          }}
                        />
                        <div className="text-left">
                          <div className="hud-text font-bold" style={{ fontSize: '18px' }}>{enemy.name}</div>
                          <div className="hud-text-accent" style={{ fontSize: '14px' }}>{enemy.title}</div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Coming Soon Message */}
                  <div className="hud-panel p-4 mt-4 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <p className="hud-text-warning text-center font-bold" style={{ fontSize: '14px' }}>
                      {t('guide.moreEnemiesSoon')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                {selectedEnemyData && (
                  <div className="max-w-4xl w-full">
                    {/* Enemy Header */}
                    <div className="flex gap-6 mb-6 pb-5 border-b-2 border-cyan-500/30">
                      <div
                        className="w-40 h-40 shrink-0 hud-panel flex items-center justify-center relative"
                        style={{ borderColor: getTypeColor(selectedEnemyData.type).border }}
                      >
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <img
                          src={selectedEnemyData.image}
                          alt={selectedEnemyData.name}
                          className="w-32 h-32 object-contain"
                          style={{
                            imageRendering: 'pixelated'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="hud-text font-bold" style={{ fontSize: '32px' }}>{selectedEnemyData.name}</h2>
                          <span
                            className="hud-panel px-3 py-1 font-bold relative"
                            style={{
                              fontSize: '14px',
                              backgroundColor: getTypeColor(selectedEnemyData.type).bg,
                              borderColor: getTypeColor(selectedEnemyData.type).border,
                            }}
                          >
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text">{t(`guide.types.${selectedEnemyData.type}`)}</span>
                          </span>
                        </div>
                        <div className="hud-text-accent italic mb-3" style={{ fontSize: '16px' }}>"{selectedEnemyData.title}"</div>
                        <p className="hud-text mb-4" style={{ fontSize: '16px' }}>{selectedEnemyData.description}</p>

                        {/* Stats */}
                        <div className="flex gap-4">
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(255, 68, 68, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-danger" style={{ fontSize: '12px' }}>{t('guide.stats.hp')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.hp}</span>
                          </div>
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(0, 200, 255, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-accent" style={{ fontSize: '12px' }}>{t('guide.stats.speed')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.speed}</span>
                          </div>
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-warning" style={{ fontSize: '12px' }}>{t('guide.stats.dmg')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.damage}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Abilities Section */}
                    <div className="mb-6">
                      <h3 className="hud-text-warning font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                        <PixelIcon name="star" size={24} /> {t('guide.abilities')}
                      </h3>
                      <div className="space-y-4">
                        {selectedEnemyData.abilities.map((ability, idx) => (
                          <div key={idx} className="hud-panel p-5 relative">
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <div className="flex gap-5">
                              <div className="w-48 h-48 shrink-0 hud-panel flex items-center justify-center overflow-hidden relative">
                                <div className="hud-corner hud-corner-tl"></div>
                                <div className="hud-corner hud-corner-tr"></div>
                                <div className="hud-corner hud-corner-bl"></div>
                                <div className="hud-corner hud-corner-br"></div>
                                <img
                                  src={ability.image}
                                  alt={ability.name}
                                  className="w-full h-full object-cover"
                                  style={{ imageRendering: 'pixelated' }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = '<div class="hud-text-accent text-center" style="font-size: 11px; padding: 4px;">SCREENSHOT</div>';
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="hud-text font-bold mb-1" style={{ fontSize: '18px' }}>{ability.name}</h4>
                                <p className="hud-text-warning mb-2" style={{ fontSize: '15px' }}>{ability.description}</p>
                                <p className="hud-text-accent" style={{ fontSize: '14px', lineHeight: '1.5' }}>{ability.details}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lore Section */}
                    <div>
                      <h3 className="hud-text-accent font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                        <PixelIcon name="heart" size={24} /> {t('guide.lore')}
                      </h3>
                      <div className="hud-panel p-5 relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <p className="hud-text whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.6' }}>{selectedEnemyData.lore}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* HERO TAB */}
          {activeCategory === 'hero' && (
            <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
              <div className="max-w-4xl w-full">
                {/* Hero Header */}
                <div className="flex gap-6 mb-6 pb-5 border-b-2 border-cyan-500/30">
                  <div className="w-44 h-44 shrink-0 hud-panel flex items-center justify-center relative">
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <img
                      src="/assets/sprites/player.png"
                      alt={t('guide.hero.title')}
                      className="w-36 h-36 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="hud-text-accent font-bold mb-2" style={{ fontSize: '32px' }}>{t('guide.hero.title')}</h2>
                    <div className="hud-text-accent italic mb-3" style={{ fontSize: '16px' }}>{t('guide.hero.subtitle')}</div>
                    <p className="hud-text mb-4" style={{ fontSize: '16px' }}>
                      {t('guide.hero.description')}
                    </p>

                    <div className="flex gap-4 flex-wrap">
                      <div className="hud-panel px-4 py-2 relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <span className="hud-text-accent" style={{ fontSize: '12px' }}>{t('guide.hero.class')}</span>
                        <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{t('guide.hero.classValue')}</span>
                      </div>
                      <div className="hud-panel px-4 py-2 relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <span className="hud-text-accent" style={{ fontSize: '12px' }}>{t('guide.hero.specialty')}</span>
                        <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{t('guide.hero.specialtyValue')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mb-6">
                  <h3 className="hud-text-accent font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                    <PixelIcon name="bolt" size={24} /> {t('controls')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'WASD', action: t('guide.controls.movement') },
                      { key: 'MOUSE', action: t('guide.controls.aim') },
                      { key: 'L-CLICK', action: t('guide.controls.attack') },
                      { key: '1-5', action: t('guide.controls.abilities') },
                      { key: 'E', action: t('guide.controls.interact') },
                      { key: 'ESC', action: t('guide.controls.pause') },
                    ].map((control, idx) => (
                      <div key={idx} className="hud-panel p-4 text-center relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <div className="hud-text-warning font-bold" style={{ fontSize: '18px' }}>{control.key}</div>
                        <div className="hud-text-accent" style={{ fontSize: '14px' }}>{control.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coming Soon - Weapons */}
                <div className="mb-6">
                  <div className="hud-panel p-4 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <p className="hud-text-warning text-center font-bold" style={{ fontSize: '16px' }}>
                      {t('guide.moreWeaponsSoon')}
                    </p>
                  </div>
                </div>

                {/* Backstory */}
                <div>
                  <h3 className="hud-text-accent font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                    <PixelIcon name="heart" size={24} /> {t('guide.hero.storyTitle')}
                  </h3>
                  <div className="hud-panel p-5 relative">
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <p className="hud-text whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                      <Trans i18nKey="guide.hero.storyContent"/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABILITIES TAB */}
          {activeCategory === 'abilities' && (
            <>
              {/* Left Sidebar */}
              <div className="w-80 border-r-2 border-cyan-500/30 overflow-y-auto guide-sidebar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                <div className="p-4">
                  <h2 className="hud-text-accent font-bold mb-4 pb-2 border-b-2 border-cyan-500/30" style={{ fontSize: '16px' }}>{t('guide.selectAbility')}</h2>
                  {ACTIVE_ABILITIES.map((ability) => (
                    <button
                      key={ability.type}
                      onClick={() => setSelectedAbility(ability.type)}
                      className={`w-full flex items-center gap-4 p-4 mb-2 hud-panel transition-all relative hover:scale-105 ${selectedAbility === ability.type ? 'selected' : ''}`}
                      style={{
                        borderColor: selectedAbility === ability.type ? 'rgba(255, 170, 0, 0.8)' : 'rgba(0, 200, 255, 0.5)',
                        backgroundColor: selectedAbility === ability.type ? 'rgba(255, 170, 0, 0.1)' : 'rgba(0, 0, 0, 0.85)'
                      }}
                    >
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <div className="w-12 h-12 hud-panel flex items-center justify-center relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <PixelIcon name={ability.icon} size={28} />
                      </div>
                      <div className="text-left">
                        <div className="hud-text font-bold" style={{ fontSize: '16px' }}>{t(`guide.abilities.${ability.type}.name`)}</div>
                        <div className="hud-text-accent" style={{ fontSize: '13px' }}>{t('guide.duration', { duration: ability.duration / 1000 })}</div>
                      </div>
                    </button>
                  ))}

                  {/* Coming Soon Message */}
                  <div className="hud-panel p-4 mt-4 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <p className="hud-text-warning text-center font-bold" style={{ fontSize: '14px' }}>
                      {t('guide.moreAbilitiesSoon')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                {selectedAbilityData && (
                  <div className="max-w-4xl w-full">
                    <div className="flex gap-6 mb-6 pb-5 border-b-2 border-cyan-500/30">
                      <div className="w-28 h-28 shrink-0 hud-panel flex items-center justify-center relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <PixelIcon name={selectedAbilityData.icon} size={64} />
                      </div>
                      <div className="flex-1">
                        <h2 className="hud-text-warning font-bold mb-2" style={{ fontSize: '32px' }}>{t(`guide.abilities.${selectedAbilityData.type}.name`).toUpperCase()}</h2>
                        <p className="hud-text mb-4" style={{ fontSize: '16px' }}>{t(`guide.abilities.${selectedAbilityData.type}.description`)}</p>

                        <div className="flex gap-4">
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(0, 255, 136, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-success" style={{ fontSize: '12px' }}>{t('guide.durationLabel')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '18px' }}>{selectedAbilityData.duration / 1000}s</span>
                          </div>
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(255, 68, 68, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-danger" style={{ fontSize: '12px' }}>{t('guide.cooldownLabel')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '18px' }}>{selectedAbilityData.cooldown / 1000}s</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div className="hud-panel p-5 mb-5 relative">
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <h3 className="hud-text-accent font-bold mb-3" style={{ fontSize: '20px' }}>{t('guide.howItWorks')}</h3>
                      <p className="hud-text" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                        {t(`guide.abilities.${selectedAbilityData.type}.details`)}
                      </p>
                    </div>

                    {/* Tips */}
                    <div className="hud-panel p-5 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <h3 className="hud-text-warning font-bold mb-3 flex items-center gap-2" style={{ fontSize: '20px' }}>
                        <PixelIcon name="bolt" size={20} /> {t('guide.proTips')}
                      </h3>
                      <ul className="hud-text space-y-2" style={{ fontSize: '15px' }}>
                        {selectedAbilityData.type === 'shield' && (
                          <Trans i18nKey="guide.abilities.shield.tips"/>
                        )}
                        {selectedAbilityData.type === 'fire_ring' && (
                          <Trans i18nKey="guide.abilities.fire_ring.tips" />
                        )}
                        {selectedAbilityData.type === 'speed_boost' && (
                          <Trans i18nKey="guide.abilities.speed_boost.tips"/>
                        )}
                        {selectedAbilityData.type === 'damage_boost' && (
                          <Trans i18nKey="guide.abilities.damage_boost.tips" />
                        )}
                        {selectedAbilityData.type === 'freeze' && (
                          <Trans i18nKey="guide.abilities.freeze.tips" />
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* LORE TAB */}
          {activeCategory === 'lore' && (
            <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
              <div className="max-w-4xl w-full space-y-6">
                {loreEntries.map((entry) => (
                  <div key={entry.id} className="hud-panel p-6 relative">
                    <div className="hud-corner hud-corner-tl"></div>
                    <div className="hud-corner hud-corner-tr"></div>
                    <div className="hud-corner hud-corner-bl"></div>
                    <div className="hud-corner hud-corner-br"></div>
                    <h2 className="hud-text-accent font-bold mb-4 flex items-center gap-3" style={{ fontSize: '26px' }}>
                      <PixelIcon name="heart" size={28} /> {entry.title}
                    </h2>
                    <p className="hud-text whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.7' }}>{entry.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Guide;
