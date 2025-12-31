import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PowerUp } from '../types/game';
import { PixelIcon } from '../utils/pixelIcons';

interface PowerUpSelectionProps {
  powerUps: PowerUp[];
  onSelectPowerUp: (powerUp: PowerUp) => void;
  wave: number;
}

const PowerUpSelection = ({ powerUps, onSelectPowerUp, wave }: PowerUpSelectionProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if modal is visible (prevent conflicts with other key handlers)
      const key = e.key;
      
      if (key === '1' && powerUps[0]) {
        e.preventDefault();
        e.stopPropagation();
        onSelectPowerUp(powerUps[0]);
      } else if (key === '2' && powerUps[1]) {
        e.preventDefault();
        e.stopPropagation();
        onSelectPowerUp(powerUps[1]);
      } else if (key === '3' && powerUps[2]) {
        e.preventDefault();
        e.stopPropagation();
        onSelectPowerUp(powerUps[2]);
      }
    };

    // Use capture phase to ensure we catch the event early
    window.addEventListener('keydown', handleKeyPress, true);
    return () => window.removeEventListener('keydown', handleKeyPress, true);
  }, [powerUps, onSelectPowerUp]);

  const getPowerUpIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      attack_speed: 'bolt',
      damage: 'star',
      max_health: 'heart',
      knockback: 'arrow-up',
      cooldown: 'refresh',
      // Ability icons
      ability_shield: 'lock-alt',
      ability_fire_ring: 'fire',
      ability_speed_boost: 'bolt',
      ability_damage_boost: 'star',
      ability_freeze: 'circle-notch',
    };
    return icons[id] || 'bolt';
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50" style={{ fontFamily: "'Pixelify Sans', sans-serif" }}>
        <div className="hud-panel p-12 max-w-6xl shadow-2xl relative" style={{ imageRendering: 'pixelated' }}>
          <div className="hud-corner hud-corner-tl"></div>
          <div className="hud-corner hud-corner-tr"></div>
          <div className="hud-corner hud-corner-bl"></div>
          <div className="hud-corner hud-corner-br"></div>
          <div className="text-center mb-8">
            <h2 className="hud-text-success mb-4 font-bold" style={{ fontSize: '48px' }}>{t('levelUp')}</h2>
            <p className="hud-text-warning font-bold" style={{ fontSize: '24px' }}>{t('waveComplete', { wave })}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {powerUps.map((powerUp, index) => (
              <div
                key={powerUp.id}
                className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors flex flex-col items-center text-center"
                onClick={() => onSelectPowerUp(powerUp)}
              >
                <div className="text-4xl mb-2">
                  <PixelIcon name={getPowerUpIcon(powerUp.id)} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(powerUp.name)}
                </h3>
                <p className="text-sm text-gray-400">
                  {t(powerUp.description)}
                </p>
                <div className="mt-4 text-sm font-bold text-white">
                  Press {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerUpSelection;
