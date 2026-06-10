import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sword, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  Snowflake, 
  Wind, 
  Play, 
  Award, 
  Skull, 
  Info,
  BookOpen,
  HelpCircle,
  Dices,
  RefreshCw
} from 'lucide-react';
import { CharacterState, EnemyState, BattleLog, FloatingText, Skill } from './types';
import { createInitialParty, STAGES, findSpecialCombo, SPECIAL_COMBOS } from './data/gameData';

// Helper to strip English words like "Swift Slash" from names like "瞬斬 (Swift Slash)"
const cleanEnglishFromText = (str: string) => str.replace(/\s*\([\s\S]*?\)/g, '').trim();

// Clean existing SPECIAL_COMBOS on load safely
SPECIAL_COMBOS.forEach(combo => {
  combo.name = cleanEnglishFromText(combo.name);
});

// Wrap initial party generator to strip English tags on skill and ability names
const getCleanInitialParty = () => {
  const party = createInitialParty();
  party.forEach(hero => {
    hero.uniqueAbility.name = cleanEnglishFromText(hero.uniqueAbility.name);
    hero.skills.forEach(skill => {
      skill.name = cleanEnglishFromText(skill.name);
    });
  });
  return party;
};

import { BattleScene } from './components/BattleScene';
import { CommandPanel } from './components/CommandPanel';
import { LogView } from './components/LogView';
import { 
  playClickSound, 
  playSlashSound, 
  playMagicIceSound, 
  playMagicFireSound, 
  playHealSound, 
  playComboTriggerSound, 
  playDamageSound, 
  playVictorySound, 
  playDefeatSound,
  setMasterVolume
} from './audio';

type ScreenState = 'title' | 'battle' | 'stage_transition' | 'game_victory' | 'game_over';

export default function App() {
  // Navigation & stage screens
  const [screen, setScreen] = useState<ScreenState>('title');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [masterVolMuted, setMasterVolMuted] = useState(false);

  // Core Battle States
  const [party, setParty] = useState<CharacterState[]>(getCleanInitialParty());
  const [enemies, setEnemies] = useState<EnemyState[]>([]);
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  
  // Turn Progression state
  const [activeHeroIdx, setActiveHeroIdx] = useState<number>(0);
  const [isEnemyTurn, setIsEnemyTurn] = useState<boolean>(false);
  const [activeEnemyAiIdx, setActiveEnemyAiIdx] = useState<number | null>(null);
  const [enemyTargetId, setEnemyTargetId] = useState<string | null>(null);
  
  // Current deck builders for the active character's turn
  const [slotA, setSlotA] = useState<Skill | null>(null);
  const [slotB, setSlotB] = useState<Skill | null>(null);
  const [abilityActive, setAbilityActive] = useState<boolean>(false);
  const [selectedEnemyId, setSelectedEnemyId] = useState<string | null>(null);
  const [selectedAllyId, setSelectedAllyId] = useState<string | null>(null);
  
  // Stage counters
  const [victoryCount, setVictoryCount] = useState(0);
  const [showRecipesWiki, setShowRecipesWiki] = useState(false);

  // Hook to handle mute status
  useEffect(() => {
    setMasterVolume(masterVolMuted ? 0 : 0.35);
  }, [masterVolMuted]);

  // Load enemies when starting a stage
  const startStage = (idx: number) => {
    const stage = STAGES[idx];
    if (!stage) return;
    
    // Create fresh copy of enemies
    const stageEnemies = stage.enemies();
    setEnemies(stageEnemies);
    setCurrentStageIdx(idx);
    
    // Auto-target the first enemy
    if (stageEnemies.length > 0) {
      setSelectedEnemyId(stageEnemies[0].id);
    }
    
    // Reset party condition slightly, clean up status effects, restore minor MP/HP
    setParty((prevParty) => 
      prevParty.map((hero) => ({
        ...hero,
        shield: 0,
        statuses: [],
        hp: hero.isFallen ? Math.floor(hero.maxHp * 0.3) : Math.min(hero.maxHp, hero.hp + Math.floor(hero.maxHp * 0.2)),
        mp: Math.min(hero.maxMp, hero.mp + Math.floor(hero.maxMp * 0.25)),
        isFallen: false, // Revive all for simple campaign flow
      }))
    );

    // Initial targeting helpers
    const livingHero = party.find(p => !p.isFallen) || party[0];
    setSelectedAllyId(livingHero.id);

    // Logs initial
    setLogs([
      {
        id: `sys-${Date.now()}-1`,
        text: `Entered ${stage.name}. Prep your skills!`,
        type: 'system',
      }
    ]);
    
    // Battle turn setup
    setActiveHeroIdx(0);
    setIsEnemyTurn(false);
    setSlotA(null);
    setSlotB(null);
    setAbilityActive(false);
    setScreen('battle');
  };

  const startCampaign = () => {
    playClickSound();
    setParty(getCleanInitialParty());
    setVictoryCount(0);
    startStage(0);
  };

  const triggerReset = () => {
    playClickSound();
    setScreen('title');
    setParty(getCleanInitialParty());
  };

  // Helper: Append a new battle log
  const pushLog = (text: string, type: BattleLog['type'] = 'system') => {
    setLogs((prev) => [...prev, { id: `log-${Date.now()}-${Math.random()}`, text, type }]);
  };

  // Helper: Find Coordinates of target on viewport to render Floating Texts
  const addFloatingTextAt = (targetId: string, text: string | number, type: FloatingText['type']) => {
    let coords = { x: 50, y: 50 };
    
    // Check if hero
    const heroIdx = party.findIndex(h => h.id === targetId);
    if (heroIdx !== -1) {
      coords = {
        x: heroIdx === 0 ? 20 : heroIdx === 1 ? 50 : 80,
        y: 75,
      };
    } else {
      // It's an enemy
      const enemyIdx = enemies.findIndex(e => e.id === targetId);
      if (enemyIdx !== -1) {
        if (enemies.length === 3) {
          coords = {
            x: enemyIdx === 0 ? 20 : enemyIdx === 1 ? 50 : 80,
            y: 30,
          };
        } else if (enemies.length === 2) {
          coords = {
            x: enemyIdx === 0 ? 35 : 65,
            y: 30,
          };
        } else {
          coords = {
            x: 50,
            y: 30,
          };
        }
      }
    }

    const newFloat: FloatingText = {
      id: `float-${Date.now()}-${Math.random()}`,
      text,
      x: coords.x,
      y: coords.y,
      type,
    };

    setFloatingTexts((prev) => [...prev, newFloat]);
    // Auto purge
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter(f => f.id !== newFloat.id));
    }, 1500);
  };

  // Compute stats of acting hero to see if they can execute
  const activeHero = party[activeHeroIdx] || party.find(h => !h.isFallen);
  const requiredMp = (slotA?.mpCost || 0) + (slotB?.mpCost || 0);
  const requiredSp = abilityActive ? activeHero.uniqueAbility.spCost : 0;
  const hasSufficientMp = activeHero ? activeHero.mp >= requiredMp : false;
  const hasSufficientSp = activeHero ? activeHero.sp >= requiredSp : false;

  // Change individual slots helpers
  const handleSetSlotA = (skill: Skill | null) => {
    playClickSound();
    setSlotA(skill);
  };

  const handleSetSlotB = (skill: Skill | null) => {
    playClickSound();
    setSlotB(skill);
  };

  const handleToggleAbility = () => {
    playClickSound();
    setAbilityActive(!abilityActive);
  };

  // Find names of currently selected targets for prompt previews
  const currentEnemyTarget = enemies.find(e => e.id === selectedEnemyId) || enemies[0];
  const currentAllyTarget = party.find(p => p.id === selectedAllyId) || activeHero;

  // MAIN SYSTEM: Player Action Turn Execution
  const executePlayerTurn = () => {
    if (!activeHero || activeHero.isFallen) return;
    if (!hasSufficientMp || !hasSufficientSp) return;

    // Check if slots form a valid special combo
    const combo = (slotA && slotB && abilityActive) 
      ? findSpecialCombo(slotA.id, slotB.id, activeHero.uniqueAbility.id) 
      : null;

    // Deduct cost and save updated states
    setParty((prevParty) => {
      return prevParty.map((hero, idx) => {
        if (idx === activeHeroIdx) {
          return {
            ...hero,
            mp: hero.mp - requiredMp,
            sp: hero.sp - requiredSp,
          };
        }
        return hero;
      });
    });

    if (combo) {
      // --- TRIGGER EPIC COMBINATION RESONANCE ---
      playComboTriggerSound();
      pushLog(`⚡ RESONANCE SPARK! ${activeHero.name} triggered [${combo.name}]!`, 'combo');
      addFloatingTextAt(activeHero.id, "RESONANCE COMBO!", 'combo');

      // Resolve targets
      let targets: (EnemyState | CharacterState)[] = [];
      if (combo.target === 'single_enemy') {
        const t = enemies.find(e => e.id === selectedEnemyId) || enemies.find(e => e.hp > 0);
        if (t) targets = [t];
      } else if (combo.target === 'all_enemies') {
        targets = enemies.filter(e => e.hp > 0);
      } else if (combo.target === 'all_allies' || combo.target === 'single_ally') {
        targets = party; // Pass party reference to execute special revive/heals
      } else {
        targets = [activeHero];
      }

      setTimeout(() => {
        // Execute combination logic
        setEnemies((prevEnemies) => {
          setParty((prevParty) => {
            // Setup parameters
            const mockAttacker = { ...activeHero, mp: activeHero.mp - requiredMp, sp: activeHero.sp - requiredSp };
            const enemiesCopy = prevEnemies.map(e => ({ ...e, statuses: e.statuses.map(st => ({ ...st })) }));
            const partyCopy = prevParty.map(p => ({ ...p, statuses: p.statuses.map(st => ({ ...st })) }));

            // Target mapping parameters
            const runTargets = combo.target.includes('enemy') 
              ? enemiesCopy.filter(e => e.hp > 0 && (combo.target === 'all_enemies' || e.id === selectedEnemyId))
              : partyCopy;
            
            // Execute effects
            const result = combo.executeEffects(mockAttacker, runTargets);
            
            pushLog(result.damageLog, 'combo');
            
            // Trigger floating cues
            result.damageValues?.forEach((valObj) => {
              addFloatingTextAt(valObj.id, valObj.val, valObj.type);
              if (valObj.type === 'damage') playDamageSound();
              else if (valObj.type === 'heal') playHealSound();
            });

            // Return updated party copy inside mutation loop
            return partyCopy;
          });

          // Return updated enemies inside outer level context
          return prevEnemies.map(enemy => {
            const match = enemies.find(e => e.id === enemy.id);
            if (match) {
              return { ...match }; // synced through inner refs
            }
            return enemy;
          });
        });
      }, 550);

    } else {
      // --- TRIGGER SEQUENTIAL STANDARDS ---
      pushLog(`${activeHero.name} readies multiple combat procedures:`, 'player_action');
      
      let delayOffset = 0;

      // 1. Resolve Slot A
      if (slotA) {
        setTimeout(() => {
          resolveSingleSkill(activeHero, slotA, selectedEnemyId, selectedAllyId);
        }, delayOffset);
        delayOffset += 500;
      }

      // 2. Resolve Slot B
      if (slotB) {
        setTimeout(() => {
          resolveSingleSkill(activeHero, slotB, selectedEnemyId, selectedAllyId);
        }, delayOffset);
        delayOffset += 500;
      }

      // 3. Resolve standalone unique ability toggle with no specific recipe
      if (abilityActive && !combo) {
        setTimeout(() => {
          playHealSound();
          pushLog(`${activeHero.name} released Unique energy [${activeHero.uniqueAbility.name}] seeking self empowerment!`, 'player_action');
          addFloatingTextAt(activeHero.id, "ABSOLUTE CHARGE!", 'status');
          
          setParty((prevParty) => 
            prevParty.map((hero, idx) => {
              if (idx === activeHeroIdx) {
                return {
                  ...hero,
                  statuses: [...hero.statuses, { type: 'atk_buff', duration: 2, value: 30 }],
                  sp: hero.sp - requiredSp,
                };
              }
              return hero;
            })
          );
        }, delayOffset);
      }
    }

    // Wrap-up current player action turn, shift to next character or start enemy turn
    setTimeout(() => {
      setSlotA(null);
      setSlotB(null);
      setAbilityActive(false);

      // Give minor reward SP (+10) for completing the active sequence
      setParty(prevParty => 
        prevParty.map((p, idx) => {
          if (idx === activeHeroIdx) {
            return { ...p, sp: Math.min(p.maxSp, p.sp + 10) };
          }
          return p;
        })
      );

      // Shift index to find next living hero
      findAndSetNextHero(activeHeroIdx);
    }, 1300);
  };

  // Helper: Resolve standard physical / magical / healing spells
  const resolveSingleSkill = (
    attacker: CharacterState, 
    skill: Skill, 
    enemyTarId: string | null, 
    allyTarId: string | null
  ) => {
    const isEnemyTarget = skill.target === 'single_enemy' || skill.target === 'all_enemies';
    
    if (isEnemyTarget) {
      const livingEnemies = enemies.filter(e => e.hp > 0);
      if (livingEnemies.length === 0) return;

      const singleTarget = livingEnemies.find(e => e.id === enemyTarId) || livingEnemies[0];
      
      setEnemies((prevEnemies) => 
        prevEnemies.map((enemy) => {
          const isCurrentSelected = skill.target === 'all_enemies' || enemy.id === singleTarget.id;
          if (!isCurrentSelected || enemy.hp <= 0) return enemy;

          // Formula calculators
          let dmg = 0;
          if (skill.type === 'physical') {
            // (Atk * 1.5) - Def
            dmg = Math.max(8, Math.floor(attacker.atk * 1.5 - enemy.def * 0.7));
            playSlashSound();
          } else {
            // magical element multipliers
            dmg = Math.max(12, Math.floor(attacker.matk * 1.6 - enemy.def * 0.3));
            if (skill.element === 'ice') playMagicIceSound();
            else playMagicFireSound();
          }

          // Incorporate stun possibilities for shields
          const carriesStunChance = skill.id === 'alric_shield_bash' && Math.random() < 0.32;
          const statusList = [...enemy.statuses];
          if (carriesStunChance && !enemy.statuses.some(s => s.type === 'stun')) {
            statusList.push({ type: 'stun', duration: 1 });
            pushLog(`🎯 Shield Bash successfully STUNNED ${enemy.name}!`, 'status_gain');
          }

          const rolledDmg = Math.floor(dmg * (0.9 + Math.random() * 0.2));
          addFloatingTextAt(enemy.id, rolledDmg, 'damage');
          pushLog(`${attacker.name} casts ${skill.name} dealing ${rolledDmg} element damage to ${enemy.name}.`, 'player_action');

          return {
            ...enemy,
            hp: Math.max(0, enemy.hp - rolledDmg),
            statuses: statusList,
          };
        })
      );

    } else {
      // Targets allies or self
      const chosenAlly = party.find(p => p.id === allyTarId) || attacker;
      
      setParty((prevParty) => 
        prevParty.map((ally) => {
          const isTarget = skill.target === 'all_allies' || ally.id === chosenAlly.id;
          if (!isTarget || ally.isFallen) return ally;

          if (skill.type === 'heal') {
            // Heal amount formula (MAtk * 2.5 + 20)
            const healVal = Math.floor(attacker.matk * 2.5 + 20);
            const rolledHeal = Math.floor(healVal * (0.9 + Math.random() * 0.2));
            playHealSound();
            addFloatingTextAt(ally.id, rolledHeal, 'heal');
            pushLog(`${attacker.name} uses ${skill.name} healing ${ally.name} for ${rolledHeal} HP.`, 'heal');
            
            return {
              ...ally,
              hp: Math.min(ally.maxHp, ally.hp + rolledHeal),
            };
          } else if (skill.type === 'buff') {
            // Speed / defense boost buff
            playHealSound();
            addFloatingTextAt(ally.id, "SPEED UP!", 'status');
            pushLog(`${attacker.name} casts ${skill.name}, buffing ${ally.name}'s speed!`, 'player_action');
            
            return {
              ...ally,
              statuses: [...ally.statuses, { type: 'spd_buff', duration: 2, value: 15 }],
            };
          }

          return ally;
        })
      );
    }
  };

  // Helper: Cycle actors or pivot to Enemy's action turn
  const findAndSetNextHero = (currIndex: number) => {
    let nextIdx = currIndex + 1;
    let found = false;

    // Scan forward
    while (nextIdx < party.length) {
      if (!party[nextIdx].isFallen) {
        setActiveHeroIdx(nextIdx);
        // Sync default selections
        const livingHero = party[nextIdx];
        setSelectedAllyId(livingHero.id);
        found = true;
        break;
      }
      nextIdx++;
    }

    if (!found) {
      // Check if all enemies already dead from recent attacks
      const allDead = enemies.every(e => e.hp <= 0);
      if (allDead) {
        handleVictoryConditions();
        return;
      }
      
      // Pivot to Enemy AI sequence
      setIsEnemyTurn(true);
      pushLog(`--- Enemy Turn (魔王軍の迎撃開始) ---`, 'enemy_action');
      setEnemyTargetId(null);
      resolveEnemyTurnSequence();
    }
  };

  // SYSTEM LOGIC: Process Entire Enemy AI round-robin turns with sequential delays
  const resolveEnemyTurnSequence = () => {
    const activeEnemies = enemies.filter(e => e.hp > 0);
    
    if (activeEnemies.length === 0) {
      setIsEnemyTurn(false);
      setActiveHeroIdx(0);
      return;
    }

    let chainDelay = 800;

    activeEnemies.forEach((enemy, iIdx) => {
      // --- Action Sequence for each active enemy ---
      setTimeout(() => {
        // Fetch freshest states to ensure dead party targets aren't bludgeoned
        setParty((currentParty) => {
          const livingHeroes = currentParty.filter(p => !p.isFallen);
          if (livingHeroes.length === 0) return currentParty;

          setEnemies((currentEnemies) => {
            const freshEnemy = currentEnemies.find(e => e.id === enemy.id);
            if (!freshEnemy || freshEnemy.hp <= 0) return currentEnemies;

            // Check if Stunned or Frozen
            const isStunned = freshEnemy.statuses.some(s => s.type === 'stun');
            const isFrozen = freshEnemy.statuses.some(s => s.type === 'freeze');

            if (isStunned || isFrozen) {
              const cond = isStunned ? 'STUNNED' : 'FROZEN';
              pushLog(`❄️ ${freshEnemy.name} is ${cond} and skipped action!`, 'system');
              addFloatingTextAt(freshEnemy.id, `${cond}!`, 'status');
              
              // Tick down enemy ailments durations
              freshEnemy.statuses = freshEnemy.statuses
                .map(s => ({ ...s, duration: s.duration - 1 }))
                .filter(s => s.duration > 0);
              
              return currentEnemies;
            }

            // Pick a reasonable target (lowest HP or random)
            const target = livingHeroes[Math.floor(Math.random() * livingHeroes.length)];
            setEnemyTargetId(target.id);

            // Compute standard damage: (EnemyAtk - HeroDef * 0.5)
            const isBossSkill = freshEnemy.isBoss && Math.random() < 0.45;
            let finalDmg = Math.max(6, Math.floor(freshEnemy.atk - target.def * 0.4));
            
            let logMsg = '';
            if (isBossSkill) {
              finalDmg = Math.floor(finalDmg * 1.7);
              logMsg = `🚨 Boss ${freshEnemy.name} channels dark energy: [ABYSSAL IMPACT]! Hit ${target.name} for ${finalDmg} DMG!`;
            } else {
              finalDmg = Math.floor(finalDmg * (0.85 + Math.random() * 0.3));
              logMsg = `⚔️ ${freshEnemy.name} strikes ${target.name} dealing ${finalDmg} physical damage.`;
            }

            // Apply Damage against Shield first
            let damageToHp = finalDmg;
            let shieldDeduction = 0;
            
            // Check invincibility status
            const hasInvincibility = target.statuses.some(s => s.type === 'invincibility');
            if (hasInvincibility) {
              damageToHp = 0;
              logMsg = `🛡️ ${target.name} blocked all damage using Aurora Invincibility Canopy!`;
              addFloatingTextAt(target.id, "BLOCKED!", 'shield');
              
              // Consume invincibility
              target.statuses = target.statuses.filter(s => s.type !== 'invincibility');
            } else if (target.shield > 0) {
              if (target.shield >= finalDmg) {
                target.shield -= finalDmg;
                damageToHp = 0;
                shieldDeduction = finalDmg;
              } else {
                damageToHp = finalDmg - target.shield;
                shieldDeduction = target.shield;
                target.shield = 0;
              }
              playDamageSound();
              addFloatingTextAt(target.id, `-${shieldDeduction} Shield`, 'shield');
            } else {
              playDamageSound();
              addFloatingTextAt(target.id, damageToHp, 'damage');
            }

            pushLog(logMsg, 'enemy_action');

            if (damageToHp > 0) {
              target.hp = Math.max(0, target.hp - damageToHp);
              if (target.hp <= 0) {
                target.isFallen = true;
                target.shield = 0;
                target.statuses = [];
                pushLog(`💀 ${target.name} has fallen!`, 'defeat');
              }
            }

            // Grant some minor gauge SP for receiving direct hits
            target.sp = Math.min(target.maxSp, target.sp + 12);

            // Tick down burn damage if enemy is burned
            const burnStatus = freshEnemy.statuses.find(s => s.type === 'burn');
            if (burnStatus) {
              const burnVal = burnStatus.value || 15;
              freshEnemy.hp = Math.max(0, freshEnemy.hp - burnVal);
              addFloatingTextAt(freshEnemy.id, `${burnVal} Burn`, 'damage');
              pushLog(`🔥 ${freshEnemy.name} takes ${burnVal} fire damage from Burn.`, 'damage');
            }

            // Tick down enemy status effects durations
            freshEnemy.statuses = freshEnemy.statuses
              .map(s => ({ ...s, duration: s.duration - 1 }))
              .filter(s => s.duration > 0);

            return currentEnemies;
          });

          return currentParty.map(p => {
            const match = party.find(pat => pat.id === p.id);
            if (match) return { ...match };
            return p;
          });
        });
      }, chainDelay);

      chainDelay += 1100;
    });

    // COMPLETE ALL ENEMY ACTUATIONS -> Check game state, transition turn back to Player
    setTimeout(() => {
      setEnemies((finalEnemies) => {
        // Clear dead enemies
        const aliveEn = finalEnemies.filter(e => e.hp > 0);
        
        setParty((finalParty) => {
          // Verify if whole party wiped
          const anyHeroAlive = finalParty.some(hero => !hero.isFallen);
          
          if (!anyHeroAlive) {
            playDefeatSound();
            setScreen('game_over');
            return finalParty;
          }

          if (aliveEn.length === 0) {
            handleVictoryConditions();
            return finalParty;
          }

          // Return Turn back to Player: Clean up expired buffs, restore 4 MP standard regen
          pushLog(`--- Player Turn Start (生命力が回復しました) ---`, 'system');
          setEnemyTargetId(null);
          setIsEnemyTurn(false);
          
          // Reset action indexes
          const livingHeroIndex = finalParty.findIndex(h => !h.isFallen);
          setActiveHeroIdx(livingHeroIndex !== -1 ? livingHeroIndex : 0);
          
          return finalParty.map((hero) => {
            if (hero.isFallen) return hero;
            
            // Decement player buffs
            const updatedStatuses = hero.statuses
              .map(st => ({ ...st, duration: st.duration - 1 }))
              .filter(st => st.duration > 0);
            
            return {
              ...hero,
              mp: Math.min(hero.maxMp, hero.mp + 4), // 4 MP regen per round
              statuses: updatedStatuses,
            };
          });
        });

        return finalEnemies;
      });
    }, chainDelay);
  };

  // SYSTEM LOGIC: Process Stage victory or complete campaign triumph
  const handleVictoryConditions = () => {
    playVictorySound();
    const nextIdx = currentStageIdx + 1;
    const recordsCleared = victoryCount + 1;
    setVictoryCount(recordsCleared);

    if (nextIdx >= STAGES.length) {
      setScreen('game_victory');
    } else {
      setScreen('stage_transition');
    }
  };

  // Skip / Next Stage transition trigger
  const triggerNextStage = () => {
    playClickSound();
    startStage(currentStageIdx + 1);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans relative antialiased leading-relaxed" id="app-root">
      
      {/* Upper Global Navigation Header with Mute controls */}
      <header className="px-4 py-2 bg-zinc-900 border-b-4 border-black shrink-0 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3 bg-rose-600 border border-white"></div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-tighter text-white uppercase font-display flex items-center gap-1.5 leading-none">
              RESONANCE COMMAND RPG
            </h1>
            <p className="text-[8px] font-mono tracking-widest text-[#f43f5e] uppercase mt-0.5 font-bold">COMBINATION BATTLE SYSTEM</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRecipesWiki(!showRecipesWiki)}
            className={`flex items-center gap-1 text-[8px] sm:text-[9px] font-accent font-black tracking-wider px-2 py-1 rounded-none border-2 transition uppercase cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] ${
              showRecipesWiki 
                ? 'bg-rose-600 text-white border-white' 
                : 'bg-white text-black border-black hover:bg-rose-50'
            }`}
          >
            <BookOpen size={9} />
            <span>WIKI</span>
          </button>

          <button
            onClick={() => setMasterVolMuted(!masterVolMuted)}
            className="p-1 px-1.5 rounded-none border-2 border-black bg-zinc-800 hover:bg-zinc-750 text-zinc-100 hover:text-white transition cursor-pointer"
            title="Mute/Unmute Synthesizer"
          >
            {masterVolMuted ? <VolumeX size={11} /> : <Volume2 size={11} />}
          </button>
        </div>
      </header>

      {/* Wiki Overlay panel */}
      <AnimatePresence>
        {showRecipesWiki && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 right-6 w-80 md:w-96 bg-zinc-950 border-4 border-black rounded-none p-5 shadow-[4px_4px_0_rgba(0,0,0,1)] z-50 max-h-[85vh] overflow-y-auto text-white"
          >
            <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-3">
              <span className="text-xs font-black text-rose-500 font-accent tracking-widest uppercase">Combo Resonance Recipes</span>
              <button 
                onClick={() => setShowRecipesWiki(false)}
                className="text-xs text-zinc-400 hover:text-white font-accent font-bold uppercase cursor-pointer"
              >
                Close ×
              </button>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed mb-4 font-sans font-medium">
              To trigger these special arts, select the correct Skill pair during your turn, and make sure to activate the Unique Ability! (Orders of Skill inputs do not matter).
            </p>
            <div className="space-y-3">
              {SPECIAL_COMBOS.map((rec) => {
                let colorClass = 'text-[#fbbf24] border-[#fbbf24] bg-amber-950/25';
                if (rec.element === 'fire') colorClass = 'text-rose-450 border-rose-600 bg-rose-950/40';
                else if (rec.element === 'ice') colorClass = 'text-cyan-400 border-cyan-500 bg-cyan-950/40';
                else if (rec.element === 'wind') colorClass = 'text-emerald-400 border-emerald-500 bg-emerald-950/40';
                
                return (
                  <div key={rec.id} className="border-2 border-black bg-zinc-900/50 p-3 rounded-none space-y-1">
                    <p className="font-black text-white flex items-center justify-between text-sm font-display uppercase tracking-tight">
                      <span>{rec.name}</span>
                      <span className={`text-[8px] font-accent uppercase tracking-widest px-2 py-0.5 rounded-none border-2 font-black ${colorClass}`}>{rec.element}</span>
                    </p>
                    <p className="text-[10px] text-zinc-400 leading-normal mt-1 font-sans font-medium">{rec.description}</p>
                    <p className="text-[9px] font-mono mt-2 text-zinc-500 bg-zinc-950 p-1.5 border border-zinc-900 uppercase font-bold">
                      Formula: {(rec.skillAId.includes('needle') ? 'Frost Needle' : rec.skillAId.includes('slash') ? 'Swift Slash' : rec.skillAId.includes('grace') ? 'Healing Grace' : 'Special A')} + {(rec.skillBId.includes('focus') ? 'Spell Focus' : rec.skillBId.includes('bash') ? 'Shield Bash' : rec.skillBId.includes('wind') ? 'Zephyr Wind' : rec.skillBId.includes('slash') ? 'Swift Slash' : rec.skillBId.includes('grace') ? 'Healing Grace' : 'Special B')} + Unique Ability
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen Router */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 py-1.5 sm:py-3 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* TITLE / LANDING SCREEN */}
          {screen === 'title' && (
            <motion.div 
              key="screen-title"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="text-center space-y-10 py-12"
            >
              <div className="space-y-4" id="main-hero">
                <div className="inline-flex items-center gap-1.5 bg-[#fbbf24] text-black font-accent font-black text-[10px] uppercase tracking-widest px-4 py-1.5 border-2 border-black">
                  <Sparkles size={11} className="fill-black animate-spin-slow" />
                  Tactical Combination Turn-Based RPG
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase font-display leading-none text-white">
                  RESONANCE COMMAND RPG
                </h1>
                
                <p id="app-sub" className="text-zinc-550 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-sans font-medium">
                  キャラクター固有の「能力」と「技」を巧みに組み合わせて、必殺の特殊技を解放しよう！炎の剣士、凍土の魔導士、癒やしの巫女が織りなす究極 of 戦術コマンドバトル。
                </p>
              </div>

              {/* Characters Cards profiles Showcase on Title */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-4" id="title-showcase">
                
                {/* Alric mini bio */}
                <div className="bg-zinc-900 border-4 border-black p-5 text-left space-y-1.5 rounded-none shadow-[4px_4px_0_rgba(225,29,72,1)] hover:translate-y-[-2px] transition-all">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800">
                    <span className="p-1 bg-rose-950 border border-rose-500 rounded-none text-rose-500 font-bold">🔥</span>
                    <h3 className="text-xs font-black tracking-widest text-[#f43f5e] uppercase font-accent">アルリック (剣士)</h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                    火霊の力を極限まで高めて攻撃スキルに付与する<b>紅蓮極化</b>。爆炎 of 連続剣を放つ。
                  </p>
                </div>

                {/* Selene mini bio */}
                <div className="bg-zinc-900 border-4 border-black p-5 text-left space-y-1.5 rounded-none shadow-[4px_4px_0_rgba(6,182,212,1)] hover:translate-y-[-2px] transition-all">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800">
                    <span className="p-1 bg-cyan-950 border border-cyan-450 rounded-none text-cyan-400 font-bold">❄️</span>
                    <h3 className="text-xs font-black tracking-widest text-cyan-400 uppercase font-accent">セーレ (魔導士)</h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                    あらゆる分子活動を凍結させて絶対零度魔法 of 威力と効果を飛躍させる<b>絶対零度</b>。
                  </p>
                </div>

                {/* Lyra mini bio */}
                <div className="bg-zinc-900 border-4 border-black p-5 text-left space-y-1.5 rounded-none shadow-[4px_4px_0_rgba(16,185,129,1)] hover:translate-y-[-2px] transition-all">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800">
                    <span className="p-1 bg-emerald-950 border border-emerald-500 rounded-none text-emerald-400 font-bold">💨</span>
                    <h3 className="text-xs font-black tracking-widest text-emerald-400 uppercase font-accent">ライラ (巫女)</h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-sans font-medium">
                    聖霊と風 of 波長を共鳴させ、単体治癒や支援術を全体へと拡張変革する<b>共鳴調和</b>。
                  </p>
                </div>

              </div>

              {/* Start Campaign Trigger */}
              <div className="pt-4">
                <button
                  onClick={startCampaign}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black font-display text-sm tracking-wider uppercase border-4 border-black rounded-none shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] transition cursor-pointer flex items-center gap-2 mx-auto skew-x-[-10deg]"
                  id="btn-play-campaign"
                >
                  <span className="skew-x-[10deg] flex items-center justify-center gap-2">
                    <Play size={14} className="fill-white" />
                    <span>Start Campaign Journey</span>
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ACTIVE BATTLE SCENE */}
          {screen === 'battle' && (
            <motion.div 
              key="screen-battle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {/* Main Battle Canvas Grid top */}
              <BattleScene 
                party={party}
                enemies={enemies}
                activeHeroId={isEnemyTurn ? null : activeHero.id}
                stageBackground={STAGES[currentStageIdx].background}
                stageName={STAGES[currentStageIdx].name}
                stageDesc={STAGES[currentStageIdx].description}
                floatingTexts={floatingTexts}
                onSelectEnemyTarget={setSelectedEnemyId}
                selectedEnemyId={selectedEnemyId}
                selectedAllyId={selectedAllyId}
                onSelectAllyTarget={setSelectedAllyId}
                isEnemyTurn={isEnemyTurn}
                enemyTargetId={enemyTargetId}
              />

              {/* Bottom operations console & LogView arranged side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2" id="operation-and-log-console">
                {/* Left side: CommandPanel (skills / combos) or enemy turn notification */}
                <div className="md:col-span-8 flex flex-col h-full min-h-0">
                  {!isEnemyTurn ? (
                    <CommandPanel 
                      activeHero={activeHero}
                      slotA={slotA}
                      slotB={slotB}
                      abilityActive={abilityActive}
                      onSetSlotA={handleSetSlotA}
                      onSetSlotB={handleSetSlotB}
                      onToggleAbility={handleToggleAbility}
                      onExecuteTurn={executePlayerTurn}
                      hasSufficientMp={hasSufficientMp}
                      hasSufficientSp={hasSufficientSp}
                      requiredMp={requiredMp}
                      requiredSp={requiredSp}
                      selectedEnemyName={currentEnemyTarget?.name || 'Auto'}
                      selectedAllyName={currentAllyTarget?.name || 'Self'}
                    />
                  ) : (
                    <div className="bg-zinc-900 border-[4px] border-rose-600 rounded-none p-3 flex flex-col items-center justify-center min-h-[140px] md:h-full shadow-xl z-10" id="enemy-turn-block">
                      <div className="space-y-1.5 text-center my-auto">
                        <div className="w-7 h-7 border-2 border-rose-600 flex items-center justify-center mx-auto bg-rose-950/20 text-rose-500 font-bold animate-spin-slow">
                          <Sword size={11} />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs font-black tracking-widest text-rose-500 uppercase font-accent">Enemy Turn Phase</p>
                          <p className="text-[8px] text-zinc-400 mt-0.5 uppercase tracking-wider font-sans font-medium leading-normal">The bosses are calculating spells and attacks...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side: Combat log (LogView) */}
                <div className="md:col-span-4 flex flex-col h-full min-h-[140px] md:min-h-0">
                  <LogView 
                    logs={logs}
                    onResetGame={triggerReset}
                    victoryCount={victoryCount}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE CLEAR TRANSITION */}
          {screen === 'stage_transition' && (
            <motion.div 
              key="screen-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-6 max-w-md mx-auto bg-zinc-900 border-4 border-black p-8 rounded-none shadow-2xl skew-x-[-2deg]"
            >
              <div className="w-16 h-16 bg-emerald-500 border-2 border-black text-white flex items-center justify-center mx-auto shadow animate-bounce skew-x-[2deg]">
                <CheckCircle2 size={32} />
              </div>
              
              <div className="space-y-3 skew-x-[2deg]">
                <h2 className="text-3xl font-black italic uppercase text-emerald-400 tracking-tighter font-display leading-none">STAGE CLEARED!</h2>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed font-semibold">
                  Your team successfully combined forces to defeat the guardians! Respite campfire restores +20% HP & +25% MP as elements realign for the next challenge.
                </p>
              </div>

              <div className="pt-4 skew-x-[2deg]">
                <button
                  onClick={triggerNextStage}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-500 border-4 border-black text-white font-black font-display text-xs uppercase tracking-widest rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)] transition cursor-pointer"
                >
                  PROCEED TO NEXT GUARDIAN
                </button>
              </div>
            </motion.div>
          )}

          {/* GAME CLEAR TRIUMPH SCREEN */}
          {screen === 'game_victory' && (
            <motion.div 
              key="screen-victory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-8 max-w-lg mx-auto bg-zinc-900 border-8 border-rose-600 p-8 rounded-none shadow-2xl relative"
            >
              <div className="absolute inset-x-0 -top-4 flex justify-center">
                <span className="bg-rose-600 text-white font-display font-black uppercase text-xs tracking-widest border-2 border-white px-4 py-1 skew-x-[-12deg]">
                  VICTORY CAMPAIGN
                </span>
              </div>

              <div className="space-y-4 pt-4">
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#fbbf24] font-display uppercase leading-none">TRIUMPH OF LIGHT</h2>
                <h3 className="text-xs font-accent tracking-widest text-[#22d3ee] font-bold uppercase">All elemental guardians have been realigned!</h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-md mx-auto font-sans font-medium">
                  The darkness has been permanently lifted! Alric, Selene, and Lyra have proved their synchronized unique Resonance formulas can overpower any elemental threat.
                </p>
              </div>

              {/* Stats showcase summary */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-950 border-2 border-black p-4 text-left rounded-none">
                <div>
                  <span className="text-[9px] text-rose-500 uppercase tracking-widest font-black font-accent">CAMPAIGN RANK</span>
                  <p className="text-sm font-black text-white mt-1 uppercase font-display italic">Saviors of Elements</p>
                </div>
                <div>
                  <span className="text-[9px] text-rose-500 uppercase tracking-widest font-black font-accent">TOTAL DEFEATED</span>
                  <p className="text-sm font-black text-amber-300 mt-1 uppercase font-display italic">{victoryCount} BOSSES CLEARED</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={startCampaign}
                  className="flex-1 py-4 bg-[#fbbf24] text-black border-4 border-black hover:bg-amber-400 font-black font-display text-xs uppercase tracking-widest rounded-none shadow-[2px_2px_0px_rgba(0,0,0,1)] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw size={13} className="text-black font-bold" />
                  <span>START NEW RUN</span>
                </button>
                
                <button
                  onClick={triggerReset}
                  className="flex-1 py-4 bg-zinc-950 text-zinc-350 border-4 border-zinc-700 hover:text-white font-black font-display text-xs uppercase tracking-widest rounded-none transition cursor-pointer"
                >
                  BACK TO TITLE
                </button>
              </div>
            </motion.div>
          )}

          {/* GAME OVER SCREEN */}
          {screen === 'game_over' && (
            <motion.div 
              key="screen-over"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-6 max-w-sm mx-auto bg-zinc-900 border-4 border-rose-600 p-8 rounded-none shadow-2xl"
            >
              <div className="w-16 h-16 bg-rose-950 border-2 border-rose-500 text-rose-500 flex items-center justify-center mx-auto shadow animate-pulse">
                <Skull size={32} />
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-rose-500 font-display leading-none">PARTY DEFEATED</h2>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed font-semibold">
                  Your strategy collapsed under boss forces. Timing divine therapies or absolute freezing statuses is essential for survival!
                </p>
              </div>

              <div className="flex flex-col gap-3.5 pt-4">
                <button
                  onClick={() => startStage(currentStageIdx)}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-500 border-4 border-black text-white font-black font-display text-xs uppercase tracking-widest rounded-none shadow-[2px_2px_0_rgba(0,0,0,1)] transition cursor-pointer"
                >
                  RETRY GUARDIAN
                </button>
                <button
                  onClick={triggerReset}
                  className="w-full py-4 bg-zinc-950 text-zinc-350 border-4 border-zinc-700 hover:text-white font-black font-display text-xs uppercase tracking-widest rounded-none transition cursor-pointer"
                >
                  RETREAT TO TITLE
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer System constraints credit lines */}
      <footer className="py-5 text-center text-[10px] text-zinc-500 font-mono border-t border-zinc-950 shrink-0 bg-zinc-950">
        <span>© 2026 RESONANCE RPG SYNTH • DESIGN THEME: BOLD TYPOGRAPHY</span>
      </footer>
    </div>
  );
}
