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
  type: 'weak' | 'normal' | 'strong';
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
  const [selectedAbility, setSelectedAbility] = useState<string>('shield');

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
      default: return { bg: '#3a3a3a', border: '#888888', text: '#cccccc' };
    }
  };

  return (
    <>
      <style>{`
        .guide-sidebar::-webkit-scrollbar {
          width: 16px;
        }
        .guide-sidebar::-webkit-scrollbar-track {
          background: #1a0000;
          border: 2px solid #3a0000;
        }
        .guide-sidebar::-webkit-scrollbar-thumb {
          background: #5a0000;
          border: 2px solid #3a0000;
        }
        .guide-sidebar::-webkit-scrollbar-thumb:hover {
          background: #7a0000;
        }
        .guide-content::-webkit-scrollbar {
          width: 16px;
        }
        .guide-content::-webkit-scrollbar-track {
          background: #1a0000;
          border: 2px solid #3a0000;
        }
        .guide-content::-webkit-scrollbar-thumb {
          background: #5a0000;
          border: 2px solid #3a0000;
        }
        .guide-content::-webkit-scrollbar-thumb:hover {
          background: #7a0000;
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
          style={{ imageRendering: 'pixelated', zIndex: 0 }}
        />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center p-4 border-b-4 border-white" style={{ backgroundColor: 'rgba(58, 0, 0, 0.9)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="border-4 border-white py-3 px-8 text-white font-bold hover:bg-red-800 transition-all"
              style={{ fontSize: '18px', backgroundColor: '#5a0000' }}
            >
              {t('back')}
            </button>
            <h1 className="text-white font-bold" style={{ fontSize: '32px', textShadow: '2px 2px 0px rgba(0,0,0,0.8)' }}>
              {t('guide.encyclopedia')}
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            {(['enemies', 'hero', 'abilities', 'lore'] as GuideCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 font-bold border-4 border-white transition-all tab-button ${activeCategory === cat ? 'active' : ''}`}
                style={{ fontSize: '16px' }}
              >
                {t(`guide.tabs.${cat}`)}
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
              <div className="w-80 border-r-4 border-white overflow-y-auto guide-sidebar" style={{ backgroundColor: 'rgba(26, 0, 0, 0.9)' }}>
                <div className="p-4">
                  <h2 className="text-gray-300 font-bold mb-4 pb-2 border-b-2 border-gray-700" style={{ fontSize: '16px' }}>{t('guide.selectEnemy')}</h2>
                  {enemies.map((enemy) => {
                    const colors = getTypeColor(enemy.type);
                    return (
                      <button
                        key={enemy.id}
                        onClick={() => setSelectedEnemy(enemy.id)}
                        className={`w-full flex items-center gap-4 p-4 mb-2 border-4 transition-all list-item ${selectedEnemy === enemy.id ? 'selected' : ''}`}
                        style={{ 
                          borderColor: selectedEnemy === enemy.id ? colors.border : '#5a0000',
                          backgroundColor: selectedEnemy === enemy.id ? colors.bg : undefined
                        }}
                      >
                        <img 
                          src={enemy.image} 
                          alt={enemy.name}
                          className="w-14 h-14 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="text-left">
                          <div className="font-bold text-white" style={{ fontSize: '18px' }}>{enemy.name}</div>
                          <div className="text-gray-400" style={{ fontSize: '14px' }}>{enemy.title}</div>
                        </div>
                      </button>
                    );
                  })}
                  
                  {/* Coming Soon Message */}
                  <div className="border-4 border-yellow-900/50 p-4 mt-4" style={{ backgroundColor: 'rgba(90, 60, 0, 0.2)' }}>
                    <p className="text-yellow-300 text-center font-bold" style={{ fontSize: '14px' }}>
                      {t('guide.moreEnemiesSoon')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(26, 0, 0, 0.85)' }}>
                {selectedEnemyData && (
                  <div className="max-w-4xl w-full">
                    {/* Enemy Header */}
                    <div className="flex gap-6 mb-6 pb-5 border-b-4 border-gray-700">
                      <div 
                        className="w-40 h-40 shrink-0 border-4 flex items-center justify-center"
                        style={{ borderColor: getTypeColor(selectedEnemyData.type).border, backgroundColor: 'rgba(0,0,0,0.5)' }}
                      >
                        <img 
                          src={selectedEnemyData.image} 
                          alt={selectedEnemyData.name}
                          className="w-32 h-32 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-white font-bold" style={{ fontSize: '32px' }}>{selectedEnemyData.name}</h2>
                          <span 
                            className="px-3 py-1 font-bold border-2"
                            style={{ 
                              fontSize: '14px',
                              backgroundColor: getTypeColor(selectedEnemyData.type).bg,
                              borderColor: getTypeColor(selectedEnemyData.type).border,
                              color: getTypeColor(selectedEnemyData.type).text
                            }}
                          >
                            {t(`guide.types.${selectedEnemyData.type}`)}
                          </span>
                        </div>
                        <div className="text-gray-400 italic mb-3" style={{ fontSize: '16px' }}>"{selectedEnemyData.title}"</div>
                        <p className="text-gray-300 mb-4" style={{ fontSize: '16px' }}>{selectedEnemyData.description}</p>
                        
                        {/* Stats */}
                        <div className="flex gap-4">
                          <div className="border-2 border-red-900 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className="text-red-400" style={{ fontSize: '12px' }}>{t('guide.stats.hp')}</span>
                            <span className="text-white font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.hp}</span>
                          </div>
                          <div className="border-2 border-blue-900 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className="text-blue-400" style={{ fontSize: '12px' }}>{t('guide.stats.speed')}</span>
                            <span className="text-white font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.speed}</span>
                          </div>
                          <div className="border-2 border-orange-900 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className="text-orange-400" style={{ fontSize: '12px' }}>{t('guide.stats.dmg')}</span>
                            <span className="text-white font-bold ml-2" style={{ fontSize: '16px' }}>{selectedEnemyData.damage}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Abilities Section */}
                    <div className="mb-6">
                      <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                        <PixelIcon name="star" size={24} /> {t('guide.abilities')}
                      </h3>
                      <div className="space-y-4">
                        {selectedEnemyData.abilities.map((ability, idx) => (
                          <div key={idx} className="border-4 border-gray-700 p-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <div className="flex gap-5">
                              <div className="w-48 h-48 shrink-0 border-2 border-gray-600 flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                                <img 
                                  src={ability.image} 
                                  alt={ability.name}
                                  className="w-full h-full object-cover"
                                  style={{ imageRendering: 'pixelated' }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `<div class="text-gray-600 text-center" style="font-size: 11px; padding: 4px;">${t('guide.screenshot')}</div>`;
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-bold mb-1" style={{ fontSize: '18px' }}>{ability.name}</h4>
                                <p className="text-yellow-400 mb-2" style={{ fontSize: '15px' }}>{ability.description}</p>
                                <p className="text-gray-400" style={{ fontSize: '14px', lineHeight: '1.5' }}>{ability.details}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lore Section */}
                    <div>
                      <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                        <PixelIcon name="heart" size={24} /> {t('guide.lore')}
                      </h3>
                      <div className="border-4 border-purple-900 p-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <p className="text-gray-300 whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.6' }}>{selectedEnemyData.lore}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* HERO TAB */}
          {activeCategory === 'hero' && (
            <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(26, 0, 0, 0.85)' }}>
              <div className="max-w-4xl w-full">
                {/* Hero Header */}
                <div className="flex gap-6 mb-6 pb-5 border-b-4 border-cyan-700">
                  <div className="w-44 h-44 shrink-0 border-4 border-cyan-500 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <img 
                      src="/assets/sprites/player.png" 
                      alt={t('guide.hero.title')}
                      className="w-36 h-36 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-cyan-400 font-bold mb-2" style={{ fontSize: '32px' }}>{t('guide.hero.title')}</h2>
                    <div className="text-gray-400 italic mb-3" style={{ fontSize: '16px' }}>"{t('guide.hero.subtitle')}"</div>
                    <p className="text-gray-300 mb-4" style={{ fontSize: '16px' }}>
                      {t('guide.hero.description')}
                    </p>
                    
                    <div className="flex gap-4 flex-wrap">
                      <div className="border-2 border-cyan-700 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <span className="text-cyan-400" style={{ fontSize: '12px' }}>{t('guide.hero.class')}</span>
                        <span className="text-white font-bold ml-2" style={{ fontSize: '16px' }}>{t('guide.hero.classValue')}</span>
                      </div>
                      <div className="border-2 border-cyan-700 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <span className="text-cyan-400" style={{ fontSize: '12px' }}>{t('guide.hero.specialty')}</span>
                        <span className="text-white font-bold ml-2" style={{ fontSize: '16px' }}>{t('guide.hero.specialtyValue')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
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
                      <div key={idx} className="border-4 border-gray-700 p-4 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="text-yellow-400 font-bold" style={{ fontSize: '18px' }}>{control.key}</div>
                        <div className="text-gray-400" style={{ fontSize: '14px' }}>{control.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coming Soon - Weapons */}
                <div className="mb-6">
                  <div className="border-4 border-yellow-900/50 p-4" style={{ backgroundColor: 'rgba(90, 60, 0, 0.2)' }}>
                    <p className="text-yellow-300 text-center font-bold" style={{ fontSize: '16px' }}>
                      {t('guide.moreWeaponsSoon')}
                    </p>
                  </div>
                </div>

                {/* Backstory */}
                <div>
                  <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2" style={{ fontSize: '22px' }}>
                    <PixelIcon name="heart" size={24} /> {t('guide.hero.storyTitle')}
                  </h3>
                  <div className="border-4 border-purple-900 p-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <p className="text-gray-300" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                      <Trans i18nKey="guide.hero.storyContent">
                        You awoke in the arena with no memory of how you arrived. The last thing you remember is a blinding light, a voice calling your name, and then... darkness.
                        <br /><br />
                        Now you fight. Not just for survival, but for answers. Who brought you here? Why can you resist the corruption when so many others have fallen? And what is the source of the power that courses through your veins every time you claim a new ability?
                        <br /><br />
                        The corrupted fear you. You can see it in the way they hesitate, in the way the Overlords' eyes flicker with something almost like recognition. They know something about you - something even you don't know.
                        <br /><br />
                        <span className="text-cyan-400 font-bold">Your destiny is not to merely survive. It is to end this nightmare once and for all.</span>
                      </Trans>
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
              <div className="w-80 border-r-4 border-white overflow-y-auto guide-sidebar" style={{ backgroundColor: 'rgba(26, 0, 0, 0.9)' }}>
                <div className="p-4">
                  <h2 className="text-gray-300 font-bold mb-4 pb-2 border-b-2 border-gray-700" style={{ fontSize: '16px' }}>{t('guide.selectAbility')}</h2>
                  {ACTIVE_ABILITIES.map((ability) => (
                    <button
                      key={ability.type}
                      onClick={() => setSelectedAbility(ability.type)}
                      className={`w-full flex items-center gap-4 p-4 mb-2 border-4 transition-all list-item ${selectedAbility === ability.type ? 'selected' : ''}`}
                      style={{ borderColor: selectedAbility === ability.type ? '#ffaa00' : '#5a0000' }}
                    >
                      <div className="w-12 h-12 border-2 border-gray-600 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <PixelIcon name={ability.icon} size={28} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-white" style={{ fontSize: '16px' }}>{t(`guide.activeAbilities.${ability.type}.name`)}</div>
                        <div className="text-gray-400" style={{ fontSize: '13px' }}>{t('guide.duration', { duration: ability.duration / 1000 })}</div>
                      </div>
                    </button>
                  ))}
                  
                  {/* Coming Soon Message */}
                  <div className="border-4 border-yellow-900/50 p-4 mt-4" style={{ backgroundColor: 'rgba(90, 60, 0, 0.2)' }}>
                    <p className="text-yellow-300 text-center font-bold" style={{ fontSize: '14px' }}>
                      {t('guide.moreAbilitiesSoon')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(26, 0, 0, 0.85)' }}>
                {selectedAbilityData && (
                  <div className="max-w-4xl w-full">
                    <div className="flex gap-6 mb-6 pb-5 border-b-4 border-yellow-700">
                      <div className="w-28 h-28 shrink-0 border-4 border-yellow-500 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <PixelIcon name={selectedAbilityData.icon} size={64} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-yellow-400 font-bold mb-2" style={{ fontSize: '32px' }}>{t(`guide.activeAbilities.${selectedAbilityData.type}.name`).toUpperCase()}</h2>
                        <p className="text-gray-300 mb-4" style={{ fontSize: '16px' }}>{t(`guide.activeAbilities.${selectedAbilityData.type}.description`)}</p>
                        
                        <div className="flex gap-4">
                          <div className="border-2 border-green-700 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className="text-green-400" style={{ fontSize: '12px' }}>{t('guide.durationLabel')}</span>
                            <span className="text-white font-bold ml-2" style={{ fontSize: '18px' }}>{selectedAbilityData.duration / 1000}s</span>
                          </div>
                          <div className="border-2 border-red-700 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <span className="text-red-400" style={{ fontSize: '12px' }}>{t('guide.cooldownLabel')}</span>
                            <span className="text-white font-bold ml-2" style={{ fontSize: '18px' }}>{selectedAbilityData.cooldown / 1000}s</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* How It Works */}
                    <div className="border-4 border-gray-700 p-5 mb-5" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <h3 className="text-white font-bold mb-3" style={{ fontSize: '20px' }}>{t('guide.howItWorks')}</h3>
                      <p className="text-gray-300" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                        {t(`guide.activeAbilities.${selectedAbilityData.type}.details`)}
                      </p>
                    </div>

                    {/* Tips */}
                    <div className="border-4 border-yellow-900 p-5" style={{ backgroundColor: 'rgba(90, 60, 0, 0.3)' }}>
                      <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2" style={{ fontSize: '20px' }}>
                        <PixelIcon name="bolt" size={20} /> {t('guide.proTips')}
                      </h3>
                      <ul className="text-gray-300 space-y-2" style={{ fontSize: '15px' }}>
                        {selectedAbilityData.type === 'shield' && (
                          <Trans i18nKey="guide.activeAbilities.shield.tips">
                            <li>• Use Shield to safely collect health pickups in dangerous areas</li>
                            <li>• Activate when an Overlord begins charging to nullify their attack</li>
                            <li>• Don't waste it on small groups - save it for emergencies</li>
                          </Trans>
                        )}
                        {selectedAbilityData.type === 'fire_ring' && (
                          <Trans i18nKey="guide.activeAbilities.fire_ring.tips">
                            <li>• Stand still to maximize damage - enemies walking through take repeated hits</li>
                            <li>• Combine with Freeze to trap enemies in the fire longer</li>
                            <li>• Great for clearing Swarmer waves before they can detonate</li>
                          </Trans>
                        )}
                        {selectedAbilityData.type === 'speed_boost' && (
                          <Trans i18nKey="guide.activeAbilities.speed_boost.tips">
                            <li>• Use to kite Overlords while their shield protects other enemies</li>
                            <li>• Perfect for repositioning when surrounded</li>
                            <li>• Can outrun even Berserker-mode Overlords</li>
                          </Trans>
                        )}
                        {selectedAbilityData.type === 'damage_boost' && (
                          <Trans i18nKey="guide.activeAbilities.damage_boost.tips">
                            <li>• Focus fire on Overlords to eliminate their shield aura quickly</li>
                            <li>• Devastating with shotgun or assault rifle weapons</li>
                            <li>• Time it when enemies are clustered for maximum impact</li>
                          </Trans>
                        )}
                        {selectedAbilityData.type === 'freeze' && (
                          <Trans i18nKey="guide.activeAbilities.freeze.tips">
                            <li>• Use to create distance when overwhelmed</li>
                            <li>• Slowed enemies are easier to hit with slow projectiles</li>
                            <li>• Combine with Fire Ring for a deadly combo</li>
                          </Trans>
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
            <div className="flex-1 overflow-y-auto p-6 guide-content flex justify-center" style={{ backgroundColor: 'rgba(26, 0, 0, 0.85)' }}>
              <div className="max-w-4xl w-full space-y-6">
                {loreEntries.map((entry) => (
                  <div key={entry.id} className="border-4 border-purple-900 p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <h2 className="text-purple-400 font-bold mb-4 flex items-center gap-3" style={{ fontSize: '26px' }}>
                      <PixelIcon name="heart" size={28} /> {entry.title}
                    </h2>
                    <p className="text-gray-300 whitespace-pre-line" style={{ fontSize: '15px', lineHeight: '1.7' }}>{entry.content}</p>
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
