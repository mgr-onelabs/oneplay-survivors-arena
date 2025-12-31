import { PowerUp, PlayerStats, ActiveAbilityType } from '../types/game';

export const POWER_UPS: PowerUp[] = [
  {
    id: 'attack_speed',
    name: 'powerups.attack_speed.name',
    description: 'powerups.attack_speed.description',
    effect: (stats: PlayerStats) => ({
      ...stats,
      cooldownReduction: stats.cooldownReduction + 0.25, // Reduces weapon cooldown by 25%
    }),
  },
  {
    id: 'damage',
    name: 'powerups.damage.name',
    description: 'powerups.damage.description',
    effect: (stats: PlayerStats) => ({
      ...stats,
      damage: stats.damage * 1.3,
    }),
  },
  {
    id: 'max_health',
    name: 'powerups.max_health.name',
    description: 'powerups.max_health.description',
    effect: (stats: PlayerStats) => ({
      ...stats,
      maxHealth: stats.maxHealth + 30,
      health: stats.health + 30,
    }),
  },
  {
    id: 'knockback',
    name: 'powerups.knockback.name',
    description: 'powerups.knockback.description',
    effect: (stats: PlayerStats) => ({
      ...stats,
      knockback: stats.knockback * 1.3,
    }),
  },
  {
    id: 'cooldown',
    name: 'powerups.cooldown.name',
    description: 'powerups.cooldown.description',
    effect: (stats: PlayerStats) => ({
      ...stats,
      abilityCooldownReduction: stats.abilityCooldownReduction + 0.3, // Reduces ability cooldown by 30%
    }),
  },
  // Ability power-ups
  {
    id: 'ability_shield',
    name: 'powerups.ability_shield.name',
    description: 'powerups.ability_shield.description',
    effect: (stats: PlayerStats) => stats, // No stat change, handled separately
    abilityType: ActiveAbilityType.SHIELD,
  },
  {
    id: 'ability_fire_ring',
    name: 'powerups.ability_fire_ring.name',
    description: 'powerups.ability_fire_ring.description',
    effect: (stats: PlayerStats) => stats,
    abilityType: ActiveAbilityType.FIRE_RING,
  },
  {
    id: 'ability_speed_boost',
    name: 'powerups.ability_speed_boost.name',
    description: 'powerups.ability_speed_boost.description',
    effect: (stats: PlayerStats) => stats,
    abilityType: ActiveAbilityType.SPEED_BOOST,
  },
  {
    id: 'ability_damage_boost',
    name: 'powerups.ability_damage_boost.name',
    description: 'powerups.ability_damage_boost.description',
    effect: (stats: PlayerStats) => stats,
    abilityType: ActiveAbilityType.DAMAGE_BOOST,
  },
  {
    id: 'ability_freeze',
    name: 'powerups.ability_freeze.name',
    description: 'powerups.ability_freeze.description',
    effect: (stats: PlayerStats) => stats,
    abilityType: ActiveAbilityType.FREEZE,
  },
];
