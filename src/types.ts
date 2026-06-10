export type TargetType = 'single_enemy' | 'all_enemies' | 'single_ally' | 'all_allies' | 'self';

export interface Skill {
  id: string;
  name: string;
  description: string;
  mpCost: number;
  type: 'physical' | 'magical' | 'heal' | 'buff' | 'debuff';
  target: TargetType;
  element: 'none' | 'fire' | 'ice' | 'wind' | 'light';
}

export interface UniqueAbility {
  id: string;
  name: string;
  description: string;
  spCost: number;
}

export interface SpecialCombo {
  id: string;
  name: string;
  description: string;
  skillAId: string;
  skillBId: string;
  abilityId: string;
  mpCost: number;
  spCost: number;
  type: 'physical' | 'magical' | 'heal' | 'buff' | 'debuff' | 'combo';
  target: TargetType;
  element: 'none' | 'fire' | 'ice' | 'wind' | 'light' | 'combined';
  executeEffects: (attacker: CharacterState, targets: (CharacterState | EnemyState)[]) => {
    damageLog: string;
    damageValues?: { id: string; val: number; type: 'damage' | 'heal' | 'shield' | 'miss' }[];
  };
}

export interface CharacterState {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  colorTheme: string; // Tailwind color e.g., 'amber', 'sky', 'emerald'
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  maxSp: number;
  sp: number; // For Ultimate / Unique Ability
  atk: number;
  def: number;
  matk: number;
  spd: number;
  skills: Skill[];
  uniqueAbility: UniqueAbility;
  // Statuses
  shield: number;
  statuses: {
    type: 'atk_buff' | 'def_buff' | 'spd_buff' | 'invincibility';
    duration: number;
    value?: number;
  }[];
  isFallen: boolean;
}

export interface EnemyState {
  id: string;
  name: string;
  level: number;
  avatarSeed: string; // simple visual representation representation seed
  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  isBoss: boolean;
  statuses: {
    type: 'burn' | 'freeze' | 'stun' | 'atk_debuff' | 'def_debuff';
    duration: number;
    value?: number;
  }[];
}

export interface BattleLog {
  id: string;
  text: string;
  type: 'system' | 'player_action' | 'enemy_action' | 'combo' | 'heal' | 'damage' | 'status_gain' | 'victory' | 'defeat';
}

export interface FloatingText {
  id: string;
  text: string | number;
  x: number; // percentage
  y: number; // percentage
  type: 'damage' | 'heal' | 'crit' | 'combo' | 'status' | 'shield' | 'miss';
}
