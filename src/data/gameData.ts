import { CharacterState, Skill, UniqueAbility, SpecialCombo, EnemyState } from '../types';

export const ALRIC_SKILLS: Skill[] = [
  {
    id: 'alric_swift_slash',
    name: '瞬斬 (Swift Slash)',
    description: '疾風迅雷の物理一撃を放ち、蓄積ゲージを多く上昇させる基本の斬撃。(SP +5)',
    mpCost: 0,
    type: 'physical',
    target: 'single_enemy',
    element: 'none',
  },
  {
    id: 'alric_shield_bash',
    name: '盾強撃 (Shield Bash)',
    description: '巨大な盾で敵を激しく強打する。高物理ダメージを与え、30%の確率で気絶(1ターン)させる。',
    mpCost: 10,
    type: 'physical',
    target: 'single_enemy',
    element: 'none',
  },
  {
    id: 'alric_flame_vortex',
    name: '紅蓮渦鳴斬 (Flame Vortex)',
    description: '炎の嵐を巻き起こす回転斬りで敵全体を一掃する火属性物理攻撃。',
    mpCost: 12,
    type: 'physical',
    target: 'all_enemies',
    element: 'fire',
  },
  {
    id: 'alric_dragon_strike',
    name: '昇竜覇断 (Dragon Strike)',
    description: '強力な大上段の太刀で敵単体の防御力を粉砕する。防御力を15%低下、威力極大。',
    mpCost: 16,
    type: 'physical',
    target: 'single_enemy',
    element: 'fire',
  },
  {
    id: 'alric_flame_charge',
    name: '紅蓮衝 (Flame Charge)',
    description: '瞬時に間合いを詰めて突く火属性の急襲物理突き。高めの会心率を持つ。',
    mpCost: 8,
    type: 'physical',
    target: 'single_enemy',
    element: 'fire',
  },
];

export const ALRIC_ABILITY: UniqueAbility = {
  id: 'alric_ignition',
  name: '紅蓮極化 (Ignition)',
  description: '火霊の力を極限まで解放し、全ての物理スキルに灼熱の爆波を付与する。(SP 30消費)',
  spCost: 30,
};

export const SELENE_SKILLS: Skill[] = [
  {
    id: 'selene_frost_needle',
    name: '氷霊針 (Frost Needle)',
    description: '鋭い氷華の針を敵単体に放ち、高水準の氷属性魔法ダメージを与える。',
    mpCost: 6,
    type: 'magical',
    target: 'single_enemy',
    element: 'ice',
  },
  {
    id: 'selene_spell_focus',
    name: '詠唱充填 (Spell Focus)',
    description: '魔術の急流を自己に集中させる。自身のMPを15回復し、魔法防御力を強化する。',
    mpCost: 0,
    type: 'buff',
    target: 'self',
    element: 'none',
  },
  {
    id: 'selene_deep_freeze',
    name: '絶対氷獄 (Deep Freeze)',
    description: '極低温の結界を展開して敵単体に極大魔法ダメージを与え、さらに素早さを低下させる。',
    mpCost: 14,
    type: 'magical',
    target: 'single_enemy',
    element: 'ice',
  },
  {
    id: 'selene_blizzard_armor',
    name: '氷晶の鎧 (Blizzard Armor)',
    description: '吹雪の魔力で味方一人の周囲に氷のシールドを展開する。シールドを25、防御力を上昇。',
    mpCost: 10,
    type: 'buff',
    target: 'single_ally',
    element: 'ice',
  },
  {
    id: 'selene_ice_shard',
    name: '砕氷散華 (Ice Shard)',
    description: '結晶を無数に散布し氷刃を浴びせる氷属性の全体魔法。',
    mpCost: 12,
    type: 'magical',
    target: 'all_enemies',
    element: 'ice',
  },
];

export const SELENE_ABILITY: UniqueAbility = {
  id: 'selene_absolute_zero',
  name: '絶対零度 (Absolute Zero)',
  description: '周囲の分子活動を強制停止させ、氷結魔法の威力と範囲を劇的に拡張する。(SP 40消費)',
  spCost: 40,
};

export const LYRA_SKILLS: Skill[] = [
  {
    id: 'lyra_healing_grace',
    name: '天使の息吹 (Healing Grace)',
    description: '天界の神聖な光を注ぎ込み、味方一人（または自身）の傷を大きく癒やす神聖治療術。',
    mpCost: 8,
    type: 'heal',
    target: 'single_ally',
    element: 'light',
  },
  {
    id: 'lyra_zephyr_wind',
    name: '薫風槍 (Zephyr Wind)',
    description: '敵単体に風刃魔法ダメージを与え、味方一人の素早さを2ターンの間20%上昇させる。',
    mpCost: 12,
    type: 'magical',
    target: 'single_enemy',
    element: 'wind',
  },
  {
    id: 'lyra_wind_gale',
    name: '烈風翔双波 (Wind Gale)',
    description: '荒れ狂う暴風の双刃で敵全体を切り刻み、味方全体の素早さを上昇させる。',
    mpCost: 18,
    type: 'magical',
    target: 'all_enemies',
    element: 'wind',
  },
  {
    id: 'lyra_aura_shield',
    name: '天光の福音 (Aura Shield)',
    description: '味方一人に黄金の加護を授ける。攻撃力と魔法攻撃力を3ターンの間上昇させる。',
    mpCost: 10,
    type: 'buff',
    target: 'single_ally',
    element: 'light',
  },
  {
    id: 'lyra_holy_ray',
    name: '聖輝天極 (Holy Ray)',
    description: '神聖の裁断を敵単体に召喚する光属性の全体魔法。',
    mpCost: 14,
    type: 'magical',
    target: 'single_enemy',
    element: 'light',
  },
];

export const LYRA_ABILITY: UniqueAbility = {
  id: 'lyra_harmonic_resonance',
  name: '共鳴調和 (Resonance)',
  description: '風と聖霊の波長を同期させ、支援術及び治癒神術の対象を全体へと神秘変革する。(SP 30消費)',
  spCost: 30,
};

export const createInitialParty = (): CharacterState[] => [
  {
    id: 'alric',
    name: 'アルリック',
    role: '炎の護衛剣士 (Vanguard)',
    avatarSeed: 'alric',
    colorTheme: 'rose',
    maxHp: 160,
    hp: 160,
    maxMp: 40,
    mp: 40,
    maxSp: 100,
    sp: 30,
    atk: 25,
    def: 18,
    matk: 8,
    spd: 12,
    skills: ALRIC_SKILLS,
    uniqueAbility: ALRIC_ABILITY,
    shield: 0,
    statuses: [],
    isFallen: false,
  },
  {
    id: 'selene',
    name: 'セーレ',
    role: '氷結の大魔導士 (Arcanist)',
    avatarSeed: 'selene',
    colorTheme: 'cyan',
    maxHp: 100,
    hp: 100,
    maxMp: 90,
    mp: 90,
    maxSp: 100,
    sp: 40,
    atk: 10,
    def: 10,
    matk: 32,
    spd: 15,
    skills: SELENE_SKILLS,
    uniqueAbility: SELENE_ABILITY,
    shield: 0,
    statuses: [],
    isFallen: false,
  },
  {
    id: 'lyra',
    name: 'ライラ',
    role: '聖なる風の巫女 (Oracle)',
    avatarSeed: 'lyra',
    colorTheme: 'emerald',
    maxHp: 120,
    hp: 120,
    maxMp: 70,
    mp: 70,
    maxSp: 100,
    sp: 20,
    atk: 12,
    def: 12,
    matk: 22,
    spd: 18,
    skills: LYRA_SKILLS,
    uniqueAbility: LYRA_ABILITY,
    shield: 0,
    statuses: [],
    isFallen: false,
  },
];

export const SPECIAL_COMBOS: SpecialCombo[] = [
  // --- Alric Combos ---
  {
    id: 'combo_alric_meteor',
    name: '爆炎超彗星撃 (Meteor Impact)',
    description: '特大の炎を纏った一撃を叩き込む！敵単体に極大の火属性物理ダメージを与え、火傷(2T)と確実に気絶(1T)を付与する。',
    skillAId: 'alric_swift_slash',
    skillBId: 'alric_shield_bash',
    abilityId: 'alric_ignition',
    mpCost: 10,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(20, Math.floor(attacker.atk * 4.2 - target.def));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      
      if (!target.statuses.some(s => s.type === 'burn')) {
        target.statuses.push({ type: 'burn', duration: 2, value: Math.floor(attacker.atk * 0.75) });
      }
      if (!target.statuses.some(s => s.type === 'stun')) {
        target.statuses.push({ type: 'stun', duration: 1 });
      }

      return {
        damageLog: `${target.name}に ${rolledDmg} の炎属性ダメージ！ 火霊爆炎が炸裂し、気絶と火傷を付与しました！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_alric_crimson_dance',
    name: '紅蓮九剣舞 (Crimson Star Dance)',
    description: '華麗な紅蓮の剣閃を激しく乱舞させ、敵全体に火属性の超多段ダメージを浴びせる。会心確率が非常に高い。',
    skillAId: 'alric_swift_slash',
    skillBId: 'alric_swift_slash',
    abilityId: 'alric_ignition',
    mpCost: 0,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(15, Math.floor(attacker.atk * 2.8 - target.def * 0.7));
        const rolledDmg = Math.floor(baseDmg * (0.95 + Math.random() * 0.15));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        
        if (!target.statuses.some(s => s.type === 'burn')) {
          target.statuses.push({ type: 'burn', duration: 2, value: Math.floor(attacker.atk * 0.4) });
        }
        
        return `${target.name}に${rolledDmg}ダメージ`;
      }).join(', ');

      return {
        damageLog: `紅蓮の閃光が乱舞！敵の防陣を引き裂いた：${logs}。`,
        damageValues
      };
    }
  },
  {
    id: 'combo_alric_volcanic_wall',
    name: '火山岩の巨塊壁 (Volcanic Dome)',
    description: '大気を揺るがす溶岩盾を叩きつけて結晶障壁を築き、味方全員に頑強な防壁(シールド80 Pt)と、防御力50%バフ(3T)を授ける。',
    skillAId: 'alric_shield_bash',
    skillBId: 'alric_shield_bash',
    abilityId: 'alric_ignition',
    mpCost: 20,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const shieldAmount = 80;
      const damageValues: { id: string; val: number; type: 'shield' }[] = [];
      
      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          ally.shield += shieldAmount;
          ally.statuses.push({ type: 'def_buff', duration: 3, value: 50 });
          damageValues.push({ id: ally.id, val: shieldAmount, type: 'shield' });
        }
      });
      
      return {
        damageLog: `爆炎太古の金剛盾陣を展開！味方全員にシールド ${shieldAmount} Pt と、防御力+50%強化を付与！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_alric_dragon_inferno',
    name: '超竜インフェルノ (Dragon Inferno)',
    description: '剣閃に猛炎の竜王を宿す！敵単体に火属性の破壊的ダメージを与え、物理・魔法防御力を30%減少(3T)させる。',
    skillAId: 'alric_swift_slash',
    skillBId: 'alric_flame_vortex',
    abilityId: 'alric_ignition',
    mpCost: 15,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(25, Math.floor(attacker.atk * 4.6 - target.def * 0.5));
      const rolledDmg = Math.floor(baseDmg * (0.95 + Math.random() * 0.15));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      target.statuses.push({ type: 'def_debuff', duration: 3, value: 30 });
      if (!target.statuses.some(s => s.type === 'burn')) {
        target.statuses.push({ type: 'burn', duration: 3, value: Math.floor(attacker.atk * 0.5) });
      }

      return {
        damageLog: `${target.name}に烈火竜頭波が直撃！ ${rolledDmg} ダメージを与え、炎上で蝕み、防御力を極限低下させた！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_alric_nova_shatter',
    name: '紅蓮超新星破 (Nova Shatter)',
    description: '全霊の炎エネルギーを拳と太刀に圧縮し地面を粉砕する。敵全体に凄まじい大爆発ダメージを与える。',
    skillAId: 'alric_shield_bash',
    skillBId: 'alric_flame_vortex',
    abilityId: 'alric_ignition',
    mpCost: 18,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(18, Math.floor(attacker.atk * 3.2 - target.def * 0.6));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        return `${target.name}に${rolledDmg}大爆発`;
      }).join(', ');

      return {
        damageLog: `地面から超新星大崩壊波が噴出！ ${logs}! 敵全員を致命的な炎で焼き尽くしました！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_alric_blazing_fury',
    name: '天昇闘鬼焔 (Blazing Fury)',
    description: '極限の怒りを炎へと昇華させ、敵単体を天高く屠る。極大の火属性物理ダメージを与え、自身の攻撃力を50%増幅(3T)する。',
    skillAId: 'alric_dragon_strike',
    skillBId: 'alric_dragon_strike',
    abilityId: 'alric_ignition',
    mpCost: 20,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(30, Math.floor(attacker.atk * 5.0 - target.def * 0.5));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      
      // Self buff ATK
      attacker.statuses.push({ type: 'atk_buff', duration: 3, value: 50 });

      return {
        damageLog: `アルリックが炎の闘鬼と合一！ ${target.name}に驚異の ${rolledDmg} ダメージを与え、魔獣をも圧倒する攻撃力バフを獲得！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_alric_infernal_slash',
    name: '灼熱昇炎十文字 (Infernal Slash)',
    description: '十字の炎で敵単体を問答無用に切り裂く。高ダメージを与え、さらに確定で敵の攻撃力を20%減少(3T)させる。',
    skillAId: 'alric_swift_slash',
    skillBId: 'alric_dragon_strike',
    abilityId: 'alric_ignition',
    mpCost: 16,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(25, Math.floor(attacker.atk * 4.4 - target.def * 0.6));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      target.statuses.push({ type: 'atk_debuff', duration: 3, value: 20 });

      return {
        damageLog: `紅蓮の十文字が宿敵の体躯を穿つ！ ${target.name}に ${rolledDmg} ダメージ！敵の戦闘力を20%削ぎ取った！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_alric_magma_break',
    name: '大溶岩流爆破 (Magma Break)',
    description: '大地を引き裂き激しいマグマを上昇させる。敵単体に高い火属性物理ダメージを与え、強烈な火傷を植え付ける。',
    skillAId: 'alric_shield_bash',
    skillBId: 'alric_dragon_strike',
    abilityId: 'alric_ignition',
    mpCost: 18,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(20, Math.floor(attacker.atk * 4.5 - target.def * 0.8));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      target.statuses.push({ type: 'burn', duration: 3, value: Math.floor(attacker.atk * 0.8) });

      return {
        damageLog: `深淵から高熱マグマ流が直撃！ ${target.name}に ${rolledDmg} ダメージと絶大火傷ダメージを永続付与！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_alric_volcanic_eruption',
    name: '噴天魔降破 (Volcanic Eruption)',
    description: '炎の回転斬りと昇竜掌を同期。敵全体に火属性の壊滅的爆波を与える。',
    skillAId: 'alric_flame_vortex',
    skillBId: 'alric_dragon_strike',
    abilityId: 'alric_ignition',
    mpCost: 22,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(22, Math.floor(attacker.atk * 3.5 - target.def * 0.6));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        return `${target.name}に${rolledDmg}ダメージ`;
      }).join(', ');

      return {
        damageLog: `火山の大爆発が天空まで燃え上がる！敵全員を直撃：${logs}!`,
        damageValues
      };
    }
  },

  // --- Selene Combos ---
  {
    id: 'combo_selene_cataclysm',
    name: '極氷大崩壊 (Glacial Cataclysm)',
    description: '戦場全域に絶対零度の猛吹雪を吹き荒れさせる。敵全体に極大の氷属性魔法ダメージを与え、氷結(1T：被ダメージ1.5倍)状態にする。',
    skillAId: 'selene_frost_needle',
    skillBId: 'selene_spell_focus',
    abilityId: 'selene_absolute_zero',
    mpCost: 15,
    spCost: 40,
    type: 'combo',
    target: 'all_enemies',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const affectedNames: string[] = [];
      
      targets.forEach((t) => {
        const enemy = t as EnemyState;
        const baseDmg = Math.max(30, Math.floor(attacker.matk * 3.8 - enemy.def * 0.4));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        
        enemy.hp = Math.max(0, enemy.hp - rolledDmg);
        damageValues.push({ id: enemy.id, val: rolledDmg, type: 'damage' });
        affectedNames.push(`${enemy.name}(${rolledDmg}氷ダメージ)`);
        
        if (!enemy.statuses.some(s => s.type === 'freeze')) {
          enemy.statuses.push({ type: 'freeze', duration: 1 });
        }
      });
      
      return {
        damageLog: `絶対零度の氷霧が狂瀾怒濤の如く炸裂！ ${affectedNames.join(', ')}。敵全員を凍結状態にし、物分子を停止させました！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_selene_casket',
    name: '永久氷結の柩 (Eternal Cryo Casket)',
    description: '周囲の氷素粒子を収束させ、敵単体を深海の氷柩に封じる。氷属性魔法極大ダメージを与え、気絶(1T)と凍結(2T)をダブルで付与。',
    skillAId: 'selene_frost_needle',
    skillBId: 'selene_frost_needle',
    abilityId: 'selene_absolute_zero',
    mpCost: 12,
    spCost: 40,
    type: 'combo',
    target: 'single_enemy',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(45, Math.floor(attacker.matk * 5.6 - target.def * 0.4));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.15));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      
      if (!target.statuses.some(s => s.type === 'freeze')) {
        target.statuses.push({ type: 'freeze', duration: 2 });
      }
      if (!target.statuses.some(s => s.type === 'stun')) {
        target.statuses.push({ type: 'stun', duration: 1 });
      }
      
      return {
        damageLog: `${target.name}を永久の一等星結晶の氷柩に封印した！ ${rolledDmg} ダメージを与え、完全に機動力を氷結・無効化！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_selene_aurora_canopy',
    name: '蒼穹極光の天幕 (Aurora Canopy)',
    description: '天空のカーテン。味方全員のMPを35再生し、次の敵単体攻撃を完全に無効化する絶対無敵シールド(1T)を張る。',
    skillAId: 'selene_spell_focus',
    skillBId: 'selene_spell_focus',
    abilityId: 'selene_absolute_zero',
    mpCost: 0,
    spCost: 40,
    type: 'combo',
    target: 'all_allies',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'heal' }[] = [];
      
      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          ally.mp = Math.min(ally.maxMp, ally.mp + 40);
          if (!ally.statuses.some(s => s.type === 'invincibility')) {
            ally.statuses.push({ type: 'invincibility', duration: 1 });
          }
          damageValues.push({ id: ally.id, val: 40, type: 'heal' });
        }
      });
      
      return {
        damageLog: `美しき極光オーロラが戦場を包み込み、精霊の流れを整調した！全員のMPが40回復し、絶対無敵加護を付与！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_selene_frostfire',
    name: '氷血炎嵐波 (Frost Fire Glacier)',
    description: '絶対零度の冷気と敵自体の血液熱を激しく交錯。敵単体に超極大の魔法ダメージを与え、素早さを50%減衰させる。',
    skillAId: 'selene_frost_needle',
    skillBId: 'selene_deep_freeze',
    abilityId: 'selene_absolute_zero',
    mpCost: 16,
    spCost: 40,
    type: 'combo',
    target: 'single_enemy',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(45, Math.floor(attacker.matk * 6.0 - target.def * 0.3));
      const rolledDmg = Math.floor(baseDmg * (0.95 + Math.random() * 0.15));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      
      const exists = target.statuses.find(s => s.type === 'freeze');
      if (!exists) {
        target.statuses.push({ type: 'freeze', duration: 2 });
      }
      target.statuses.push({ type: 'atk_debuff', duration: 3, value: 30 }); // local debuff simulation

      return {
        damageLog: `過冷却と体内急熱の連鎖ショックが炸裂！ ${target.name}に驚愕の ${rolledDmg} 氷魔法ダメージ、素早さを粉砕！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },
  {
    id: 'combo_selene_diamond_dust',
    name: '万華凍塵大雪崩 (Diamond Dust Avalanche)',
    description: '魔力結合により全ての水分結晶を一斉に放つ。敵全体に氷魔法大ダメージを与え、確実に2ターンの間攻撃力を30%減少させる。',
    skillAId: 'selene_deep_freeze',
    skillBId: 'selene_deep_freeze',
    abilityId: 'selene_absolute_zero',
    mpCost: 24,
    spCost: 40,
    type: 'combo',
    target: 'all_enemies',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(25, Math.floor(attacker.matk * 4.2 - target.def * 0.5));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        target.statuses.push({ type: 'atk_debuff', duration: 2, value: 30 });
        return `${target.name}に${rolledDmg}氷結ダメージ`;
      }).join(', ');

      return {
        damageLog: `天空より無数の星華結晶を撒き散らせるダイヤモンドダスト！ ${logs}! 敵全員の攻撃性能を大きく削ぎ落としました！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_selene_glacier_wall',
    name: '永久氷盤大盾城 (Eternal Glacier Palace)',
    description: '深層氷河の大防護壁を瞬時に成形する。味方全員のMPを20回復、シールドを70、さらに防御力30%上昇を授ける。',
    skillAId: 'selene_spell_focus',
    skillBId: 'selene_blizzard_armor',
    abilityId: 'selene_absolute_zero',
    mpCost: 10,
    spCost: 40,
    type: 'combo',
    target: 'all_allies',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const shieldAmount = 70;
      const damageValues: { id: string; val: number; type: 'shield' }[] = [];
      
      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          ally.mp = Math.min(ally.maxMp, ally.mp + 20);
          ally.shield += shieldAmount;
          ally.statuses.push({ type: 'def_buff', duration: 3, value: 30 });
          damageValues.push({ id: ally.id, val: shieldAmount, type: 'shield' });
        }
      });

      return {
        damageLog: `大魔法「氷城壁の要塞」が展開！味方全員が精神力(MP +20)を回復し、堅牢なる氷の加護(シールド ${shieldAmount})を獲得！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_selene_ice_barrier',
    name: '蒼光凍氷の結界 (Ice Canopy)',
    description: '味方一人に氷晶防護層を過密集中。対象のシールドを120、氷結以外の状態異常への免疫を獲得。',
    skillAId: 'selene_frost_needle',
    skillBId: 'selene_blizzard_armor',
    abilityId: 'selene_absolute_zero',
    mpCost: 12,
    spCost: 40,
    type: 'combo',
    target: 'single_ally',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      // Find lowest HP ally dynamically
      let tAlly = targets[0] as CharacterState;
      let minHp = 999;
      targets.forEach(a => {
        const ally = a as CharacterState;
        if (!ally.isFallen && ally.hp < minHp) {
          minHp = ally.hp;
          tAlly = ally;
        }
      });
      
      const shieldAmount = 120;
      tAlly.shield += shieldAmount;
      tAlly.statuses.push({ type: 'def_buff', duration: 2, value: 40 });

      return {
        damageLog: `凍てつく魔力を ${tAlly.name} に過密展開！極大シールド ${shieldAmount} Pt と魔力障壁を急速生成！`,
        damageValues: [{ id: tAlly.id, val: shieldAmount, type: 'shield' }]
      };
    }
  },
  {
    id: 'combo_selene_blizzard_storm',
    name: '災厄極北寒冷暴風 (Blizzard Storm)',
    description: '怒れる極北の大風雪。敵全体に凄まじい大嵐魔法ダメージを叩きつけ、素早さと物理攻撃力を低下させる。',
    skillAId: 'selene_deep_freeze',
    skillBId: 'selene_blizzard_armor',
    abilityId: 'selene_absolute_zero',
    mpCost: 22,
    spCost: 40,
    type: 'combo',
    target: 'all_enemies',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(22, Math.floor(attacker.matk * 4.4 - target.def * 0.6));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        target.statuses.push({ type: 'atk_debuff', duration: 3, value: 20 });
        return `${target.name}に${rolledDmg}ダメージ`;
      }).join(', ');

      return {
        damageLog: `極北の狂嵐が轟々とうなりを上げ敵全員を叩きのめした！：${logs}! 敵全員は寒冷により弱体化！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_selene_aurora_dance',
    name: '穹極極光大円舞 (Aurora Dance)',
    description: 'オーロラの閃光。敵単体に魔防無視の超高精密氷結ビームを撃ち込む。確定気絶(1T)。',
    skillAId: 'selene_spell_focus',
    skillBId: 'selene_deep_freeze',
    abilityId: 'selene_absolute_zero',
    mpCost: 18,
    spCost: 40,
    type: 'combo',
    target: 'single_enemy',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      // Formula ignoring enemy def completely
      const baseDmg = Math.floor(attacker.matk * 5.2);
      const rolledDmg = Math.floor(baseDmg * (0.95 + Math.random() * 0.1));
      
      target.hp = Math.max(0, target.hp - rolledDmg);
      target.statuses.push({ type: 'stun', duration: 1 });

      return {
        damageLog: `光と極光の魔導軸線が完全同期！ ${target.name}に魔防無視 ${rolledDmg} 魔法ダメージを与えて一瞬で無力化！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  },

  // --- Lyra Combos ---
  {
    id: 'combo_lyra_sanctuary',
    name: '神聖薫風の天庭楽園 (Sacred Sanctuary)',
    description: '聖歌に豊かな薫風を共振させる。味方全員を110回復し、さらに全体の素早さを圧倒的上昇、微量シールドを付与する。',
    skillAId: 'lyra_healing_grace',
    skillBId: 'lyra_zephyr_wind',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 20,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'heal' | 'shield' }[] = [];
      const healBase = Math.floor(attacker.matk * 3.8 + 45);
      
      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          const rolledHeal = Math.floor(healBase * (0.95 + Math.random() * 0.1));
          ally.hp = Math.min(ally.maxHp, ally.hp + rolledHeal);
          ally.shield += 20;
          ally.statuses.push({ type: 'spd_buff', duration: 3, value: 35 });
          damageValues.push({ id: ally.id, val: rolledHeal, type: 'heal' });
        }
      });
      
      return {
        damageLog: `神の庭園から流麗なる命脈の薫風が祝福した！味方全体の傷を大きく回復(平均 ${healBase} HP)し、さらに素早さと保護障壁を展開！`,
        damageValues: damageValues as any
      };
    }
  },
  {
    id: 'combo_lyra_miracle_blessing',
    name: '神託せし復活の奇跡 (Oracle Miracle Resurrection)',
    description: '神聖契約のもとに力尽きた味方一人をHP50%の状態で即座に救済復活させる。もし全英雄生存中なら、最も低HPの味方を最大回復し特大シールド(100 Pt)を張る。',
    skillAId: 'lyra_healing_grace',
    skillBId: 'lyra_healing_grace',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 16,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'heal' | 'shield' }[] = [];
      
      const fallenAlly = (targets as CharacterState[]).find(a => a.isFallen);
      if (fallenAlly) {
        fallenAlly.isFallen = false;
        const revivedHp = Math.floor(fallenAlly.maxHp * 0.50);
        fallenAlly.hp = revivedHp;
        damageValues.push({ id: fallenAlly.id, val: revivedHp, type: 'heal' });
        
        return {
          damageLog: `古の奇跡の光が聖霊王の詩を歌い上げる！力尽きた ${fallenAlly.name} を再び闘志みなぎるHP ${revivedHp} で現世に蘇生！`,
          damageValues
        };
      } else {
        let targetAlly = (targets as CharacterState[])[0];
        let minRatio = 1.0;
        
        (targets as CharacterState[]).forEach((ally) => {
          if (!ally.isFallen) {
            const ratio = ally.hp / ally.maxHp;
            if (ratio < minRatio) {
              minRatio = ratio;
              targetAlly = ally;
            }
          }
        });
        
        const healAmt = Math.floor(attacker.matk * 5.0 + 40);
        targetAlly.hp = Math.min(targetAlly.maxHp, targetAlly.hp + healAmt);
        targetAlly.shield += 100;
        
        damageValues.push({ id: targetAlly.id, val: healAmt, type: 'heal' });
        damageValues.push({ id: targetAlly.id, val: 100, type: 'shield' });
        
        return {
          damageLog: `すべての戦友は生存！極微星光が ${targetAlly.name} へ集束し、HPを ${healAmt} 回復！さらに絶対神盾シールド 100 Ptを装填！`,
          damageValues
        };
      }
    }
  },
  {
    id: 'combo_lyra_aether_barrage',
    name: '天界の暴風乱撃 (Aeolian Tempest Storm)',
    description: '烈風の聖域を激怒。神聖真空の刃が荒れ吹き乱れ、敵全員に高魔法ダメージを与えつつ、攻防力を3ターンの間強力に35%奪い取る。',
    skillAId: 'lyra_zephyr_wind',
    skillBId: 'lyra_zephyr_wind',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 24,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const affected: string[] = [];
      
      targets.forEach((t) => {
        const enemy = t as EnemyState;
        const baseDmg = Math.max(20, Math.floor(attacker.matk * 2.5 - enemy.def * 0.5));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        
        enemy.hp = Math.max(0, enemy.hp - rolledDmg);
        damageValues.push({ id: enemy.id, val: rolledDmg, type: 'damage' });
        affected.push(enemy.name);
        
        enemy.statuses.push({ type: 'atk_debuff', duration: 3, value: 35 });
        enemy.statuses.push({ type: 'def_debuff', duration: 3, value: 35 });
      });
      
      return {
        damageLog: `神をも震え上がらせる真空烈風の爆瀾が狂乱！ ${affected.join(', ')}。全敵の肉体をずたずたに裂き、攻撃と防御を-35%削剥！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_gale_heal',
    name: '風恵救済神愛光 (Divine Tailwind)',
    description: '究極生命の回復神風。味方全体のHPを150回復し、さらに素早さを最大の40%上昇(3T)させる。',
    skillAId: 'lyra_healing_grace',
    skillBId: 'lyra_wind_gale',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 22,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'heal' }[] = [];
      const healBase = Math.floor(attacker.matk * 4.4 + 50);

      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          const rolledHeal = Math.floor(healBase * (0.95 + Math.random() * 0.1));
          ally.hp = Math.min(ally.maxHp, ally.hp + rolledHeal);
          ally.statuses.push({ type: 'spd_buff', duration: 3, value: 40 });
          damageValues.push({ id: ally.id, val: rolledHeal, type: 'heal' });
        }
      });

      return {
        damageLog: `大気そのものを極限回復エネルギーで液化！味方全員が精神と肉体を完全融和 (HP +${healBase})、最速行動権を確保！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_zephyr_blessing',
    name: '翡翠嵐の祝福 (Emerald Tempest Blessing)',
    description: '聖霊風の守護円盤を高速展開。味方全員の素早さを30%強化、かつ攻撃力を30%増幅させる黄金の戦闘陣。',
    skillAId: 'lyra_zephyr_wind',
    skillBId: 'lyra_aura_shield',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 18,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'shield' }[] = [];

      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          ally.statuses.push({ type: 'atk_buff', duration: 3, value: 30 });
          ally.statuses.push({ type: 'spd_buff', duration: 3, value: 30 });
          ally.shield += 30;
          damageValues.push({ id: ally.id, val: 30, type: 'shield' });
        }
      });

      return {
        damageLog: `聖風「天上の大進撃進軍曲」を吹奏！味方全員に素早さ、物理攻撃、及びシールドバフが宿りました！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_celestial_hymn',
    name: '女帝の天頂賛歌 (Celestial Hymn)',
    description: '絶対加護領域。味方全員に天なる輝きを与え、攻撃力物理・魔法を「50%」という未曾有の爆発的バフ状態にする。',
    skillAId: 'lyra_aura_shield',
    skillBId: 'lyra_aura_shield',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 20,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'shield' }[] = [];

      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          ally.statuses.push({ type: 'atk_buff', duration: 3, value: 50 });
          // double up simulation
          ally.shield += 40;
          damageValues.push({ id: ally.id, val: 40, type: 'shield' });
        }
      });

      return {
        damageLog: `ライラが天界女帝の福音讃歌を詠唱！味方全員の攻撃性能が1.5倍に激躍増、破砕シールド40 Ptも自動生成！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_divine_barrier',
    name: '天つ降臨の星盾 (Divine Barrier)',
    description: '聖なる祝福。味方全員のHPを80回復し、さらに全体のシールドを50増加。',
    skillAId: 'lyra_healing_grace',
    skillBId: 'lyra_aura_shield',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 15,
    spCost: 30,
    type: 'combo',
    target: 'all_allies',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'heal' }[] = [];
      const healBase = Math.floor(attacker.matk * 2.5 + 20);

      targets.forEach((t) => {
        const ally = t as CharacterState;
        if (!ally.isFallen) {
          const rolledHeal = Math.floor(healBase * (0.95 + Math.random() * 0.1));
          ally.hp = Math.min(ally.maxHp, ally.hp + rolledHeal);
          ally.shield += 50;
          damageValues.push({ id: ally.id, val: rolledHeal, type: 'heal' });
        }
      });

      return {
        damageLog: `光の星盾がそっと舞い降りる！全員のHPを ${healBase} 回復させ、防守盾50 Ptを生成しました！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_tempest_gale',
    name: '太古王風大暴狂 (Tempest Gale)',
    description: '大いなる台風を収束。敵全体に風呪魔法ダメージを与え、確実にその物理攻撃力をを30%減少させる。',
    skillAId: 'lyra_zephyr_wind',
    skillBId: 'lyra_wind_gale',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 22,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(18, Math.floor(attacker.matk * 3.0 - target.def * 0.5));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        target.statuses.push({ type: 'atk_debuff', duration: 3, value: 30 });
        return `${target.name}に${rolledDmg}風斬ダメ`;
      }).join(', ');

      return {
        damageLog: `空の彼方から神王風暴が吹鳴、すべての防御壁を穿つ：${logs}! 敵の攻撃力低下！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_gale_force',
    name: '真空極限風嵐崩 (Gale Force)',
    description: '風槍を無限回転させ真空超大嵐を成形。敵全体に風極大魔法ダメージを与える。',
    skillAId: 'lyra_wind_gale',
    skillBId: 'lyra_wind_gale',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 26,
    spCost: 30,
    type: 'combo',
    target: 'all_enemies',
    element: 'wind',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const logs = targets.map((t) => {
        const target = t as EnemyState;
        const baseDmg = Math.max(22, Math.floor(attacker.matk * 3.4 - target.def * 0.5));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        target.hp = Math.max(0, target.hp - rolledDmg);
        damageValues.push({ id: target.id, val: rolledDmg, type: 'damage' });
        return `${target.name}に${rolledDmg}超風力削り`;
      }).join(', ');

      return {
        damageLog: `最果ての神話の真空烈風が炸裂！すべてを一瞥のもとに破壊した：${logs}!`,
        damageValues
      };
    }
  },
  {
    id: 'combo_alric_phoenix',
    name: '極極鳳凰翔刃斬 (Phoenix Flash)',
    description: '不死鳥の業火を宿して急襲突刺。極大火属性物魔複合ダメージを与え、さらに自己HPを中回復(50)し火傷(3T)を付与。',
    skillAId: 'alric_flame_charge',
    skillBId: 'alric_flame_charge',
    abilityId: 'alric_ignition',
    mpCost: 16,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'fire',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(35, Math.floor(attacker.atk * 4.8 - target.def * 0.4));
      const rolledDmg = Math.floor(baseDmg * (0.95 + Math.random() * 0.1));
      target.hp = Math.max(0, target.hp - rolledDmg);
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + 50);
      if (!target.statuses.some(s => s.type === 'burn')) {
        target.statuses.push({ type: 'burn', duration: 3, value: Math.floor(attacker.atk * 0.6) });
      }
      return {
        damageLog: `灼熱の不死鳥が舞い降りる！${target.name}に ${rolledDmg} の鳳凰業火ダメージ！同時にアルリックの自己生命力が50回復！`,
        damageValues: [
          { id: target.id, val: rolledDmg, type: 'damage' },
          { id: attacker.id, val: 50, type: 'heal' }
        ]
      };
    }
  },
  {
    id: 'combo_selene_cocytus',
    name: '凍界コキュートス (Cryic Cocytus)',
    description: '深層氷獄の地獄門を解放し絶対凍結塵を散布。敵全体に超特大氷魔法ダメージを与え、25%の確率で氷結(1T)、防御力デバフ(2T)を付与。',
    skillAId: 'selene_ice_shard',
    skillBId: 'selene_ice_shard',
    abilityId: 'selene_absolute_zero',
    mpCost: 24,
    spCost: 40,
    type: 'combo',
    target: 'all_enemies',
    element: 'ice',
    executeEffects: (attacker, targets) => {
      const damageValues: { id: string; val: number; type: 'damage' }[] = [];
      const affected: string[] = [];
      targets.forEach((t) => {
        const enemy = t as EnemyState;
        const baseDmg = Math.max(25, Math.floor(attacker.matk * 4.5 - enemy.def * 0.5));
        const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
        enemy.hp = Math.max(0, enemy.hp - rolledDmg);
        damageValues.push({ id: enemy.id, val: rolledDmg, type: 'damage' });
        affected.push(`${enemy.name}(${rolledDmg}ダメージ)`);
        
        enemy.statuses.push({ type: 'def_debuff', duration: 2, value: 25 });
        if (Math.random() < 0.25 && !enemy.statuses.some(s => s.type === 'freeze')) {
          enemy.statuses.push({ type: 'freeze', duration: 1 });
        }
      });
      return {
        damageLog: `地獄の氷河「コキュートス」の冷気が激突！ ${affected.join(', ')}。全氷素粒子が氷結・弱体化を誘発！`,
        damageValues
      };
    }
  },
  {
    id: 'combo_lyra_judgment',
    name: '星導天頂裁断波 (Holy Judgment)',
    description: '天頂より神の断罪光線を一閃。敵単体に光属性極大魔法ダメージを与え、味方全体のSPを15ずつ共鳴上昇させる。',
    skillAId: 'lyra_holy_ray',
    skillBId: 'lyra_holy_ray',
    abilityId: 'lyra_harmonic_resonance',
    mpCost: 28,
    spCost: 30,
    type: 'combo',
    target: 'single_enemy',
    element: 'light',
    executeEffects: (attacker, targets) => {
      const target = targets[0] as EnemyState;
      const baseDmg = Math.max(30, Math.floor(attacker.matk * 5.2 - target.def * 0.3));
      const rolledDmg = Math.floor(baseDmg * (0.9 + Math.random() * 0.2));
      target.hp = Math.max(0, target.hp - rolledDmg);
      
      return {
        damageLog: `聖なる天の怒りが一筋の光線となり極大降臨！${target.name}に ${rolledDmg} 光魔撃ダメージ！精霊合流により味方のSP+15！`,
        damageValues: [{ id: target.id, val: rolledDmg, type: 'damage' }]
      };
    }
  }
];

export const STAGES = [
  {
    id: 'stage_1',
    name: '第1関門: 囁き緑地の平原',
    description: '可愛いが好戦的な「スライム三兄弟」が出現！簡単な木立ちバトル。コンボレシピを練習するのに最適の相手。',
    difficulty: '簡単 (Easy)',
    background: 'linear-gradient(to bottom, #101827, #022c22, #0b1329)',
    enemies: (): EnemyState[] => [
      {
        id: 'lime_slime',
        name: 'ライムスライム',
        level: 1,
        avatarSeed: 'lime_slime',
        maxHp: 120,
        hp: 120,
        atk: 10,
        def: 5,
        spd: 8,
        isBoss: false,
        statuses: [],
      },
      {
        id: 'fire_slime',
        name: '炭火のスライム',
        level: 2,
        avatarSeed: 'fire_slime',
        maxHp: 130,
        hp: 130,
        atk: 12,
        def: 6,
        spd: 11,
        isBoss: false,
        statuses: [],
      },
      {
        id: 'aqua_slime',
        name: 'アクアスライム',
        level: 1,
        avatarSeed: 'aqua_slime',
        maxHp: 115,
        hp: 115,
        atk: 9,
        def: 4,
        spd: 14,
        isBoss: false,
        statuses: [],
      },
    ],
  },
  {
    id: 'stage_2',
    name: '第2関門: 神聖遺跡の神殿',
    description: '古から神殿を守り、鋼鉄を幾重にも纏う巨像「ルインゴーレム」が行く手を阻む。並外れた物理耐性を持つため、魔法コンボが効果てきめん。',
    difficulty: '普通 (Medium)',
    background: 'linear-gradient(to bottom, #10131d, #1e293b, #334155)',
    enemies: (): EnemyState[] => [
      {
        id: 'golem_runner',
        name: '秘術の魔力球体',
        level: 3,
        avatarSeed: 'rune_spark',
        maxHp: 100,
        hp: 100,
        atk: 22,
        def: 10,
        spd: 22,
        isBoss: false,
        statuses: [],
      },
      {
        id: 'golem_boss',
        name: 'ルインゴーレム (BOSS)',
        level: 5,
        avatarSeed: 'ruin_golem',
        maxHp: 480,
        hp: 480,
        atk: 34,
        def: 38,
        spd: 6,
        isBoss: true,
        statuses: [],
      },
    ],
  },
  {
    id: 'stage_3',
    name: '最終決戦: 黒曜石の魔王王座',
    description: '暗黒界を統べし凶悪なる皇帝「魔王ベリアル」が君臨。致死ダメージの闇技、高火力の毒爆を繰り出し、HPが低下すると極悪怒り状態となる。',
    difficulty: '最難関 (Boss)',
    background: 'linear-gradient(to bottom, #020617, #1e0b02, #3b0712)',
    enemies: (): EnemyState[] => [
      {
        id: 'hell_bat',
        name: '溶岩の翼石像',
        level: 7,
        avatarSeed: 'gargoyle_bat',
        maxHp: 180,
        hp: 180,
        atk: 24,
        def: 15,
        spd: 20,
        isBoss: false,
        statuses: [],
      },
      {
        id: 'archdemon_belial',
        name: '魔王ベリアル (FINAL BOSS)',
        level: 10,
        avatarSeed: 'belial',
        maxHp: 900,
        hp: 900,
        atk: 52,
        def: 30,
        spd: 16,
        isBoss: true,
        statuses: [],
      },
    ],
  },
];

export function findSpecialCombo(skillAId: string, skillBId: string, abilityId: string): SpecialCombo | null {
  return SPECIAL_COMBOS.find((combo) => {
    const skillsMatch = (combo.skillAId === skillAId && combo.skillBId === skillBId) ||
                       (combo.skillAId === skillBId && combo.skillBId === skillAId);
    const abilityMatches = combo.abilityId === abilityId;
    return skillsMatch && abilityMatches;
  }) || null;
}
