import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<GuideCategory>('enemies');
  const [selectedEnemy, setSelectedEnemy] = useState<string>('swarmer');
  const abilityKeys = Object.keys(t('guide.abilities', { returnObjects: true }) || {});
  const [selectedAbility, setSelectedAbility] = useState<string>(abilityKeys[0] || 'shield');

  const enemyTypes: { [key: string]: 'weak' | 'normal' | 'strong' | 'lazer' } = {
    swarmer: 'weak',
    soldier: 'normal',
    commander: 'strong',
    lazer: 'lazer',
  };

  const enemyImageMap: { [key: string]: string } = {
    swarmer: '/assets/sprites/enemy_weak.png',
    soldier: '/assets/sprites/enemy_normal.png',
    commander: '/assets/sprites/enemy_strong.png',
    lazer: '/assets/sprites/enemy_lazer.png',
  };

  const abilityImageMap: { [key: string]: { [key: string]: string } } = {
    swarmer: {
      detonation: '/assets/guide/swarmer_explosion.png',
      pursuit: '/assets/guide/swarmer_pursuit.png',
      deployment: '/assets/guide/swarmer_swarm.png',
    },
    soldier: {
      tracking_plasma: '/assets/guide/hunter_homing.png',
      linear_bolt: '/assets/guide/hunter_projectile.png',
      positioning: '/assets/guide/hunter_movement.png',
    },
    commander: {
      defensive_field: '/assets/guide/overlord_shield.png',
      charged_cannon: '/assets/guide/overlord_laser.png',
      berserker_protocol: '/assets/guide/overlord_berserk.png',
    },
    lazer: {
      unknown: '/assets/sprites/enemy_lazer.png',
    },
  };

  const abilityIconMap: { [key: string]: string } = {
    shield: '/assets/icons/shield.png',
    fire_ring: '/assets/icons/fire_ring.png',
    speed_boost: '/assets/icons/speed_boost.png',
    damage_boost: '/assets/icons/damage_boost.png',
    freeze: '/assets/icons/freeze.png',
  };

  const enemyKeys = Object.keys(t('guide.enemies', { returnObjects: true }) || {});
  const enemies: EnemyData[] = enemyKeys.map(key => {
    const abilitiesData = t(`guide.enemies.${key}.abilities`, { returnObjects: true }) as { [key: string]: { name: string; description: string; details: string } };
    return {
      id: key,
      name: t(`guide.enemies.${key}.name`),
      title: t(`guide.enemies.${key}.title`),
      type: enemyTypes[key],
      image: enemyImageMap[key],
      hp: t(`guide.enemies.${key}.hp`),
      speed: t(`guide.enemies.${key}.speed`),
      damage: t(`guide.enemies.${key}.damage`),
      description: t(`guide.enemies.${key}.description`),
      lore: t(`guide.enemies.${key}.lore`),
      abilities: Object.keys(abilitiesData).map(abilityKey => ({
        name: t(`guide.enemies.${key}.abilities.${abilityKey}.name`),
        description: t(`guide.enemies.${key}.abilities.${abilityKey}.description`),
        details: t(`guide.enemies.${key}.abilities.${abilityKey}.details`),
        image: abilityImageMap[key]?.[abilityKey] || '',
      })),
    };
  });

  const loreKeys = Object.keys(t('guide.loreEntries', { returnObjects: true }) || {});
  const loreEntries = loreKeys.map(key => ({
    id: key,
    title: t(`guide.loreEntries.${key}.title`),
    content: t(`guide.loreEntries.${key}.content`),
  }));

  const selectedEnemyData = enemies.find(e => e.id === selectedEnemy);

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
              <span className="hud-text">{t('guide_back')}</span>
            </button>
            <h1 className="hud-text-accent font-bold" style={{ fontSize: '32px' }}>
              {t('guide_encyclopedia')}
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
                            <span className="hud-text">{selectedEnemyData.type.toUpperCase()}</span>
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
                                    target.parentElement!.innerHTML = `<div class="hud-text-accent text-center" style="font-size: 11px; padding: 4px;">${t('guide.screenshot')}</div>`;
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="hud-text font-bold mb-1" style={{ fontSize: '18px' }}>{ability.name}</h4>
                                <p className="hud-text-accent italic mb-3" style={{ fontSize: '14px' }}>{ability.description}</p>
                                <p className="hud-text whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.6' }}>{ability.details}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lore Section */}
                    <div>
                      <h3 className="hud-text-accent font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                        <PixelIcon name="book" size={24} /> {t('guide.lore')}
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
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
              <div className="hud-panel p-8 text-center">
                <h2 className="hud-text-accent font-bold text-3xl mb-4">{t('comingSoon')}</h2>
                <p className="hud-text text-lg">Hero information will be available soon.</p>
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
                  {abilityKeys.map((abilityKey) => (
                    <button
                      key={abilityKey}
                      onClick={() => setSelectedAbility(abilityKey)}
                      className={`w-full flex items-center gap-4 p-4 mb-2 hud-panel transition-all relative hover:scale-105 ${selectedAbility === abilityKey ? 'selected' : ''}`}
                      style={{ 
                        borderColor: selectedAbility === abilityKey ? 'rgba(0, 200, 255, 0.9)' : 'rgba(0, 200, 255, 0.5)',
                        backgroundColor: selectedAbility === abilityKey ? 'rgba(0, 200, 255, 0.1)' : 'rgba(0, 0, 0, 0.85)'
                      }}
                    >
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <img 
                        src={abilityIconMap[abilityKey]} 
                        alt={t(`guide.abilities.${abilityKey}.name`)}
                        className="w-14 h-14 object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="text-left">
                        <div className="hud-text font-bold" style={{ fontSize: '18px' }}>{t(`guide.abilities.${abilityKey}.name`)}</div>
                        <div className="hud-text-accent" style={{ fontSize: '14px' }}>{t(`guide.duration`, { duration: t(`guide.abilities.${abilityKey}.duration`) })}</div>
                      </div>
                    </button>
                  ))}
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
                {selectedAbility && (
                  <div className="max-w-4xl w-full">
                    <div className="flex gap-6 mb-6 pb-5 border-b-2 border-cyan-500/30">
                      <div className="w-40 h-40 shrink-0 hud-panel flex items-center justify-center relative">
                        <div className="hud-corner hud-corner-tl"></div>
                        <div className="hud-corner hud-corner-tr"></div>
                        <div className="hud-corner hud-corner-bl"></div>
                        <div className="hud-corner hud-corner-br"></div>
                        <img 
                          src={abilityIconMap[selectedAbility]} 
                          alt={t(`guide.abilities.${selectedAbility}.name`)}
                          className="w-32 h-32 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="hud-text font-bold" style={{ fontSize: '32px' }}>{t(`guide.abilities.${selectedAbility}.name`)}</h2>
                        <div className="hud-text-accent italic mb-3" style={{ fontSize: '16px' }}>{t(`guide.abilities.${selectedAbility}.description`)}</div>
                        
                        <div className="flex gap-4">
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(0, 200, 255, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-accent" style={{ fontSize: '12px' }}>{t('guide.durationLabel')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{t(`guide.abilities.${selectedAbility}.duration`)}</span>
                          </div>
                          <div className="hud-panel px-4 py-2 relative" style={{ '--hud-border-color': 'rgba(255, 170, 0, 0.5)' } as React.CSSProperties}>
                            <div className="hud-corner hud-corner-tl"></div>
                            <div className="hud-corner hud-corner-tr"></div>
                            <div className="hud-corner hud-corner-bl"></div>
                            <div className="hud-corner hud-corner-br"></div>
                            <span className="hud-text-warning" style={{ fontSize: '12px' }}>{t('guide.cooldownLabel')}</span>
                            <span className="hud-text font-bold ml-2" style={{ fontSize: '16px' }}>{t(`guide.abilities.${selectedAbility}.cooldown`)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* How it works */}
                      <div className="mb-6">
                        <h3 className="hud-text-accent font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                          <PixelIcon name="info" size={24} /> {t('guide.howItWorks')}
                        </h3>
                        <div className="hud-panel p-5 relative">
                          <div className="hud-corner hud-corner-tl"></div>
                          <div className="hud-corner hud-corner-tr"></div>
                          <div className="hud-corner hud-corner-bl"></div>
                          <div className="hud-corner hud-corner-br"></div>
                          <p className="hud-text whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                            {t(`guide.abilities.${selectedAbility}.details`)}
                          </p>
                        </div>
                      </div>

                      {/* Pro-tips */}
                      <div className="mb-6">
                        <h3 className="hud-text-warning font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                          <PixelIcon name="star" size={24} /> {t('guide.proTips')}
                        </h3>
                        <div className="hud-panel p-5 relative">
                          <div className="hud-corner hud-corner-tl"></div>
                          <div className="hud-corner hud-corner-tr"></div>
                          <div className="hud-corner hud-corner-bl"></div>
                          <div className="hud-corner hud-corner-br"></div>
                          <ul 
                            className="hud-text list-disc pl-5 space-y-2" 
                            style={{ fontSize: '15px', lineHeight: '1.6' }}
                            dangerouslySetInnerHTML={{ __html: t(`guide.abilities.${selectedAbility}.tips`) }}
                          >
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* LORE TAB */}
          {activeCategory === 'lore' && (
            <div className="flex-1 overflow-y-auto p-6 guide-content" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
              <div className="max-w-5xl mx-auto">
                <h2 className="hud-text-accent font-bold text-3xl mb-6 pb-3 border-b-2 border-cyan-500/30">{t('guide.lore')}</h2>
                <div className="space-y-8">
                  {loreEntries.map((entry) => (
                    <div key={entry.id} className="hud-panel p-6 relative">
                      <div className="hud-corner hud-corner-tl"></div>
                      <div className="hud-corner hud-corner-tr"></div>
                      <div className="hud-corner hud-corner-bl"></div>
                      <div className="hud-corner hud-corner-br"></div>
                      <h3 className="hud-text font-bold text-2xl mb-3">{entry.title}</h3>
                      <p className="hud-text whitespace-pre-wrap leading-relaxed" style={{ fontSize: '16px' }}>{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Guide;
